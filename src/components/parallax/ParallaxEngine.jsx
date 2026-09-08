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
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    // Initial values
    handleScroll();

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

      // Update all registered parallax layers directly
      layersRef.current.forEach((config, node) => {
        if (!node) return;

        const {
          speed = 0.5,
          mouseFactor = 10,
          rotateFactor = 0,
          zDepth = 0,
          direction = 'vertical'
        } = config;

        // Differential scroll displacement
        // speed < 1: moves slower than scroll (background receding into distance)
        // speed > 1: moves faster than scroll (foreground passing close to lens)
        const scrollDelta = s.y * (1 - speed);
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
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const registerLayer = (node, config) => {
    if (!node) return () => {};
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
