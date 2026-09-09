import React from 'react';
import resumeData from '../../../data/resume_data.json';
import { Code2, Cpu, Database, Cloud, Terminal, Wrench } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.jsx';

export const TechnicalMatrix = () => {
  const { theme } = useTheme();
  const isTsushima = theme === 'tsushima';

  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: <Code2 size={18} />,
      skills: resumeData.technical_skills.languages,
      note: 'Systems programming, high-performance computing & algorithmic pipelines'
    },
    {
      title: 'AI, ML & Scientific Computing',
      icon: <Cpu size={18} />,
      skills: resumeData.technical_skills.ai_ml,
      note: 'Physics-informed modeling (PINN), neural ODEs & NLP attachment metrics'
    },
    {
      title: 'Databases & Lakehouse Engineering',
      icon: <Database size={18} />,
      skills: resumeData.technical_skills.databases_data_engineering,
      note: 'Vectorized OLAP (DuckDB), ACID lakehouses (Delta Lake) & Medallion layers'
    },
    {
      title: 'Frameworks & Full-Stack Systems',
      icon: <Terminal size={18} />,
      skills: resumeData.technical_skills.frameworks_development,
      note: 'Enterprise microservices (Spring Boot), asynchronous APIs (FastAPI) & React'
    },
    {
      title: 'Cloud, Acceleration & Tooling',
      icon: <Cloud size={18} />,
      skills: resumeData.technical_skills.cloud_tools,
      note: 'GPU acceleration (CUDA C/C++, DirectML, AMP/TF32) & AWS EC2/S3/DynamoDB'
    }
  ];

  return (
    <section id="skills" className="skills-section">
      {/* Localized Section Watermark (Guaranteed Zero Global Drift) */}
      <div className="section-backdrop-watermark" aria-hidden="true">
        <div className="watermark-kanji-wrap">
          <span className="wm-kanji">{isTsushima ? '技術' : 'SKILLS'}</span>
          <span className="wm-num mono">05</span>
        </div>
        <div className="wm-equation mono">
          {isTsushima ? 'C = αAB + βC · CUDA TENSOR CORE GEMM' : 'SYS.COMPUTE // CUDA_TENSOR_CORE_GEMM'}
        </div>
      </div>

      <div className="container">
        
        {/* Section Header */}
        <div className="section-head">
          <div className="section-tag">
            <span className="mono">{isTsushima ? '// CORE COMPETENCIES · SYSTEMS & ACCELERATION' : '// TECHNICAL_MATRIX.SPEC // COMPUTE_DATA'}</span>
          </div>
          <h2 className="section-title">
            {isTsushima ? 'Technical Discipline & Foundations' : 'Technical Competency Matrix'}
          </h2>
          <p className="section-subtitle">
            Systematic capabilities developed across academic research, open-source infrastructure, and industry internships.
          </p>
        </div>

        {/* Matrix Grid */}
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
          top: 5%;
          right: 3%;
          pointer-events: none;
          opacity: 0.12;
          z-index: 0;
          user-select: none;
          text-align: right;
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
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: var(--space-6);
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
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(200, 50, 38, 0.12);
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
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .category-note {
          font-size: 0.8125rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        .skills-pill-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: auto;
        }

        .skill-pill {
          font-size: 0.75rem;
          padding: 4px 10px;
          background: var(--bg-primary);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          border-radius: var(--radius-sm);
          transition: border-color var(--transition-fast), color var(--transition-fast);
        }

        .skill-category-card:hover .skill-pill {
          border-color: var(--border-prominent);
          color: var(--text-primary);
        }
      `}</style>
    </section>
  );
};
