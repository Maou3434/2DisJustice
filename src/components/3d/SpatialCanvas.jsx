import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { TsushimaScene } from './TsushimaScene.js';

export const SpatialCanvas = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.appendChild(renderer.domElement);

    // 2. Active Scene Controller (Tsushima atmospheric falling leaves & embers)
    const activeSceneController = new TsushimaScene(scene, camera);

    // 3. Mouse & Scroll Velocity Tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const mouseVelocity = { vx: 0, vy: 0, speed: 0 };
    let prevMouseX = 0;
    let prevMouseY = 0;
    let scrollOffset = 0;
    let targetScrollOffset = 0;
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let isVisible = true;

    const checkVisibility = () => {
      isVisible = !document.hidden;
    };

    const handleMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetScrollOffset = maxScroll > 0 ? currentScrollY / maxScroll : 0;

      checkVisibility();
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const handleVisibilityChange = () => {
      checkVisibility();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 4. Render Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return; // Throttles GPU/battery when reading lower text tables

      // Decay scroll velocity smoothly
      scrollVelocity *= 0.92;
      scrollOffset += (targetScrollOffset - scrollOffset) * 0.08;

      if (!prefersReducedMotion) {
        // Smooth lerp mouse coordinates
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;

        // Calculate smooth mouse velocity for wind vortex physics
        const deltaX = mouse.x - prevMouseX;
        const deltaY = mouse.y - prevMouseY;
        prevMouseX = mouse.x;
        prevMouseY = mouse.y;

        mouseVelocity.vx += (deltaX - mouseVelocity.vx) * 0.35;
        mouseVelocity.vy += (deltaY - mouseVelocity.vy) * 0.35;
        mouseVelocity.speed = Math.hypot(mouseVelocity.vx, mouseVelocity.vy);

        // Steady camera with subtle mouse sway
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
    };
    animate();

    // 5. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
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
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 12,
        overflow: 'hidden'
      }}
      aria-hidden="true"
    />
  );
};
