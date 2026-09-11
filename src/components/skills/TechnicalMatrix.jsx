import React from 'react';
import { Code2, Cpu, Database, Cloud, Terminal, Zap } from 'lucide-react';
import { SceneBackdrop } from '../common/SceneBackdrop.jsx';

export const TechnicalMatrix = () => {
  const skillCategories = [
    {
      title: 'Core Languages & Systems',
      icon: <Code2 size={16} />,
      skills: ['Python', 'Modern C++', 'Java', 'JavaScript / TS', 'SQL', 'C'],
      note: 'Systems programming, algorithmic pipelines & multi-paradigm runtime architectures'
    },
    {
      title: 'AI, Neural ODEs & Scientific ML',
      icon: <Cpu size={16} />,
      skills: ['PyTorch', 'PINN Digital Twins', 'Scikit-Learn', 'Sentence Transformers', 'XGBoost', 'Neural ODEs'],
      note: 'Physics-informed neural networks (PINN), dynamical ODEs & psycholinguistic regression'
    },
    {
      title: 'Databases & Lakehouse Engineering',
      icon: <Database size={16} />,
      skills: ['DuckDB (OLAP)', 'Delta Lake', 'Medallion Architecture', 'SCD Type 2', 'MySQL', 'MongoDB'],
      note: 'Vectorized in-process OLAP, ACID lakehouse tables & auditable dimension tracking'
    },
    {
      title: 'Distributed Systems & Microservices',
      icon: <Terminal size={16} />,
      skills: ['FastAPI (Async)', 'Spring Boot', 'Django', 'React', 'REST APIs', 'Docker'],
      note: 'Asynchronous streaming backends, enterprise layered microservices & responsive UIs'
    },
    {
      title: 'GPU Acceleration & High Compute',
      icon: <Zap size={16} />,
      skills: ['CUDA C/C++', 'Tensor Cores', 'DirectML', 'AMP / TF32', 'SIMD Vectorization', 'DirectX'],
      note: 'Hardware acceleration, custom CUDA kernels, mixed-precision training & parallel reduction'
    },
    {
      title: 'Cloud Infrastructure & Telemetry',
      icon: <Cloud size={16} />,
      skills: ['AWS (EC2, S3, DynamoDB)', 'MQTT IoT Protocols', 'Git / GitHub', 'SonarQube CI/CD', 'Simulink'],
      note: 'Resilient cloud infrastructure, high-frequency device telemetry & automated code quality gates'
    }
  ];

  return (
    <section id="skills" className="scene-section skills-section">
      {/* Dedicated Cedar Lantern Shrine Backdrop */}
      <SceneBackdrop
        image="/images/cinematic_shrine.png"
        position="center 40%"
        opacity={0.84}
        overlayDarkness={0.8}
      />

      {/* Side Numbered Equation & Chapter Watermark */}
      <div className="section-backdrop-watermark" aria-hidden="true">
        <span className="wm-number mono">04</span>
        <div className="wm-equation mono">C = αAB + βC · CUDA TENSOR CORE GEMM</div>
      </div>

      <div className="container scene-content skills-content">
        
        {/* Editorial Scene Header */}
        <div className="scene-head-editorial">
          <div className="scene-head-top">
            <div className="scene-head-left">
              <span className="scene-eyebrow">04 // CORE COMPETENCIES &amp; RUNTIME MATRIX</span>
              <h2 className="scene-title-editorial">
                Technical Discipline &amp; Foundations
              </h2>
            </div>
            <p className="scene-head-right-subtext">
              HARDWARE ACCELERATION, SCIENTIFIC AI, AND LAKEHOUSE DATA INFRASTRUCTURE.
            </p>
          </div>
          <div className="scene-divider-rule" />
        </div>

        {/* 3x2 Matrix Grid (Editorial Open Pillars, No Generic Cards) */}
        <div className="skills-grid-editorial">
          {skillCategories.map((cat, idx) => (
            <div key={idx} className="skill-pillar-item">
              
              <div className="pillar-top-row">
                <span className="pillar-icon" aria-hidden="true">{cat.icon}</span>
                <h3 className="pillar-title">{cat.title}</h3>
              </div>

              <p className="pillar-note">{cat.note}</p>

              <div className="pillar-pills-wrap mono">
                {cat.skills.map((skill) => (
                  <span key={skill} className="skill-pill-item">
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
          background-color: #0A0B0E;
        }

        .skills-content {
          padding-top: clamp(1rem, 2.5vh, 2rem);
          padding-bottom: clamp(1rem, 2.5vh, 2rem);
        }

        .skills-grid-editorial {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1rem, 2.5vh, 1.75rem) clamp(1.25rem, 3vw, 2.5rem);
          margin-top: clamp(0.5rem, 1.5vh, 1.25rem);
        }

        .skill-pillar-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
          border-left: 1px solid rgba(255, 255, 255, 0.14);
          padding-left: clamp(12px, 1.5vw, 20px);
          transition: border-color 200ms ease;
        }

        .skill-pillar-item:hover {
          border-color: var(--accent-primary);
        }

        .pillar-top-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .pillar-icon {
          color: var(--accent-primary);
          display: flex;
          align-items: center;
        }

        .pillar-title {
          font-family: var(--font-body);
          font-size: clamp(0.9375rem, 1.2vw, 1.125rem);
          font-weight: 700;
          color: #FFFFFF;
          line-height: 1.2;
          letter-spacing: -0.01em;
        }

        .pillar-note {
          font-size: clamp(0.6875rem, 0.9vw, 0.78125rem);
          line-height: 1.45;
          color: #9CA3AF;
        }

        .pillar-pills-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-top: 4px;
        }

        .skill-pill-item {
          font-size: clamp(0.625rem, 0.8vw, 0.6875rem);
          color: #D1D5DB;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-sm);
          padding: 2px 7px;
          letter-spacing: 0.02em;
          transition: all 150ms ease;
        }

        .skill-pillar-item:hover .skill-pill-item {
          border-color: rgba(200, 50, 38, 0.4);
          color: #FFFFFF;
        }

        @media (max-width: 900px) {
          .skills-grid-editorial {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .skills-grid-editorial {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default TechnicalMatrix;
