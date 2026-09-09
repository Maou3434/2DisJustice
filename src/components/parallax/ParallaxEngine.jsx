import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

const ParallaxContext = createContext({
  registerLayer: () => () => {},
  scrollProgress: 0,
  scrollVelocity: 0,
  mouse: { x: 0, y: 0 }
});

export const useParallaxContext = () => useContext(ParallaxContext);

/**
 * ParallaxProvider
 * 
 * Ultra-smooth 60/120fps decoupled physics loop:
 * - Listens to passive window scroll and mousemove.
 * - Computes spring-damped lerp coordinates (v += (target - v) * factor).
 * - Directly updates registered DOM node transforms via translate3d / rotate3d for ZERO React re-render overhead.
 * - Respects prefers-reduced-motion.
 */
export const ParallaxProvider = ({ children }) => {
  const layersRef = useRef(new Map());
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollRef = useRef({ y: 0, targetY: 0, maxScroll: 1, velocity: 0, lastY: 0 });
  const animFrameRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Cache untransformed element positions
    const measureLayers = () => {
      const curScroll = window.scrollY;
      layersRef.current.forEach((config, node) => {
        if (!node || config.isGlobal) return;
        // Temporarily clear transform to get true document geometry
        const prevTransform = node.style.transform;
        node.style.transform = 'none';
        const rect = node.getBoundingClientRect();
        node.style.transform = prevTransform;
        config.docY = rect.top + curScroll;
        config.height = rect.height;
      });
    };

    const handleScroll = () => {
      const curY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollRef.current.targetY = curY;
      scrollRef.current.maxScroll = maxScroll;
    };

    const handleMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mouseRef.current.targetX = nx;
      mouseRef.current.targetY = ny;
    };

    const handleResize = () => {
      scrollRef.current.maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      measureLayers();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    // Initial measurements after DOM settles
    handleScroll();
    const measureTimer = setTimeout(measureLayers, 100);

    // Physics Animation Loop (Runs on requestAnimationFrame)
    const updatePhysics = () => {
      animFrameRef.current = requestAnimationFrame(updatePhysics);

      const s = scrollRef.current;
      const m = mouseRef.current;

      // Smooth scroll lerp (damping 0.09)
      const prevY = s.y;
      s.y += (s.targetY - s.y) * 0.09;
      s.velocity = Math.abs(s.y - prevY);

      // Smooth mouse lerp (damping 0.07)
      m.x += (m.targetX - m.x) * 0.07;
      m.y += (m.targetY - m.y) * 0.07;

      const progress = Math.min(1, Math.max(0, s.y / s.maxScroll));
      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight * 0.5;

      // Update all registered parallax layers directly
      layersRef.current.forEach((config, node) => {
        if (!node) return;

        const {
          speed = 0.5,
          mouseFactor = 10,
          rotateFactor = 0,
          zDepth = 0,
          direction = 'vertical',
          isGlobal = false,
          docY = 0,
          height = 0
        } = config;

        let scrollDelta = 0;
        if (isGlobal) {
          // Global backdrop plane spanning whole document height
          scrollDelta = s.y * (1 - speed);
        } else {
          // Viewport-relative localized element:
          // Untransformed screen position:
          const elementScreenY = docY - s.y;
          // Only compute transform when near the viewport
          if (elementScreenY + height < -250 || elementScreenY > viewportHeight + 250) {
            return;
          }
          const elementCenter = elementScreenY + height * 0.5;
          const distFromCenter = elementCenter - viewportCenter;
          // Subtly scaled displacement: exactly 0 when element is centered on screen!
          scrollDelta = Math.max(-120, Math.min(120, distFromCenter * (1 - speed)));
        }

        const mouseShiftX = -m.x * mouseFactor;
        const mouseShiftY = -m.y * mouseFactor;

        let transform = '';
        if (direction === 'vertical') {
          transform = `translate3d(${mouseShiftX.toFixed(2)}px, ${(-scrollDelta + mouseShiftY).toFixed(2)}px, ${zDepth}px)`;
        } else if (direction === 'lateral') {
          const lateralShift = (progress - 0.5) * 120 * speed;
          transform = `translate3d(${(lateralShift + mouseShiftX).toFixed(2)}px, ${(-scrollDelta + mouseShiftY).toFixed(2)}px, ${zDepth}px)`;
        }

        if (rotateFactor !== 0) {
          const rotZ = (m.x * rotateFactor).toFixed(2);
          transform += ` rotateZ(${rotZ}deg)`;
        }

        node.style.transform = transform;
      });
    };

    animFrameRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      clearTimeout(measureTimer);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const registerLayer = (node, config) => {
    if (!node) return () => {};
    // Measure initial bounds if localized
    if (!config.isGlobal) {
      const rect = node.getBoundingClientRect();
      config.docY = rect.top + window.scrollY;
      config.height = rect.height;
    }
    layersRef.current.set(node, config);
    return () => {
      layersRef.current.delete(node);
    };
  };

  return (
    <ParallaxContext.Provider value={{ registerLayer }}>
      {children}
    </ParallaxContext.Provider>
  );
};
