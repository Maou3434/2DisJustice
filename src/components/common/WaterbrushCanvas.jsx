import React, { useEffect, useRef } from 'react';

export const WaterbrushCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: false });
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse position and velocity
    let mouseX = -1000;
    let mouseY = -1000;
    let prevMouseX = -1000;
    let prevMouseY = -1000;
    let isMouseMoving = false;
    let idleTimer = null;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initOverlay();
    };

    // Initialize the dark sumi ink wash overlay
    const initOverlay = () => {
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#0A0B0E';
      ctx.fillRect(0, 0, width, height);
    };

    initOverlay();

    // Create a smooth organic calligraphy brush stamp
    const brushCanvas = document.createElement('canvas');
    const brushSize = 130;
    brushCanvas.width = brushSize;
    brushCanvas.height = brushSize;
    const bCtx = brushCanvas.getContext('2d');

    const createBrushTip = () => {
      bCtx.clearRect(0, 0, brushSize, brushSize);
      const grad = bCtx.createRadialGradient(
        brushSize / 2,
        brushSize / 2,
        0,
        brushSize / 2,
        brushSize / 2,
        brushSize / 2
      );
      // Soft feathered watercolor edge
      grad.addColorStop(0, 'rgba(0, 0, 0, 1.0)');
      grad.addColorStop(0.35, 'rgba(0, 0, 0, 0.95)');
      grad.addColorStop(0.7, 'rgba(0, 0, 0, 0.45)');
      grad.addColorStop(0.9, 'rgba(0, 0, 0, 0.12)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      bCtx.fillStyle = grad;
      bCtx.beginPath();
      bCtx.arc(brushSize / 2, brushSize / 2, brushSize / 2, 0, Math.PI * 2);
      bCtx.fill();
    };

    createBrushTip();

    // Splatter particles for waterbrush flourish
    const splatters = [];
    const addSplatter = (x, y, speed) => {
      if (Math.random() > 0.4) return;
      const count = Math.floor(1 + Math.random() * 3);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = 30 + Math.random() * (speed * 1.8 + 40);
        splatters.push({
          x: x + Math.cos(angle) * dist,
          y: y + Math.sin(angle) * dist,
          radius: 4 + Math.random() * 14,
          opacity: 0.8
        });
      }
    };

    const handleMouseMove = (e) => {
      prevMouseX = mouseX;
      prevMouseY = mouseY;
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseMoving = true;

      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        isMouseMoving = false;
        prevMouseX = -1000;
        prevMouseY = -1000;
      }, 80);

      // Draw brush stroke between prev and current position
      if (prevMouseX > -500 && prevMouseY > -500) {
        const dx = mouseX - prevMouseX;
        const dy = mouseY - prevMouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const steps = Math.max(Math.floor(dist / 8), 1);

        addSplatter(mouseX, mouseY, dist);

        ctx.globalCompositeOperation = 'destination-out';

        for (let i = 0; i < steps; i++) {
          const t = i / steps;
          const curX = prevMouseX + dx * t;
          const curY = prevMouseY + dy * t;
          // Brush size dynamically responds to speed (wider when slower, focused when quick)
          const dynamicSize = Math.max(70, Math.min(130, 110 - dist * 0.3));
          ctx.drawImage(
            brushCanvas,
            curX - dynamicSize / 2,
            curY - dynamicSize / 2,
            dynamicSize,
            dynamicSize
          );
        }
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Render loop: Draws splatters and softly restores mist wash over time
    let animationId;
    let lastTime = performance.now();

    const render = (time) => {
      animationId = requestAnimationFrame(render);
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      // Draw active splatters
      if (splatters.length > 0) {
        ctx.globalCompositeOperation = 'destination-out';
        for (let i = splatters.length - 1; i >= 0; i--) {
          const sp = splatters[i];
          ctx.beginPath();
          ctx.arc(sp.x, sp.y, sp.radius, 0, Math.PI * 2);
          ctx.fill();
          splatters.splice(i, 1);
        }
      }

      // Very subtle, poetic ink mist healing (slowly regenerates over 12-15 seconds)
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(10, 11, 14, 0.0035)';
      ctx.fillRect(0, 0, width, height);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(idleTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="waterbrush-container" aria-hidden="true">
      {/* Underlying Japanese Masterpiece Painting */}
      <div
        className="waterbrush-underlying-painting"
        style={{ backgroundImage: "url('/images/japanese-painting.jpg')" }}
      />
      {/* Interactive Mask Canvas (erased by brush cursor) */}
      <canvas ref={canvasRef} className="waterbrush-mask-canvas" />

      <style>{`
        .waterbrush-container {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .waterbrush-underlying-painting {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          filter: contrast(1.1) brightness(0.95);
          opacity: 0.92;
        }

        .waterbrush-mask-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: block;
        }
      `}</style>
    </div>
  );
};
