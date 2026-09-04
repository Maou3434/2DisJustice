import React, { useEffect, useRef } from 'react';

export const WaterbrushCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: false });
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Preload top image (original Tsushima landscape)
    const topImg = new Image();
    topImg.src = '/images/tsushima-hero-bg.jpg';
    let isImageLoaded = false;
    topImg.onload = () => {
      isImageLoaded = true;
    };

    // Responsive Canvas Resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Trail of active brush strokes
    let trail = [];
    let lastX = null;
    let lastY = null;
    let lastTime = performance.now();

    // Generate organic uneven bristle offsets for calligraphy feel
    const createBristleOffsets = () => {
      const offsets = [];
      const count = 7;
      for (let i = 0; i < count; i++) {
        offsets.push({
          relOffset: (i / (count - 1) - 0.5) * 2, // -1 to +1
          widthMult: 0.3 + Math.random() * 0.5,
          opacityMult: 0.5 + Math.random() * 0.5,
          phase: Math.random() * Math.PI * 2
        });
      }
      return offsets;
    };

    const bristleConfig = createBristleOffsets();

    const handleMouseMove = (e) => {
      const currentX = e.clientX;
      const currentY = e.clientY;
      const currentTime = performance.now();

      if (lastX !== null && lastY !== null) {
        const dx = currentX - lastX;
        const dy = currentY - lastY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const dt = Math.max(currentTime - lastTime, 1);
        const speed = dist / dt;

        // Skip micro-jitters
        if (dist > 3) {
          const angle = Math.atan2(dy, dx);
          // Calligraphy width: juicy & broad when slow, dynamic & tapered when fast
          const baseWidth = Math.max(35, Math.min(105, 85 - speed * 18));

          // Generate fine ink splatters along the movement arc
          const splatters = [];
          if (Math.random() > 0.6) {
            const count = Math.floor(1 + Math.random() * 3);
            for (let s = 0; s < count; s++) {
              const sAngle = angle + (Math.random() - 0.5) * 1.5;
              const sDist = baseWidth * 0.6 + Math.random() * (speed * 12 + 25);
              splatters.push({
                x: currentX + Math.cos(sAngle) * sDist,
                y: currentY + Math.sin(sAngle) * sDist,
                radius: 2 + Math.random() * 7,
                life: 1.0
              });
            }
          }

          trail.push({
            startX: lastX,
            startY: lastY,
            endX: currentX,
            endY: currentY,
            angle,
            width: baseWidth,
            life: 1.0,
            decay: 0.016 + Math.random() * 0.006, // Disappears after ~1.2 - 1.5s
            splatters
          });
        }
      }

      lastX = currentX;
      lastY = currentY;
      lastTime = currentTime;
    };

    const handleMouseLeave = () => {
      lastX = null;
      lastY = null;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Calculate aspect ratio cover for drawing image on canvas
    const drawCoverImage = (img) => {
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = width / height;
      let renderW, renderH, offsetX, offsetY;

      if (canvasRatio > imgRatio) {
        renderW = width;
        renderH = width / imgRatio;
        offsetX = 0;
        offsetY = (height - renderH) / 2;
      } else {
        renderH = height;
        renderW = height * imgRatio;
        offsetX = (width - renderW) / 2;
        offsetY = 0;
      }

      ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
    };

    // Main animation loop
    let animationId;
    const render = () => {
      animationId = requestAnimationFrame(render);

      // 1. Draw top image (original Tsushima landscape)
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1.0;

      if (isImageLoaded) {
        drawCoverImage(topImg);
      } else {
        ctx.fillStyle = '#0A0B0E';
        ctx.fillRect(0, 0, width, height);
      }

      // Add a subtle dark atmospheric vignette over the top image
      const vigGrad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.25,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.75
      );
      vigGrad.addColorStop(0, 'rgba(10, 11, 14, 0.15)');
      vigGrad.addColorStop(1, 'rgba(10, 11, 14, 0.65)');
      ctx.fillStyle = vigGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Erase top image with active waterbrush strokes (revealing the painting underneath!)
      if (trail.length > 0) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        for (let i = trail.length - 1; i >= 0; i--) {
          const p = trail[i];

          // Draw uneven, flowy calligraphy bristle ribbons
          const normalX = -Math.sin(p.angle);
          const normalY = Math.cos(p.angle);

          for (let b = 0; b < bristleConfig.length; b++) {
            const bristle = bristleConfig[b];
            const offsetDist = bristle.relOffset * (p.width * 0.45);
            const bStartX = p.startX + normalX * offsetDist;
            const bStartY = p.startY + normalY * offsetDist;
            const bEndX = p.endX + normalX * offsetDist;
            const bEndY = p.endY + normalY * offsetDist;

            ctx.globalAlpha = p.life * bristle.opacityMult;
            ctx.lineWidth = p.width * bristle.widthMult;

            ctx.beginPath();
            ctx.moveTo(bStartX, bStartY);
            ctx.lineTo(bEndX, bEndY);
            ctx.stroke();
          }

          // Draw associated fine water splatters
          if (p.splatters && p.splatters.length > 0) {
            for (let s = 0; s < p.splatters.length; s++) {
              const sp = p.splatters[s];
              ctx.globalAlpha = p.life * 0.75;
              ctx.beginPath();
              ctx.arc(sp.x, sp.y, sp.radius, 0, Math.PI * 2);
              ctx.fill();
            }
          }

          // Decay life so the stroke gracefully disappears!
          p.life -= p.decay;

          // Remove completed stroke
          if (p.life <= 0) {
            trail.splice(i, 1);
          }
        }
      }
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="waterbrush-container" aria-hidden="true">
      {/* 1. Underlying Japanese Nihonga Masterpiece Painting */}
      <div
        className="waterbrush-underlying-painting"
        style={{ backgroundImage: "url('/images/japanese-painting.jpg')" }}
      />
      {/* 2. Top Canvas: Renders original Tsushima picture & cuts away with dissolving waterbrush */}
      <canvas ref={canvasRef} className="waterbrush-top-canvas" />

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
          filter: contrast(1.1) brightness(0.98);
        }

        .waterbrush-top-canvas {
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
