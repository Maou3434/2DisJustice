import React from 'react';
import { SceneBackdrop } from '../common/SceneBackdrop.jsx';

export const TechnicalMatrix = () => {
  const skillCategories = [
    {
      idx: '01',
      title: 'Core Languages',
      skills: ['Python', 'Modern C++', 'Java', 'TypeScript / JS', 'SQL / PL-SQL', 'C']
    },
    {
      idx: '02',
      title: 'Physics-ML & Deep Learning',
      skills: ['PyTorch', 'PINN Digital Twins', 'Sentence Transformers', 'XGBoost', 'LaBSE / MuRIL', 'Local RAG']
    },
    {
      idx: '03',
      title: 'Lakehouse & Data Systems',
      skills: ['DuckDB (Vectorized OLAP)', 'Delta Lake', 'Medallion Architecture', 'SCD Type 2', 'MySQL', 'MongoDB']
    },
    {
      idx: '04',
      title: 'Distributed Backends & Web',
      skills: ['FastAPI (Async)', 'Spring Boot', 'Django', 'React 19', 'Three.js / WebGL', 'Docker']
    },
    {
      idx: '05',
      title: 'GPU Acceleration & Simulation',
      skills: ['CUDA C/C++', 'DirectML GPU', 'AMP / TF32', 'MATLAB / Simulink', 'OpenCV', 'Quantized Edge SLMs']
    },
    {
      idx: '06',
      title: 'Cloud, PaaS & Embedded IoT',
      skills: ['AWS (EC2, S3, DynamoDB)', 'ESP32 & MQTT Telemetry', 'GitHub / Netlify / Railway APIs', 'SonarQube', 'FSM / CDFG']
    }
  ];

  return (
    <section id="skills" className="scene-section skills-section">
      {/* Dedicated Cedar Lantern Shrine Backdrop */}
      <SceneBackdrop
        image="/images/cinematic_shrine.png"
        position="center 40%"
        opacity={0.78}
        overlayDarkness={0.84}
      />

      {/* Restrained Chapter Number Watermark */}
      <div className="section-backdrop-watermark" aria-hidden="true">
        <span className="wm-number">05</span>
      </div>

      <div className="container scene-content skills-content">
        
        {/* Clean Editorial Scene Header */}
        <div className="scene-head-editorial">
          <div className="scene-head-top">
            <div className="scene-head-left">
              <span className="scene-eyebrow">05 // COMPETENCIES</span>
              <h2 className="scene-title-editorial">Technical Disciplines</h2>
            </div>
          </div>
          <div className="scene-divider-rule" />
        </div>

        {/* Breathable Left-to-Right Architectural Ledger */}
        <div className="skills-ledger">
          {skillCategories.map((cat, idx) => (
            <div
              key={cat.title}
              className={`ledger-row reveal-item reveal-delay-${(idx % 3) + 1}`}
            >
              <div className="ledger-left">
                <span className="ledger-idx mono">{cat.idx}</span>
                <h3 className="ledger-title">{cat.title}</h3>
              </div>

              <div className="ledger-right mono">
                {cat.skills.map((skill) => (
                  <span key={skill} className="ledger-skill-chip">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .skills-section {
          background-color: var(--bg-primary);
        }

        .skills-ledger {
          display: flex;
          flex-direction: column;
        }

        .ledger-row {
          display: grid;
          grid-template-columns: 340px 1fr;
          align-items: center;
          gap: clamp(2rem, 4.5vw, 4rem);
          padding: clamp(1.75rem, 3.4vh, 2.35rem) 0;
          border-bottom: 1px solid var(--border-subtle);
          transition: border-color 220ms ease;
        }

        .ledger-row:first-child {
          padding-top: 0.5rem;
        }

        .ledger-row:hover {
          border-bottom-color: var(--border-accent);
        }

        .ledger-left {
          display: flex;
          align-items: baseline;
          gap: 18px;
        }

        .ledger-idx {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--accent-primary);
          letter-spacing: 0.1em;
        }

        .ledger-title {
          font-family: var(--font-heading);
          font-size: clamp(1.35rem, 1.8vw, 1.65rem);
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.01em;
        }

        .ledger-right {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
        }

        .ledger-skill-chip {
          font-size: 0.875rem;
          color: var(--text-secondary);
          padding: 6px 14px;
          background: rgba(245, 239, 230, 0.04);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          transition: all 180ms ease;
        }

        .ledger-row:hover .ledger-skill-chip {
          color: var(--text-primary);
          border-color: var(--border-prominent);
        }

        @media (max-width: 860px) {
          .ledger-row {
            grid-template-columns: 1fr;
            gap: 14px;
          }
        }
      `}</style>
    </section>
  );
};

export default TechnicalMatrix;
