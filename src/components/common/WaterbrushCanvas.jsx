import React, { useEffect, useRef } from 'react';

/**
 * WaterbrushCanvas
 * 
 * High-performance, Retina-ready watercolor canvas engine simulating authentic Japanese
 * waterbrush (Mizufude) / Nihonga wet-on-wet wash mechanics:
 * 
 * 1. High-DPI physical pixel canvas scaling for razor-sharp 2K/4K clarity.
 * 2. Pre-rendered procedural watercolor wash stamps with wet meniscus (coffee-ring) diffusion.
 * 3. Quadratic Bézier spline interpolation for buttery, flowy, curvaceous stroke tracking.
 * 4. Dynamic hydrodynamic water pooling: broad luxurious wash when slow, elegant tapered flow when fast.
 * 5. Organic capillary edge diffusion and micro-droplet satellite blooms.
 * 6. Graceful, silky dissolve (~1.8s) revealing and evaporating back into the top landscape.
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

    // 1. Offscreen Mask Canvas for drawing & fading watercolor strokes
    const maskCanvas = document.createElement('canvas');
    const maskCtx = maskCanvas.getContext('2d', { willReadFrequently: false });

    // Set canvas dimensions with DPR scaling
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

    // 2. Preload top image (original Tsushima landscape)
    const topImg = new Image();
    topImg.src = '/images/tsushima-hero-bg.jpg';
    let isTopLoaded = false;
    topImg.onload = () => {
      isTopLoaded = true;
    };

    // 3. Pre-render Procedural Watercolor Stamp Textures (Extreme 120fps performance + organic wet bleed)
    const STAMP_SIZE = 256;
    const createWatercolorStamp = (type = 'wash') => {
      const sCanvas = document.createElement('canvas');
      sCanvas.width = STAMP_SIZE;
      sCanvas.height = STAMP_SIZE;
      const sCtx = sCanvas.getContext('2d');
      const center = STAMP_SIZE / 2;
      const baseRadius = STAMP_SIZE * 0.44;

      if (type === 'wash') {
        // Deep rich watercolor core with soft feathered capillary bleed
        const grad = sCtx.createRadialGradient(center, center, 0, center, center, baseRadius);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.92)');
        grad.addColorStop(0.48, 'rgba(255, 255, 255, 0.82)');
        grad.addColorStop(0.76, 'rgba(255, 255, 255, 0.48)');
        grad.addColorStop(0.92, 'rgba(255, 255, 255, 0.16)');
        grad.addColorStop(1.0, 'rgba(255, 255, 255, 0)');

        sCtx.fillStyle = grad;
        sCtx.beginPath();
        // 24-point organic deformed polygon for natural paper-bleed perimeter
        const verts = 24;
        for (let i = 0; i < verts; i++) {
          const theta = (i / verts) * Math.PI * 2;
          const wobble = 1 + 0.11 * Math.sin(theta * 3.3) + 0.07 * Math.cos(theta * 5.1);
          const r = baseRadius * wobble;
          const vx = center + Math.cos(theta) * r;
          const vy = center + Math.sin(theta) * r;
          if (i === 0) sCtx.moveTo(vx, vy);
          else sCtx.lineTo(vx, vy);
        }
        sCtx.closePath();
        sCtx.fill();
      } else if (type === 'meniscus') {
        // Wet edge pooling / coffee-ring effect (pigment particles driven to the water boundary)
        const grad = sCtx.createRadialGradient(center, center, 0, center, center, baseRadius);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.65)');
        grad.addColorStop(0.68, 'rgba(255, 255, 255, 0.74)');
        grad.addColorStop(0.86, 'rgba(255, 255, 255, 0.95)'); // Dense wet edge
        grad.addColorStop(0.95, 'rgba(255, 255, 255, 0.28)');
        grad.addColorStop(1.0, 'rgba(255, 255, 255, 0)');

        sCtx.fillStyle = grad;
        sCtx.beginPath();
        const verts = 28;
        for (let i = 0; i < verts; i++) {
          const theta = (i / verts) * Math.PI * 2;
          const wobble = 1 + 0.13 * Math.sin(theta * 4.2) + 0.08 * Math.cos(theta * 2.7);
          const r = baseRadius * wobble;
          const vx = center + Math.cos(theta) * r;
          const vy = center + Math.sin(theta) * r;
          if (i === 0) sCtx.moveTo(vx, vy);
          else sCtx.lineTo(vx, vy);
        }
        sCtx.closePath();
        sCtx.fill();
      } else if (type === 'bleed_bloom') {
        // Satellite water droplet bloom with delicate translucent bleed
        const grad = sCtx.createRadialGradient(center, center, 0, center, center, baseRadius * 0.85);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.80)');
        grad.addColorStop(0.55, 'rgba(255, 255, 255, 0.44)');
        grad.addColorStop(0.88, 'rgba(255, 255, 255, 0.14)');
        grad.addColorStop(1.0, 'rgba(255, 255, 255, 0)');

        sCtx.fillStyle = grad;
        sCtx.beginPath();
        const verts = 18;
        for (let i = 0; i < verts; i++) {
          const theta = (i / verts) * Math.PI * 2;
          const wobble = 1 + 0.18 * Math.sin(theta * 2.8) + 0.12 * Math.cos(theta * 4.7);
          const r = baseRadius * 0.85 * wobble;
          const vx = center + Math.cos(theta) * r;
          const vy = center + Math.sin(theta) * r;
          if (i === 0) sCtx.moveTo(vx, vy);
          else sCtx.lineTo(vx, vy);
        }
        sCtx.closePath();
        sCtx.fill();
      }

      return sCanvas;
    };

    const stampWash = createWatercolorStamp('wash');
    const stampMeniscus = createWatercolorStamp('meniscus');
    const stampBloom = createWatercolorStamp('bleed_bloom');

    // Stamp a single watercolor wash onto the mask canvas
    const stampWatercolorDab = (x, y, radius, alpha, angle = 0, variant = 0) => {
      maskCtx.save();
      maskCtx.translate(x * dpr, y * dpr);
      maskCtx.rotate(angle);
      maskCtx.globalAlpha = Math.max(0.05, Math.min(1.0, alpha));

      const stamp = variant === 1 ? stampMeniscus : variant === 2 ? stampBloom : stampWash;
      const drawDiameter = radius * 2 * dpr;
      maskCtx.drawImage(
        stamp,
        -drawDiameter / 2,
        -drawDiameter / 2,
        drawDiameter,
        drawDiameter
      );
      maskCtx.restore();
    };

    // Responsive Canvas Resize
    const handleResize = () => {
      setDimensions();
    };
    window.addEventListener('resize', handleResize);

    // Throttle rendering when user scrolls away from hero
    let isVisible = true;
    const handleScroll = () => {
      isVisible = window.scrollY < window.innerHeight * 1.3;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 4. Hydrodynamic Fluid Flow & Quadratic Bézier Tracking
    const pointsHistory = [];
    let currentRadius = 65;
    let strokeCounter = 0;

    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      const time = performance.now();

      if (pointsHistory.length > 0) {
        const last = pointsHistory[pointsHistory.length - 1];
        const dtLast = time - last.time;
        const dLast = Math.hypot(x - last.x, y - last.y);
        // Reset on long pauses or teleport jumps
        if (dtLast > 120 || dLast > 180) {
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
      const speed = dist / dt; // pixels per millisecond

      if (dist < 1.5) return;

      // Hydrodynamic brush dynamics:
      // Slow or resting: water pools outward into a broad, wet wash (up to 115px).
      // Fast sweep: tapers down gracefully to an agile liquid stream (down to 46px).
      const targetRadius = Math.max(46, Math.min(115, 96 - speed * 16));
      // Smooth liquid dampening on radius
      currentRadius += (targetRadius - currentRadius) * 0.32;

      // Curve smoothing via Quadratic Bézier interpolation
      let pStart, pCtrl, pEnd;
      if (pointsHistory.length >= 3) {
        const pOlder = pointsHistory[pointsHistory.length - 3];
        pStart = { x: (pOlder.x + pPrev.x) / 2, y: (pOlder.y + pPrev.y) / 2 };
        pCtrl = pPrev;
        pEnd = { x: (pPrev.x + pCurr.x) / 2, y: (pPrev.y + pCurr.y) / 2 };
      } else {
        pStart = pPrev;
        pCtrl = { x: (pPrev.x + pCurr.x) / 2, y: (pPrev.y + pCurr.y) / 2 };
        pEnd = pCurr;
      }

      // Step along the Bézier curve every 4-6 pixels for seamless, continuous water wash
      const approxCurveLength = Math.hypot(pEnd.x - pStart.x, pEnd.y - pStart.y);
      const numSteps = Math.max(2, Math.ceil(approxCurveLength / 4.5));

      const angle = Math.atan2(dy, dx);
      const normalX = -Math.sin(angle);
      const normalY = Math.cos(angle);

      for (let s = 0; s <= numSteps; s++) {
        const t = s / numSteps;
        const invT = 1 - t;
        // Quadratic Bézier formula
        const bx = invT * invT * pStart.x + 2 * invT * t * pCtrl.x + t * t * pEnd.x;
        const bY = invT * invT * pStart.y + 2 * invT * t * pCtrl.y + t * t * pEnd.y;

        strokeCounter++;

        // Subtle organic lateral oscillation (simulating uneven paper grain & water flow)
        const lateralJitter = Math.sin(strokeCounter * 0.28) * (currentRadius * 0.09);
        const px = bx + normalX * lateralJitter;
        const py = bY + normalY * lateralJitter;

        const dabRadius = currentRadius * (1 + 0.08 * Math.sin(strokeCounter * 0.42));
        const rotAngle = angle + (Math.sin(strokeCounter * 0.15) * 0.35);

        // Core primary wash
        stampWatercolorDab(px, py, dabRadius, 0.88, rotAngle, 0);

        // Wet meniscus outer rim on alternating sub-steps for authentic coffee-ring edge
        if (s % 2 === 0) {
          stampWatercolorDab(px, py, dabRadius * 1.05, 0.70, rotAngle + 0.4, 1);
        }

        // Inner fluid core ribbon
        if (s % 3 === 0) {
          stampWatercolorDab(px, py, dabRadius * 0.65, 0.85, rotAngle, 0);
        }

        // Water droplet bleed blooms along stroke perimeter (wet diffusion)
        if (speed < 1.4 && Math.random() > 0.72) {
          const bleedSide = Math.random() > 0.5 ? 1 : -1;
          const bleedDist = dabRadius * (0.6 + Math.random() * 0.45);
          const bleedX = px + normalX * bleedDist * bleedSide;
          const bleedY = py + normalY * bleedDist * bleedSide;
          const bleedRad = dabRadius * (0.28 + Math.random() * 0.28);
          stampWatercolorDab(bleedX, bleedY, bleedRad, 0.55, Math.random() * Math.PI * 2, 2);
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

      // Skip heavy drawing if user scrolled past the hero
      if (!isVisible) return;

      // 1. Gently fade mask so revealed waterbrush strokes dissolve away like evaporating water (~1.8s)
      maskCtx.globalCompositeOperation = 'destination-out';
      maskCtx.fillStyle = 'rgba(0, 0, 0, 0.016)';
      maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
      maskCtx.globalCompositeOperation = 'source-over';

      // 2. Clear and draw top cover image (high-res Tsushima landscape)
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

      // 3. Cut out the mask from the top canvas using destination-out!
      // This seamlessly reveals the underlying Japanese watercolor masterpiece through the fluid wash!
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
      {/* 1. Underlying Japanese Nihonga Masterpiece (4K UHD, rich watercolor pigments) */}
      <div
        className="waterbrush-underlying-painting"
        style={{ backgroundImage: "url('/images/japanese-painting.jpg')" }}
      />
      {/* 2. Top Canvas: Renders original Tsushima landscape & dissolves reveal via watery flow */}
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
          filter: contrast(1.08) brightness(1.02);
          image-rendering: auto;
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
