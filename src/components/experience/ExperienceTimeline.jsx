import React, { useState } from 'react';
import resumeData from '../../../data/resume_data.json';
import { SceneBackdrop } from '../common/SceneBackdrop.jsx';
import { Activity, Cpu, ChevronDown, ChevronUp } from 'lucide-react';

const DRIVE_CYCLES = {
  WLTP2: {
    label: 'WLTP2 (Unseen Autoregressive Rollout)',
    maeReduction: '-31.2%',
    maxErrReduction: '-65.6%',
    pinnMae: '0.42 °C',
    mlpMae: '0.61 °C',
    pinnMaxErr: '1.18 °C',
    mlpMaxErr: '3.43 °C',
    points: [
      { t: '0s', gt: 25.0, pinn: 25.0, mlp: 25.0, current: '0A' },
      { t: '300s', gt: 28.4, pinn: 28.6, mlp: 29.8, current: '84A' },
      { t: '600s', gt: 33.2, pinn: 33.5, mlp: 36.1, current: '142A' },
      { t: '900s', gt: 37.8, pinn: 37.5, mlp: 41.2, current: '165A' },
      { t: '1200s', gt: 41.5, pinn: 41.8, mlp: 44.9, current: '190A' },
      { t: '1500s', gt: 44.2, pinn: 44.0, mlp: 47.6, current: '210A' },
      { t: '1800s', gt: 42.6, pinn: 42.9, mlp: 45.8, current: '60A' }
    ]
  },
  US06: {
    label: 'US06 (Aggressive Highway High-Discharge)',
    maeReduction: '-34.8%',
    maxErrReduction: '-68.1%',
    pinnMae: '0.49 °C',
    mlpMae: '0.75 °C',
    pinnMaxErr: '1.31 °C',
    mlpMaxErr: '4.11 °C',
    points: [
      { t: '0s', gt: 25.0, pinn: 25.0, mlp: 25.0, current: '0A' },
      { t: '100s', gt: 31.2, pinn: 31.5, mlp: 33.4, current: '220A' },
      { t: '200s', gt: 38.6, pinn: 38.9, mlp: 42.3, current: '265A' },
      { t: '300s', gt: 45.1, pinn: 44.8, mlp: 49.2, current: '240A' },
      { t: '400s', gt: 49.8, pinn: 50.2, mlp: 54.0, current: '280A' },
      { t: '500s', gt: 52.4, pinn: 52.1, mlp: 56.5, current: '195A' },
      { t: '600s', gt: 50.1, pinn: 50.4, mlp: 53.9, current: '75A' }
    ]
  },
  UDDS: {
    label: 'UDDS (Urban Transient Stop-and-Go)',
    maeReduction: '-28.9%',
    maxErrReduction: '-61.4%',
    pinnMae: '0.35 °C',
    mlpMae: '0.49 °C',
    pinnMaxErr: '0.94 °C',
    mlpMaxErr: '2.44 °C',
    points: [
      { t: '0s', gt: 25.0, pinn: 25.0, mlp: 25.0, current: '0A' },
      { t: '250s', gt: 27.1, pinn: 27.2, mlp: 28.1, current: '65A' },
      { t: '500s', gt: 30.8, pinn: 30.6, mlp: 32.5, current: '115A' },
      { t: '750s', gt: 29.4, pinn: 29.6, mlp: 31.8, current: '20A' },
      { t: '1000s', gt: 33.5, pinn: 33.7, mlp: 35.9, current: '130A' },
      { t: '1200s', gt: 35.2, pinn: 35.0, mlp: 37.6, current: '95A' },
      { t: '1400s', gt: 34.1, pinn: 34.3, mlp: 36.4, current: '35A' }
    ]
  }
};

export const ExperienceTimeline = () => {
  const [showSandbox, setShowSandbox] = useState(false);
  const [activeCycle, setActiveCycle] = useState('WLTP2');
  const [hoveredIdx, setHoveredIdx] = useState(4);

  const cycleData = DRIVE_CYCLES[activeCycle];
  const activePoint = cycleData.points[hoveredIdx] || cycleData.points[4];

  const toY = (temp) => {
    const minT = 24;
    const maxT = 58;
    const norm = Math.max(0, Math.min(1, (temp - minT) / (maxT - minT)));
    return (132 - norm * 112).toFixed(1);
  };

  const toX = (idx) => (36 + idx * 82).toFixed(1);

  const buildPath = (key) =>
    cycleData.points
      .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY(pt[key])}`)
      .join(' ');

  return (
    <section id="experience" className="scene-section experience-section">
      {/* Dedicated Coastal Bluffs Backdrop */}
      <SceneBackdrop
        image="/images/cinematic_sea.png"
        position="center 40%"
        opacity={0.78}
        overlayDarkness={0.84}
      />

      {/* Restrained Chapter Number Watermark */}
      <div className="section-backdrop-watermark" aria-hidden="true">
        <span className="wm-number">02</span>
      </div>

      <div className="container scene-content experience-content">
        
        {/* Clean Editorial Header */}
        <div className="scene-head-editorial">
          <div className="scene-head-top">
            <div className="scene-head-left">
              <span className="scene-eyebrow">02 // TENURE</span>
              <h2 className="scene-title-editorial">Experience</h2>
            </div>
          </div>
          <div className="scene-divider-rule" />
        </div>

        {/* Guided 2-Column Editorial Spine (Left: Date & Index -> Right: Spacious Narrative) */}
        <div className="experience-ledger">
          {resumeData.professional_experience.map((exp, idx) => {
            const isRecent = idx === 0;

            return (
              <article
                key={exp.id || idx}
                className={`experience-row reveal-item reveal-delay-${idx + 1}`}
              >
                {/* Left Anchor Column: Index, Date, Location */}
                <div className="exp-left-anchor mono">
                  <span className="exp-index">0{idx + 1}</span>
                  <div className="exp-meta-stack">
                    <span className="exp-period">{exp.period}</span>
                    <span className="exp-location">{exp.location}</span>
                  </div>
                </div>

                {/* Right Reading Column: Role, Organization, Narrative & Action */}
                <div className="exp-right-body">
                  <div className="exp-title-group">
                    <h3 className="exp-role-title">{exp.role}</h3>
                    <span className="exp-company mono">{exp.organization}</span>
                  </div>

                  <p className="exp-description">
                    {exp.highlights[0]}
                  </p>

                  {/* Breathable Metric & Tech Footer */}
                  <div className="exp-footer-bar mono">
                    <div className="exp-tags-list">
                      {exp.tags.slice(0, 5).map((tag) => (
                        <span key={tag} className="exp-tag-pill">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {isRecent && (
                      <button
                        onClick={() => setShowSandbox((prev) => !prev)}
                        className="sandbox-toggle-btn mono"
                        aria-expanded={showSandbox}
                      >
                        <Activity size={14} />
                        <span>{showSandbox ? 'HIDE TELEMETRY' : 'INSPECT PINN TELEMETRY'}</span>
                        {showSandbox ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                    )}
                  </div>

                  {/* On-Demand Interactive PINN Digital Twin Telemetry Sandbox */}
                  {isRecent && showSandbox && (
                    <div className="pinn-telemetry-sandbox">
                      <div className="sandbox-top-bar mono">
                        <div className="sandbox-title-group">
                          <Activity size={14} className="sandbox-icon" />
                          <span>PINN THERMAL DIGITAL TWIN // AUTOREGRESSIVE ROLLOUT</span>
                        </div>
                        <div className="sandbox-cycle-tabs" role="tablist" aria-label="Select EV Drive Cycle">
                          {Object.keys(DRIVE_CYCLES).map((cKey) => (
                            <button
                              key={cKey}
                              role="tab"
                              aria-selected={activeCycle === cKey}
                              onClick={() => setActiveCycle(cKey)}
                              className={`cycle-tab-btn mono ${activeCycle === cKey ? 'is-active' : ''}`}
                            >
                              {cKey}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="sandbox-body-grid">
                        <div className="sandbox-chart-wrap">
                          <div className="chart-legend-row mono">
                            <span className="legend-item">
                              <span className="legend-swatch swatch-gt" /> Simulink Ground Truth
                            </span>
                            <span className="legend-item">
                              <span className="legend-swatch swatch-pinn" /> PINN (ODE-Regularized)
                            </span>
                            <span className="legend-item">
                              <span className="legend-swatch swatch-mlp" /> Pure Data MLP
                            </span>
                          </div>

                          <svg
                            viewBox="0 0 565 155"
                            className="pinn-rollout-svg"
                            role="img"
                            aria-label={`EV Battery temperature trajectory comparison for ${cycleData.label}`}
                          >
                            {[25, 35, 45, 55].map((tempVal) => {
                              const yPos = toY(tempVal);
                              return (
                                <g key={tempVal}>
                                  <line
                                    x1="30"
                                    y1={yPos}
                                    x2="540"
                                    y2={yPos}
                                    stroke="rgba(245, 239, 230, 0.08)"
                                    strokeDasharray="3,3"
                                  />
                                  <text
                                    x="24"
                                    y={Number(yPos) + 3}
                                    fill="var(--text-muted)"
                                    fontSize="8"
                                    fontFamily="var(--font-mono)"
                                    textAnchor="end"
                                  >
                                    {tempVal}°
                                  </text>
                                </g>
                              );
                            })}

                            <path
                              d={buildPath('mlp')}
                              fill="none"
                              stroke="var(--text-muted)"
                              strokeWidth="1.6"
                              strokeDasharray="4,3"
                            />
                            <path
                              d={buildPath('gt')}
                              fill="none"
                              stroke="var(--text-primary)"
                              strokeWidth="2"
                              opacity="0.9"
                            />
                            <path
                              d={buildPath('pinn')}
                              fill="none"
                              stroke="var(--accent-primary)"
                              strokeWidth="2.4"
                            />

                            {cycleData.points.map((pt, pIdx) => {
                              const x = Number(toX(pIdx));
                              const isSelected = hoveredIdx === pIdx;
                              return (
                                <g
                                  key={pt.t}
                                  onMouseEnter={() => setHoveredIdx(pIdx)}
                                  onClick={() => setHoveredIdx(pIdx)}
                                  style={{ cursor: 'pointer' }}
                                >
                                  <rect
                                    x={x - 36}
                                    y="10"
                                    width="72"
                                    height="135"
                                    fill="transparent"
                                  />
                                  {isSelected && (
                                    <line
                                      x1={x}
                                      y1="14"
                                      x2={x}
                                      y2="136"
                                      stroke="var(--accent-primary)"
                                      strokeWidth="1"
                                      strokeOpacity="0.6"
                                    />
                                  )}
                                  <circle cx={x} cy={toY(pt.mlp)} r={isSelected ? 3.5 : 2} fill="var(--text-muted)" />
                                  <circle cx={x} cy={toY(pt.gt)} r={isSelected ? 4 : 2.5} fill="var(--text-primary)" />
                                  <circle cx={x} cy={toY(pt.pinn)} r={isSelected ? 5 : 3} fill="var(--accent-primary)" />
                                  <text
                                    x={x}
                                    y="148"
                                    fill={isSelected ? 'var(--text-primary)' : 'var(--text-muted)'}
                                    fontSize="8.5"
                                    fontFamily="var(--font-mono)"
                                    fontWeight={isSelected ? '700' : '400'}
                                    textAnchor="middle"
                                  >
                                    {pt.t}
                                  </text>
                                </g>
                              );
                            })}
                          </svg>
                        </div>

                        <div className="sandbox-telemetry-panel mono">
                          <div className="telemetry-header">
                            <Cpu size={13} />
                            <span>PROBE @ t = {activePoint.t} ({activePoint.current})</span>
                          </div>

                          <div className="telemetry-readout-grid">
                            <div className="readout-box">
                              <span className="readout-lbl">SIMULINK GT</span>
                              <strong className="readout-val">{activePoint.gt.toFixed(1)} °C</strong>
                            </div>
                            <div className="readout-box box-highlight">
                              <span className="readout-lbl">PINN TWIN</span>
                              <strong className="readout-val val-cinnabar">{activePoint.pinn.toFixed(1)} °C</strong>
                            </div>
                            <div className="readout-box">
                              <span className="readout-lbl">MLP BASELINE</span>
                              <strong className="readout-val val-muted">{activePoint.mlp.toFixed(1)} °C</strong>
                            </div>
                          </div>

                          <div className="telemetry-summary-bar">
                            <div className="summary-stat">
                              <span>MAE REDUCTION</span>
                              <strong>{cycleData.maeReduction} ({cycleData.mlpMae} → {cycleData.pinnMae})</strong>
                            </div>
                            <div className="summary-stat">
                              <span>MAX EXCURSION ERR</span>
                              <strong>{cycleData.maxErrReduction} ({cycleData.mlpMaxErr} → {cycleData.pinnMaxErr})</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </article>
            );
          })}
        </div>

      </div>

      <style>{`
        .experience-section {
          background-color: var(--bg-primary);
        }

        .experience-ledger {
          display: flex;
          flex-direction: column;
        }

        .experience-row {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: clamp(2rem, 5vw, 4.5rem);
          padding: clamp(2.75rem, 5.5vh, 4.25rem) 0;
          border-bottom: 1px solid var(--border-subtle);
          align-items: start;
        }

        .experience-row:first-child {
          padding-top: 0.5rem;
        }

        .exp-left-anchor {
          display: flex;
          align-items: baseline;
          gap: 18px;
          padding-top: 6px;
        }

        .exp-index {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--accent-primary);
          letter-spacing: 0.1em;
        }

        .exp-meta-stack {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .exp-period {
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: 0.06em;
        }

        .exp-location {
          font-size: 0.75rem;
          color: var(--text-muted);
          letter-spacing: 0.04em;
        }

        .exp-right-body {
          display: flex;
          flex-direction: column;
          gap: 18px;
          max-width: 780px;
        }

        .exp-title-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .exp-role-title {
          font-family: var(--font-heading);
          font-size: clamp(1.65rem, 2.4vw, 2.15rem);
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.015em;
          line-height: 1.2;
        }

        .exp-company {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--accent-primary);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .exp-description {
          font-family: var(--font-body);
          font-size: clamp(1.05rem, 1.15vw, 1.125rem);
          line-height: 1.82;
          color: var(--text-secondary);
          max-width: 65ch;
        }

        .exp-footer-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          margin-top: 4px;
        }

        .exp-tags-list {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .exp-tag-pill {
          font-size: 0.75rem;
          color: var(--text-secondary);
          padding: 4px 12px;
          background: rgba(245, 239, 230, 0.04);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          letter-spacing: 0.03em;
        }

        .sandbox-toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 14px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--text-primary);
          background: rgba(200, 50, 38, 0.14);
          border: 1px solid var(--border-accent);
          border-radius: var(--radius-sm);
          transition: all 180ms ease;
        }

        .sandbox-toggle-btn:hover {
          background: rgba(200, 50, 38, 0.28);
          border-color: var(--accent-primary);
        }

        /* Interactive PINN Telemetry Sandbox */
        .pinn-telemetry-sandbox {
          margin-top: 12px;
          background: rgba(12, 14, 20, 0.92);
          border: 1px solid var(--border-prominent);
          border-left: 2px solid var(--accent-primary);
          border-radius: var(--radius-sm);
          overflow: hidden;
          animation: fadeSlideDown 260ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .sandbox-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          padding: 10px 16px;
          background: rgba(18, 21, 30, 0.95);
          border-bottom: 1px solid var(--border-subtle);
          font-size: 0.75rem;
        }

        .sandbox-title-group {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-primary);
          font-weight: 700;
          letter-spacing: 0.06em;
        }

        .sandbox-icon {
          color: var(--accent-primary);
        }

        .sandbox-cycle-tabs {
          display: flex;
          gap: 6px;
        }

        .cycle-tab-btn {
          padding: 4px 12px;
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--text-secondary);
          background: rgba(245, 239, 230, 0.04);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          transition: all 150ms ease;
        }

        .cycle-tab-btn.is-active {
          color: var(--text-primary);
          background: var(--accent-subtle);
          border-color: var(--accent-primary);
        }

        .sandbox-body-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 18px;
          padding: 18px;
          align-items: center;
        }

        .sandbox-chart-wrap {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .chart-legend-row {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          font-size: 0.6875rem;
          color: var(--text-secondary);
        }

        .legend-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .legend-swatch {
          width: 12px;
          height: 2px;
          display: inline-block;
        }

        .swatch-gt { background: var(--text-primary); }
        .swatch-pinn { background: var(--accent-primary); height: 3px; }
        .swatch-mlp { background: var(--text-muted); }

        .pinn-rollout-svg {
          width: 100%;
          height: auto;
          max-height: 165px;
          background: rgba(8, 9, 13, 0.75);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
        }

        .sandbox-telemetry-panel {
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: rgba(8, 9, 13, 0.78);
          border: 1px solid var(--border-subtle);
          padding: 14px;
          border-radius: var(--radius-sm);
        }

        .telemetry-header {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.6875rem;
          font-weight: 700;
          color: var(--accent-primary);
          letter-spacing: 0.06em;
        }

        .telemetry-readout-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        .readout-box {
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 8px;
          background: rgba(18, 20, 28, 0.9);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
        }

        .readout-box.box-highlight {
          border-color: var(--border-accent);
          background: var(--accent-subtle);
        }

        .readout-lbl {
          font-size: 0.5625rem;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }

        .readout-val {
          font-size: 0.875rem;
          color: var(--text-primary);
        }

        .val-cinnabar { color: var(--accent-primary); }
        .val-muted { color: var(--text-secondary); }

        .telemetry-summary-bar {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding-top: 8px;
          border-top: 1px solid var(--border-subtle);
          font-size: 0.6875rem;
        }

        .summary-stat {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: var(--text-secondary);
        }

        .summary-stat strong {
          color: var(--text-primary);
        }

        @media (max-width: 900px) {
          .experience-row {
            grid-template-columns: 1fr;
            gap: 14px;
          }
          .sandbox-body-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default ExperienceTimeline;
