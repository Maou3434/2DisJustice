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

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = -(y / (rect.height / 2)) * 4;
    const rotY = (x / (rect.width / 2)) * 4;
    e.currentTarget.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.015, 1.015, 1.015)`;
  };

  const handleCardMouseLeave = (e) => {
    e.currentTarget.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    e.currentTarget.style.transition = 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1), border-color 200ms ease';
  };

  const handleCardMouseEnter = (e) => {
    e.currentTarget.style.transition = 'transform 60ms ease-out, border-color 200ms ease';
  };

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-head">
          <div className="section-tag">
            <span className="mono">{isTsushima ? '// 術 — CORE COMPETENCIES' : '// TECHNICAL_MATRIX.SPEC'}</span>
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
              onMouseMove={handleCardMouseMove}
              onMouseEnter={handleCardMouseEnter}
              onMouseLeave={handleCardMouseLeave}
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
          transform-style: preserve-3d;
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
        }

        .skill-category-card:hover {
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
