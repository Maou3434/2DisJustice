import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { TsushimaScene } from './TsushimaScene.js';

export const SpatialCanvas = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const isFirefox =
      typeof InstallTrigger !== 'undefined' ||
      (typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().includes('firefox'));
    const isMobileViewport = window.innerWidth < 768;
    const maxPixelRatio = isFirefox || isMobileViewport ? 1.5 : 2.0;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance',
      premultipliedAlpha: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxPixelRatio));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100vw';
    renderer.domElement.style.height = '100vh';
    renderer.domElement.style.pointerEvents = 'none';

    container.appendChild(renderer.domElement);

    // Active Scene Controller (Tsushima atmospheric falling momiji leaves & embers)
    const activeSceneController = new TsushimaScene(scene, camera);

    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const mouseVelocity = { vx: 0, vy: 0, speed: 0 };
    let prevMouseX = 0;
    let prevMouseY = 0;
    let scrollOffset = 0;
    let targetScrollOffset = 0;
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    let animationFrameId = null;
    let isRunning = false;
    let isPageVisible = !document.hidden;

    const handleMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0];
        mouse.targetX = (touch.clientX / window.innerWidth) * 2 - 1;
        mouse.targetY = -(touch.clientY / window.innerHeight) * 2 + 1;
      }
    };

    const startLoop = () => {
      if (isRunning || prefersReducedMotion || !isPageVisible) return;
      isRunning = true;
      animate();
    };

    const stopLoop = () => {
      isRunning = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    const updateSpatialAtmosphere = () => {
      if (document.hidden) {
        isPageVisible = false;
        stopLoop();
        return;
      }
      isPageVisible = true;

      // Natural fade-out as user scrolls out of the Homepage (#top)
      // At scrollY = 0 -> opacity = 1.0
      // By scrollY = 82% of Hero height -> opacity = 0.0 & WebGL loop pauses for pure reading clarity
      const heroHeight = window.innerHeight || 800;
      const scrollY = window.scrollY;
      const fadeDistance = heroHeight * 0.82;
      const rawRatio = Math.max(0, Math.min(1, 1 - scrollY / fadeDistance));
      const smoothOpacity = Math.pow(rawRatio, 1.5);

      if (smoothOpacity <= 0.01) {
        container.style.opacity = '0';
        container.style.visibility = 'hidden';
        stopLoop();
      } else {
        container.style.visibility = 'visible';
        container.style.opacity = smoothOpacity.toFixed(3);
        startLoop();
      }
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity = Math.min(Math.abs(currentScrollY - lastScrollY), 60);
      lastScrollY = currentScrollY;

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetScrollOffset = maxScroll > 0 ? currentScrollY / maxScroll : 0;

      updateSpatialAtmosphere();
    };

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxPixelRatio));
      updateSpatialAtmosphere();
    };

    const handleVisibilityChange = () => {
      updateSpatialAtmosphere();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    updateSpatialAtmosphere();

    function animate() {
      if (!isRunning) return;
      animationFrameId = requestAnimationFrame(animate);

      scrollVelocity *= 0.92;
      scrollOffset += (targetScrollOffset - scrollOffset) * 0.08;

      if (!prefersReducedMotion) {
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;

        const deltaX = mouse.x - prevMouseX;
        const deltaY = mouse.y - prevMouseY;
        prevMouseX = mouse.x;
        prevMouseY = mouse.y;

        mouseVelocity.vx += (deltaX - mouseVelocity.vx) * 0.35;
        mouseVelocity.vy += (deltaY - mouseVelocity.vy) * 0.35;
        mouseVelocity.speed = Math.hypot(mouseVelocity.vx, mouseVelocity.vy);

        const targetCamX = mouse.x * 0.45;
        const targetCamY = mouse.y * 0.32;
        const targetCamRotX = mouse.y * 0.02;
        const targetCamRotY = -mouse.x * 0.02;

        camera.position.x += (targetCamX - camera.position.x) * 0.05;
        camera.position.y += (targetCamY - camera.position.y) * 0.05;
        camera.position.z = 8.0;
        camera.rotation.x += (targetCamRotX - camera.rotation.x) * 0.05;
        camera.rotation.y += (targetCamRotY - camera.rotation.y) * 0.05;
        camera.rotation.z = 0;

        if (activeSceneController) {
          activeSceneController.update(mouse, mouseVelocity, scrollOffset, scrollVelocity);
        }
      }

      renderer.render(scene, camera);
    }

    return () => {
      stopLoop();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      if (activeSceneController) {
        activeSceneController.dispose();
      }
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="spatial-canvas-layer"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 'var(--z-spatial)',
        overflow: 'hidden',
        transition: 'opacity 220ms ease-out'
      }}
      aria-hidden="true"
    />
  );
};

export default SpatialCanvas;
