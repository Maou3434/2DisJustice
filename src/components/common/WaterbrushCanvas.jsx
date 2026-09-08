import React, { useEffect, useRef } from 'react';

/**
 * WaterbrushCanvas
 * 
 * Silky-smooth, atmospheric mist parting & landscape reveal engine:
 * 1. High-DPI Retina physical pixel scaling for 2K/4K displays.
 * 2. Natural Gaussian vapor dispersion: soft, continuous cubic-Hermite falloff without artificial brush rims.
 * 3. Quadratic Bézier path interpolation for continuous, gap-free fluid motion.
 * 4. Organic clearing aperture that expands smoothly when moving and breathes softly when hovering.
 * 5. Natural atmospheric mist dissipation (~2.2s) as the fog gently rolls back in.
 */
export const WaterbrushCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: false });
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let cssWidth = window.innerWidth;
    let cssHeight = window.innerHeight;

    // 1. Offscreen Mask Canvas for drawing & dissipating vapor clears
    const maskCanvas = document.createElement('canvas');
    const maskCtx = maskCanvas.getContext('2d', { willReadFrequently: false });

    const setDimensions = () => {
      cssWidth = window.innerWidth;
      cssHeight = window.innerHeight;

      canvas.width = Math.round(cssWidth * dpr);
      canvas.height = Math.round(cssHeight * dpr);
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;

      maskCanvas.width = Math.round(cssWidth * dpr);
      maskCanvas.height = Math.round(cssHeight * dpr);
    };

    setDimensions();

    // 2. Preload top image (Tsushima mountain landscape)
    const topImg = new Image();
    topImg.src = '/images/tsushima-hero-bg.jpg';
    let isTopLoaded = false;
    topImg.onload = () => {
      isTopLoaded = true;
    };

    // 3. Pre-render Soft Atmospheric Vapor Plumes (Zero jank 120fps GPU caching)
    const STAMP_SIZE = 256;
    const createVaporPlume = () => {
      const sCanvas = document.createElement('canvas');
      sCanvas.width = STAMP_SIZE;
      sCanvas.height = STAMP_SIZE;
      const sCtx = sCanvas.getContext('2d');
      const center = STAMP_SIZE / 2;
      const radius = STAMP_SIZE * 0.46;

      // Soft natural Hermite Gaussian falloff
      const grad = sCtx.createRadialGradient(center, center, 0, center, center, radius);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      grad.addColorStop(0.35, 'rgba(255, 255, 255, 0.82)');
      grad.addColorStop(0.65, 'rgba(255, 255, 255, 0.42)');
      grad.addColorStop(0.85, 'rgba(255, 255, 255, 0.12)');
      grad.addColorStop(1.0, 'rgba(255, 255, 255, 0)');

      sCtx.fillStyle = grad;
      sCtx.beginPath();
      sCtx.arc(center, center, radius, 0, Math.PI * 2);
      sCtx.fill();

      return sCanvas;
    };

    const vaporStamp = createVaporPlume();

    const stampVapor = (x, y, radius, alpha) => {
      maskCtx.save();
      maskCtx.translate(x * dpr, y * dpr);
      maskCtx.globalAlpha = Math.max(0.04, Math.min(1.0, alpha));

      const diameter = radius * 2 * dpr;
      maskCtx.drawImage(
        vaporStamp,
        -diameter / 2,
        -diameter / 2,
        diameter,
        diameter
      );
      maskCtx.restore();
    };

    const handleResize = () => {
      setDimensions();
    };
    window.addEventListener('resize', handleResize);

    // Throttle rendering when user scrolls away from hero
    let isVisible = true;
    const handleScroll = () => {
      isVisible = window.scrollY < window.innerHeight * 1.2;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 4. Natural Fluid Mist Parting
    const pointsHistory = [];
    let currentRadius = 80;

    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      const time = performance.now();

      if (pointsHistory.length > 0) {
        const last = pointsHistory[pointsHistory.length - 1];
        const dtLast = time - last.time;
        const dLast = Math.hypot(x - last.x, y - last.y);
        if (dtLast > 150 || dLast > 220) {
          pointsHistory.length = 0;
        }
      }

      pointsHistory.push({ x, y, time });
      if (pointsHistory.length > 4) {
        pointsHistory.shift();
      }

      if (pointsHistory.length < 2) return;

      const pCurr = pointsHistory[pointsHistory.length - 1];
      const pPrev = pointsHistory[pointsHistory.length - 2];
      const dx = pCurr.x - pPrev.x;
      const dy = pCurr.y - pPrev.y;
      const dist = Math.hypot(dx, dy);
      const dt = Math.max(pCurr.time - pPrev.time, 1);
      const speed = dist / dt;

      if (dist < 1.0) return;

      // Natural aperture dynamics:
      // Lingering / slow sweep: clears a wide, generous atmospheric aperture (~120px)
      // Fast motion: creates an agile, stream-like vapor trail (~60px)
      const targetRadius = Math.max(55, Math.min(125, 105 - speed * 18));
      currentRadius += (targetRadius - currentRadius) * 0.28;

      // Sub-pixel Bézier interpolation for unbroken, silky fluid flow
      const steps = Math.max(3, Math.ceil(dist / 8));
      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        // Smooth quadratic interpolation
        let px, py;
        if (pointsHistory.length >= 3) {
          const p0 = pointsHistory[pointsHistory.length - 3];
          const t1 = 1 - t;
          px = t1 * t1 * p0.x + 2 * t1 * t * pPrev.x + t * t * pCurr.x;
          py = t1 * t1 * p0.y + 2 * t1 * t * pPrev.y + t * t * pCurr.y;
        } else {
          px = pPrev.x + dx * t;
          py = pPrev.y + dy * t;
        }

        // Soft vapor plume
        stampVapor(px, py, currentRadius, 0.88);

        // Soft ambient mist halo for natural feathering
        if (s % 2 === 0) {
          stampVapor(px, py, currentRadius * 1.35, 0.35);
        }
      }
    };

    const handleMouseLeave = () => {
      pointsHistory.length = 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Calculate aspect-ratio cover drawing for top landscape image
    const drawCoverImage = (img) => {
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = cssWidth / cssHeight;
      let renderW, renderH, offsetX, offsetY;

      if (canvasRatio > imgRatio) {
        renderW = cssWidth;
        renderH = cssWidth / imgRatio;
        offsetX = 0;
        offsetY = (cssHeight - renderH) / 2;
      } else {
        renderH = cssHeight;
        renderW = cssHeight * imgRatio;
        offsetX = (cssWidth - renderW) / 2;
        offsetY = 0;
      }

      ctx.drawImage(
        img,
        offsetX * dpr,
        offsetY * dpr,
        renderW * dpr,
        renderH * dpr
      );
    };

    // Main 60fps render loop
    let animationId;
    const render = () => {
      animationId = requestAnimationFrame(render);

      if (!isVisible) return;

      // 1. Gently dissipate mask like morning fog closing back up (~2.4s)
      maskCtx.globalCompositeOperation = 'destination-out';
      maskCtx.fillStyle = 'rgba(0, 0, 0, 0.013)';
      maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
      maskCtx.globalCompositeOperation = 'source-over';

      // 2. Clear and draw top cover image (Tsushima mountain landscape)
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1.0;

      if (isTopLoaded) {
        drawCoverImage(topImg);
      } else {
        ctx.fillStyle = '#090A0E';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Subtle atmospheric vignette
      const vigGrad = ctx.createRadialGradient(
        (cssWidth / 2) * dpr,
        (cssHeight / 2) * dpr,
        Math.min(cssWidth, cssHeight) * 0.28 * dpr,
        (cssWidth / 2) * dpr,
        (cssHeight / 2) * dpr,
        Math.max(cssWidth, cssHeight) * 0.78 * dpr
      );
      vigGrad.addColorStop(0, 'rgba(9, 10, 14, 0.10)');
      vigGrad.addColorStop(1, 'rgba(9, 10, 14, 0.58)');
      ctx.fillStyle = vigGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 3. Cut out the mask using destination-out to seamlessly reveal the underlying Nihonga painting
      ctx.globalCompositeOperation = 'destination-out';
      ctx.drawImage(maskCanvas, 0, 0);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="waterbrush-container" aria-hidden="true">
      {/* 1. Underlying Japanese Nihonga Pagoda Painting (4K UHD) */}
      <div
        className="waterbrush-underlying-painting"
        style={{ backgroundImage: "url('/images/japanese-painting.jpg')" }}
      />
      {/* 2. Top Canvas: Tsushima landscape parting with natural vapor dispersion */}
      <canvas ref={canvasRef} className="waterbrush-top-canvas" />

      <style>{`
        .waterbrush-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 0;
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
          filter: contrast(1.06) brightness(1.02);
          image-rendering: auto;
        }

        .waterbrush-top-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: block;
        }
      `}</style>
    </div>
  );
};
