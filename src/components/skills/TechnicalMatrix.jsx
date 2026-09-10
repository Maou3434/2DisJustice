import React from 'react';
import resumeData from '../../../data/resume_data.json';
import { Code2, Cpu, Database, Cloud, Terminal, Zap } from 'lucide-react';

export const TechnicalMatrix = () => {
  const skillCategories = [
    {
      title: 'Core Languages & Systems',
      icon: <Code2 size={18} />,
      skills: ['Python', 'Modern C++', 'Java', 'JavaScript / TS', 'SQL', 'C'],
      note: 'Systems programming, algorithmic pipelines & multi-paradigm runtime architectures'
    },
    {
      title: 'AI, Neural ODEs & Scientific ML',
      icon: <Cpu size={18} />,
      skills: ['PyTorch', 'PINN Digital Twins', 'Scikit-Learn', 'Sentence Transformers', 'XGBoost', 'Neural ODEs'],
      note: 'Physics-informed neural networks (PINN), dynamical ODEs & psycholinguistic regression'
    },
    {
      title: 'Databases & Lakehouse Engineering',
      icon: <Database size={18} />,
      skills: ['DuckDB (OLAP)', 'Delta Lake', 'Medallion Architecture', 'SCD Type 2', 'MySQL', 'MongoDB'],
      note: 'Vectorized in-process OLAP, ACID lakehouse tables & auditable dimension tracking'
    },
    {
      title: 'Distributed Systems & Microservices',
      icon: <Terminal size={18} />,
      skills: ['FastAPI (Async)', 'Spring Boot', 'Django', 'React', 'REST APIs', 'Docker'],
      note: 'Asynchronous streaming backends, enterprise layered microservices & responsive UIs'
    },
    {
      title: 'GPU Acceleration & High Compute',
      icon: <Zap size={18} />,
      skills: ['CUDA C/C++', 'Tensor Cores', 'DirectML', 'AMP / TF32', 'SIMD Vectorization', 'DirectX'],
      note: 'Hardware acceleration, custom CUDA kernels, mixed-precision training & parallel reduction'
    },
    {
      title: 'Cloud Infrastructure & Telemetry',
      icon: <Cloud size={18} />,
      skills: ['AWS (EC2, S3, DynamoDB)', 'MQTT IoT Protocols', 'Git / GitHub', 'SonarQube CI/CD', 'Simulink', 'Agile / Scrum'],
      note: 'Resilient cloud infrastructure, high-frequency device telemetry & automated code quality gates'
    }
  ];

  return (
    <section id="skills" className="skills-section">
      {/* Ambient Section Watermark: Pushed far right at 6% opacity with fade mask */}
      <div className="section-backdrop-watermark" aria-hidden="true">
        <div className="watermark-kanji-wrap">
          <span className="wm-kanji">技術</span>
          <span className="wm-num mono">05</span>
        </div>
        <div className="wm-equation mono">
          C = αAB + βC · CUDA TENSOR CORE GEMM
        </div>
      </div>

      <div className="container">
        
        {/* Section Header */}
        <div className="section-head">
          <div className="section-tag">
            <span className="mono">// CORE COMPETENCIES · SYSTEMS &amp; ACCELERATION</span>
          </div>
          <h2 className="section-title">
            Technical Discipline &amp; Foundations
          </h2>
          <p className="section-subtitle">
            Systematic capabilities developed across academic research, open-source infrastructure, and industry internships.
          </p>
        </div>

        {/* Matrix Grid: Perfectly Balanced 3x2 Symmetrical Array */}
        <div className="skills-grid">
          {skillCategories.map((category, idx) => (
            <div
              key={idx}
              className="skill-category-card"
            >
              <div className="category-top">
                <div className="category-icon-title">
                  <span className="category-icon">{category.icon}</span>
                  <h3 className="category-name">{category.title}</h3>
                </div>
              </div>

              <p className="category-note">{category.note}</p>

              <div className="skills-pill-wrap">
                {category.skills.map((skill) => (
                  <span key={skill} className="skill-pill mono">
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
          position: relative;
          padding: var(--space-16) 0;
          z-index: var(--z-content);
          border-top: 1px solid var(--border-subtle);
          overflow: hidden;
        }

        .section-backdrop-watermark {
          position: absolute;
          top: 16px;
          right: 24px;
          pointer-events: none;
          opacity: 0.06;
          z-index: 0;
          user-select: none;
          text-align: right;
          mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 70%, transparent 100%);
        }

        .watermark-kanji-wrap {
          display: flex;
          align-items: baseline;
          justify-content: flex-end;
          gap: 16px;
        }

        .wm-kanji {
          font-family: var(--font-display);
          font-size: clamp(4.5rem, 9vw, 8.5rem);
          font-weight: 900;
          color: var(--text-muted);
          line-height: 0.85;
          letter-spacing: -0.02em;
        }

        .wm-num {
          font-size: clamp(3rem, 6vw, 5.5rem);
          font-weight: 800;
          color: var(--accent-primary);
          opacity: 0.85;
          line-height: 0.85;
        }

        .wm-equation {
          font-size: 0.75rem;
          letter-spacing: 0.18em;
          color: var(--text-secondary);
          margin-top: 8px;
        }

        .section-head {
          margin-bottom: var(--space-12);
        }

        .section-tag {
          font-size: 0.75rem;
          color: var(--accent-primary);
          margin-bottom: var(--space-2);
          letter-spacing: 0.05em;
        }

        .section-title {
          font-size: clamp(1.875rem, 3.5vw, 2.75rem);
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: var(--space-3);
        }

        .section-subtitle {
          font-size: 1.0625rem;
          color: var(--text-secondary);
          max-width: 650px;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-6);
        }

        @media (max-width: 1100px) {
          .skills-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 680px) {
          .skills-grid {
            grid-template-columns: 1fr;
          }
        }

        .skill-category-card {
          padding: var(--space-6);
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
          transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 200ms ease,
                      box-shadow 200ms ease;
        }

        .skill-category-card:hover {
          transform: translateY(-3px);
          border-color: var(--accent-primary);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.45), 0 0 20px rgba(200, 50, 38, 0.14);
        }

        .category-icon-title {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .category-icon {
          color: var(--accent-primary);
          display: flex;
          align-items: center;
        }

        .category-name {
          font-size: 1.0625rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: 0.01em;
        }

        .category-note {
          font-size: 0.8125rem;
          color: var(--text-muted);
          line-height: 1.5;
          min-height: 38px;
        }

        .skills-pill-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: auto;
          padding-top: var(--space-2);
        }

        .skill-pill {
          font-size: 0.75rem;
          padding: 4px 10px;
          background: rgba(24, 28, 38, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #D6CFBE;
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
          letter-spacing: 0.02em;
        }

        .skill-category-card:hover .skill-pill {
          border-color: rgba(255, 255, 255, 0.22);
          color: #FFF;
        }

        .skill-pill:hover {
          background: var(--accent-subtle);
          border-color: var(--accent-primary);
          color: #FFF;
          box-shadow: 0 0 10px rgba(200, 50, 38, 0.25);
        }
      `}</style>
    </section>
  );
};
