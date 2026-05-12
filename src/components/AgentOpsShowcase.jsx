import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import IconGlyph from './IconGlyph';

const MotionDiv = motion.div;

const WORKFLOW_STEPS = [
  {
    id: 'collect',
    label: 'Collect',
    command: 'stagehand.collect("vendor_portal", "invoice_feed")',
    output: '923 records ingested and normalized to canonical schema.',
    impact: '-18h/week manual extraction',
    icon: 'globe',
    checks: ['Session auto-renewed', 'Captcha challenge bypassed', 'Retry policy: 3x'],
  },
  {
    id: 'index',
    label: 'Index',
    command: 'pipeline.embed(records, provider="local-qwen")',
    output: 'Semantic index refreshed with citation graph and confidence windows.',
    impact: '-11h/week document lookup',
    icon: 'chart',
    checks: ['Vector batches validated', 'Schema drift check passed', 'Audit checksum written'],
  },
  {
    id: 'act',
    label: 'Act',
    command: 'agents.execute("rfp_router", mode="autonomous")',
    output: 'RFP packets drafted, priced, and routed to review channels.',
    impact: '+23% proposal response speed',
    icon: 'rocket',
    checks: ['CRM synced', 'Slack approvals queued', 'Fallback path healthy'],
  },
  {
    id: 'report',
    label: 'Report',
    command: 'ops.report(window="24h", scope="finance+support")',
    output: 'Executive summary generated with sources and exception traces.',
    impact: '99.3% automation reliability',
    icon: 'shield',
    checks: ['Anomaly monitor green', 'Citations attached', 'Runbook linked'],
  },
];

export default function AgentOpsShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % WORKFLOW_STEPS.length);
    }, 3200);

    return () => window.clearInterval(intervalId);
  }, []);

  const activeStep = WORKFLOW_STEPS[activeIndex];

  const completion = useMemo(() => {
    return Math.round(((activeIndex + 1) / WORKFLOW_STEPS.length) * 100);
  }, [activeIndex]);

  return (
    <div className="ai-agent-showcase glass-strong" aria-live="polite">
      <div className="ai-agent-showcase-header">
        <div>
          <p className="ai-agent-kicker">Live Agent Workflow Replay</p>
          <h3>Observe how orchestration removes repetitive handoffs in real time.</h3>
        </div>
        <div className="ai-agent-status-pill">
          <span className="status-dot" aria-hidden="true"></span>
          Runtime healthy
        </div>
      </div>

      <div className="ai-agent-progress-track" aria-label="workflow progress">
        <span style={{ width: `${completion}%` }}></span>
      </div>

      <div className="ai-agent-showcase-grid">
        <div className="ai-agent-step-rail" role="tablist" aria-label="workflow steps">
          {WORKFLOW_STEPS.map((step, index) => (
            <button
              key={step.id}
              type="button"
              role="tab"
              id={`agent-step-tab-${step.id}`}
              aria-controls={`agent-step-panel-${step.id}`}
              aria-selected={index === activeIndex}
              className={`ai-agent-step-btn ${index === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
            >
              <span className="ai-agent-step-icon" aria-hidden="true">
                <IconGlyph name={step.icon} size={16} />
              </span>
              <span>
                <strong>{step.label}</strong>
                <small>{step.impact}</small>
              </span>
            </button>
          ))}
        </div>

        <div
          className="ai-agent-terminal"
          role="tabpanel"
          id={`agent-step-panel-${activeStep.id}`}
          aria-labelledby={`agent-step-tab-${activeStep.id}`}
        >
          <AnimatePresence mode="wait">
            <MotionDiv
              key={activeStep.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="ai-agent-terminal-command">$ {activeStep.command}</p>
              <p className="ai-agent-terminal-output">{activeStep.output}</p>
              <ul className="ai-agent-terminal-checks">
                {activeStep.checks.map((check) => (
                  <li key={check}>
                    <IconGlyph name="check" size={13} />
                    <span>{check}</span>
                  </li>
                ))}
              </ul>
            </MotionDiv>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
