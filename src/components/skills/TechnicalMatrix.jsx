import React from 'react';
import { Code2, Cpu, Database, Terminal, Zap, Cloud } from 'lucide-react';
import { SceneBackdrop } from '../common/SceneBackdrop.jsx';

export const TechnicalMatrix = () => {
  const skillCategories = [
    {
      idx: '01',
      title: 'Core Languages',
      icon: <Code2 size={18} />,
      skills: ['Python', 'Modern C++', 'Java', 'TypeScript / JS', 'SQL / PL-SQL', 'C']
    },
    {
      idx: '02',
      title: 'Physics-ML & Deep Learning',
      icon: <Cpu size={18} />,
      skills: ['PyTorch', 'PINN Digital Twins', 'Sentence Transformers', 'XGBoost', 'LaBSE / MuRIL', 'Local RAG']
    },
    {
      idx: '03',
      title: 'Lakehouse & Data Systems',
      icon: <Database size={18} />,
      skills: ['DuckDB (Vectorized OLAP)', 'Delta Lake', 'Medallion Architecture', 'SCD Type 2', 'MySQL', 'MongoDB']
    },
    {
      idx: '04',
      title: 'Distributed Backends & Web',
      icon: <Terminal size={18} />,
      skills: ['FastAPI (Async)', 'Spring Boot', 'Django', 'React 19', 'Three.js / WebGL', 'Docker']
    },
    {
      idx: '05',
      title: 'GPU Acceleration & Simulation',
      icon: <Zap size={18} />,
      skills: ['CUDA C/C++', 'DirectML GPU', 'AMP / TF32', 'MATLAB / Simulink', 'OpenCV', 'Quantized Edge SLMs']
    },
    {
      idx: '06',
      title: 'Cloud, PaaS & Embedded IoT',
      icon: <Cloud size={18} />,
      skills: ['AWS (EC2, S3, DynamoDB)', 'ESP32 & MQTT Telemetry', 'GitHub / Netlify / Railway APIs', 'SonarQube', 'FSM / CDFG']
    }
  ];

  return (
    <section id="skills" className="scene-section skills-section">
      {/* Vivid Cedar Lantern Shrine Backdrop */}
      <SceneBackdrop
        image="/images/cinematic_shrine.png"
        position="center 40%"
        opacity={0.92}
        overlayDarkness={0.45}
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

        {/* Interactive 3x2 Lantern-Lit Frosted Bento Grid (Distinct from Text Lists!) */}
        <div className="skills-bento-grid">
          {skillCategories.map((cat, idx) => (
            <article
              key={cat.title}
              className={`skill-bento-card reveal-item reveal-delay-${(idx % 3) + 1}`}
            >
              <div className="bento-card-top">
                <div className="bento-icon-box">
                  {cat.icon}
                </div>
                <span className="bento-idx mono">0{idx + 1}</span>
              </div>

              <h3 className="bento-title">{cat.title}</h3>

              <div className="bento-pills-wrap mono">
                {cat.skills.map((skill) => (
                  <span key={skill} className="bento-skill-chip">
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

      </div>

      <style>{`
        .skills-section {
          background-color: var(--bg-primary);
        }

        .skills-bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1.5rem, 2.8vw, 2.25rem);
        }

        .skill-bento-card {
          background: rgba(10, 12, 18, 0.76);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(245, 239, 230, 0.14);
          border-radius: var(--radius-md);
          padding: clamp(1.75rem, 3vw, 2.25rem);
          display: flex;
          flex-direction: column;
          gap: 16px;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.55);
          transition: transform 260ms cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 260ms ease,
                      box-shadow 260ms ease;
        }

        .skill-bento-card:hover {
          transform: translateY(-5px);
          border-color: rgba(200, 50, 38, 0.6);
          box-shadow: 0 22px 48px rgba(0, 0, 0, 0.72), 0 0 28px rgba(200, 50, 38, 0.18);
        }

        .bento-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .bento-icon-box {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-sm);
          background: rgba(200, 50, 38, 0.16);
          border: 1px solid var(--border-accent);
          color: var(--accent-primary);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bento-idx {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 0.1em;
        }

        .bento-title {
          font-family: var(--font-heading);
          font-size: clamp(1.25rem, 1.6vw, 1.45rem);
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.25;
        }

        .bento-pills-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 2px;
        }

        .bento-skill-chip {
          font-size: 0.75rem;
          color: var(--text-secondary);
          padding: 5px 11px;
          background: rgba(245, 239, 230, 0.05);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          transition: all 160ms ease;
        }

        .skill-bento-card:hover .bento-skill-chip {
          color: var(--text-primary);
          border-color: rgba(245, 239, 230, 0.22);
        }

        @media (max-width: 960px) {
          .skills-bento-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .skills-bento-grid {
            grid-template-columns: 1fr;
            gap: 1.125rem;
          }

          .skill-bento-card {
            padding: 1.35rem 1.2rem;
            gap: 14px;
          }

          .bento-title {
            font-size: 1.22rem;
          }

          .bento-skill-chip {
            font-size: 0.6875rem;
            padding: 4px 10px;
          }
        }
      `}</style>
    </section>
  );
};

export default TechnicalMatrix;
