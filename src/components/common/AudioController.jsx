import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const AudioController = () => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);

  const playTactileSound = () => {
    if (!isAudioEnabled) return;

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      // Pentatonic Bamboo / Wind Chime (Harmonic soft decay)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5 note
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3); // A5

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch (e) {
      // AudioContext policy catch
    }
  };

  useEffect(() => {
    // Add audio feedback to clicks if enabled
    const handleClick = (e) => {
      const target = e.target.closest('button, a, .interactive-card');
      if (target) {
        playTactileSound();
      }
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [isAudioEnabled]);

  return (
    <button
      onClick={() => setIsAudioEnabled(prev => !prev)}
      className="audio-toggle-btn"
      aria-label={isAudioEnabled ? 'Mute atmospheric audio' : 'Enable tactile atmospheric audio'}
      title={isAudioEnabled ? 'Sound: Active (Click to mute)' : 'Sound: Muted (Click to enable)'}
    >
      {isAudioEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
      <span className="audio-status-dot" style={{ backgroundColor: isAudioEnabled ? 'var(--accent-primary)' : 'var(--text-muted)' }} />

      <style>{`
        .audio-toggle-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          height: 32px;
          padding: 0 10px;
          background: rgba(18, 20, 26, 0.85);
          backdrop-filter: blur(10px);
          border: 1px solid var(--border-prominent);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          transition: all var(--transition-fast);
          cursor: pointer;
          box-sizing: border-box;
        }

        .audio-toggle-btn:hover {
          color: var(--text-primary);
          border-color: var(--accent-primary);
          box-shadow: 0 0 12px var(--accent-glow);
          transform: translateY(-1px);
        }

        .audio-status-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          transition: background-color var(--transition-fast);
        }
      `}</style>
    </button>
  );
};
