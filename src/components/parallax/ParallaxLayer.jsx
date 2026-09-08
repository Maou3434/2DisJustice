import React, { useEffect, useRef } from 'react';
import { useParallaxContext } from './ParallaxEngine.jsx';

/**
 * ParallaxLayer
 * 
 * @param {number} speed - Relative scroll speed multiplier:
 *   0.2 = deep background (moves 5x slower than foreground)
 *   0.5 = midground atmosphere
 *   1.0 = standard content plane
 *   1.5 = foreground floating layer (rushes past camera)
 * @param {number} mouseFactor - Pixels of cursor shift
 * @param {number} rotateFactor - Max degrees of subtle tilt
 * @param {number} zDepth - CSS 3D translateZ in pixels
 * @param {string} direction - 'vertical' | 'lateral'
 */
export const ParallaxLayer = ({
  children,
  speed = 0.5,
  mouseFactor = 12,
  rotateFactor = 0,
  zDepth = 0,
  direction = 'vertical',
  className = '',
  style = {}
}) => {
  const nodeRef = useRef(null);
  const { registerLayer } = useParallaxContext();

  useEffect(() => {
    if (!nodeRef.current || !registerLayer) return;
    const unregister = registerLayer(nodeRef.current, {
      speed,
      mouseFactor,
      rotateFactor,
      zDepth,
      direction
    });
    return unregister;
  }, [speed, mouseFactor, rotateFactor, zDepth, direction, registerLayer]);

  return (
    <div
      ref={nodeRef}
      className={`parallax-layer ${className}`}
      style={{
        willChange: 'transform',
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
        ...style
      }}
    >
      {children}
    </div>
  );
};
