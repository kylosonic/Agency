import { useMemo, useState } from 'react';

const TIER_MODEL = [
  {
    id: 'tier1',
    threshold: 10,
    label: 'Tier 1: Foundational Automation (SMBs)',
    setupRange: 'from 250,000 ETB',
    monthlyRange: '30,000 - 70,000 ETB / month',
    setupMin: 250000,
    setupMax: 750000,
    monthlyMin: 30000,
    monthlyMax: 70000,
    baseSetup: 450000,
    baseMonthly: 50000,
  },
  {
    id: 'tier2',
    threshold: 18,
    label: 'Tier 2: Operational Intelligence (Mid-Market)',
    setupRange: 'from 750,000 ETB',
    monthlyRange: '30,000 - 70,000 ETB / month',
    setupMin: 750000,
    setupMax: 1500000,
    monthlyMin: 30000,
    monthlyMax: 70000,
    baseSetup: 1100000,
    baseMonthly: 50000,
  },
  {
    id: 'tier3',
    threshold: Number.POSITIVE_INFINITY,
    label: 'Tier 3: Enterprise Agentic Systems',
    setupRange: 'from 1,500,000+ ETB',
    monthlyRange: '30,000 - 70,000 ETB / month',
    setupMin: 1500000,
    setupMax: 4000000,
    monthlyMin: 30000,
    monthlyMax: 70000,
    baseSetup: 2500000,
    baseMonthly: 60000,
  },
];

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function formatEtb(value) {
  return `${Math.round(value).toLocaleString()} ETB`;
}

export default function PricingScenarioPlanner() {
  const [complexity, setComplexity] = useState(3);
  const [integrations, setIntegrations] = useState(6);
  const [compliance, setCompliance] = useState(2);
  const [teamSize, setTeamSize] = useState(30);

  const projection = useMemo(() => {
    const score =
      complexity * 2 +
      Math.ceil(integrations / 2) +
      compliance * 2 +
      (teamSize > 120 ? 4 : teamSize > 60 ? 3 : teamSize > 20 ? 2 : 1);

    const tier = TIER_MODEL.find((item) => score <= item.threshold) || TIER_MODEL[2];

    const rawEstimatedSetup =
      tier.baseSetup + complexity * 90000 + integrations * 45000 + compliance * 130000 + teamSize * 2500;

    const rawEstimatedMonthly =
      tier.baseMonthly + complexity * 6000 + integrations * 2500 + compliance * 8000 + teamSize * 60;

    const estimatedSetup = clamp(rawEstimatedSetup, tier.setupMin, tier.setupMax);
    const estimatedMonthly = clamp(rawEstimatedMonthly, tier.monthlyMin, tier.monthlyMax);

    return {
      score,
      tier,
      estimatedSetup,
      estimatedMonthly,
    };
  }, [complexity, integrations, compliance, teamSize]);

  return (
    <div className="pricing-scenario-planner glass-card" aria-label="pricing scenario planner">
      <div className="pricing-scenario-header">
        <h3>Scenario Planner</h3>
        <p>Adjust complexity signals to preview which engagement tier best matches your implementation profile. All projections are in ETB.</p>
      </div>

      <div className="pricing-scenario-controls">
        <label>
          <span>Workflow complexity</span>
          <strong>{complexity} / 5</strong>
          <input
            type="range"
            min="1"
            max="5"
            step="1"
            value={complexity}
            onChange={(event) => setComplexity(Number(event.target.value))}
          />
        </label>

        <label>
          <span>Integration endpoints</span>
          <strong>{integrations}</strong>
          <input
            type="range"
            min="0"
            max="24"
            step="1"
            value={integrations}
            onChange={(event) => setIntegrations(Number(event.target.value))}
          />
        </label>

        <label>
          <span>Compliance intensity</span>
          <strong>{compliance} / 5</strong>
          <input
            type="range"
            min="1"
            max="5"
            step="1"
            value={compliance}
            onChange={(event) => setCompliance(Number(event.target.value))}
          />
        </label>

        <label>
          <span>Internal user footprint</span>
          <strong>{teamSize} users</strong>
          <input
            type="range"
            min="5"
            max="250"
            step="5"
            value={teamSize}
            onChange={(event) => setTeamSize(Number(event.target.value))}
          />
        </label>
      </div>

      <div className="pricing-scenario-output">
        <p className="pricing-scenario-tier">Recommended: {projection.tier.label}</p>
        <div className="pricing-scenario-values">
          <article>
            <span>Tier setup anchor</span>
            <strong>{projection.tier.setupRange}</strong>
          </article>
          <article>
            <span>Monthly support band</span>
            <strong>{projection.tier.monthlyRange}</strong>
          </article>
          <article>
            <span>Projected setup</span>
            <strong>{formatEtb(projection.estimatedSetup)}</strong>
          </article>
          <article>
            <span>Projected monthly support</span>
            <strong>{formatEtb(projection.estimatedMonthly)}</strong>
          </article>
        </div>
      </div>
    </div>
  );
}
