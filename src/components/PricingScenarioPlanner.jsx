import { useMemo, useState } from 'react';

const LOCAL_PRICING_MULTIPLIER = 60;

const TIER_MODEL = [
  {
    id: 'tier1',
    threshold: 10,
    label: 'Tier 1: Foundational Automation (SMBs)',
    setupRange: '$2,000 - $15,000',
    monthlyRange: '$200 - $1,000',
    localSetupRange: '120,000 - 900,000 ETB',
    localMonthlyRange: '12,000 - 60,000 ETB',
    setupMin: 2000,
    setupMax: 15000,
    monthlyMin: 200,
    monthlyMax: 1000,
    baseSetup: 9000,
    baseMonthly: 430,
  },
  {
    id: 'tier2',
    threshold: 18,
    label: 'Tier 2: Operational Intelligence (Mid-Market)',
    setupRange: '$20,000 - $80,000',
    monthlyRange: '$2,000 - $8,000',
    localSetupRange: '1,200,000 - 4,800,000 ETB',
    localMonthlyRange: '120,000 - 480,000 ETB',
    setupMin: 20000,
    setupMax: 80000,
    monthlyMin: 2000,
    monthlyMax: 8000,
    baseSetup: 50000,
    baseMonthly: 4300,
  },
  {
    id: 'tier3',
    threshold: Number.POSITIVE_INFINITY,
    label: 'Tier 3: Enterprise Agentic Systems',
    setupRange: '$100,000 - $300,000+',
    monthlyRange: '$10,000 - $25,000+',
    localSetupRange: '6,000,000+ ETB',
    localMonthlyRange: '600,000+ ETB',
    setupMin: 100000,
    setupMax: 300000,
    monthlyMin: 10000,
    monthlyMax: 25000,
    baseSetup: 170000,
    baseMonthly: 14000,
  },
];

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function formatUsd(value) {
  return `$${Math.round(value).toLocaleString()}`;
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
      tier.baseSetup + complexity * 1500 + integrations * 900 + compliance * 2200 + teamSize * 45;

    const rawEstimatedMonthly =
      tier.baseMonthly + complexity * 220 + integrations * 130 + compliance * 360 + teamSize * 8;

    const estimatedSetup = clamp(rawEstimatedSetup, tier.setupMin, tier.setupMax);
    const estimatedMonthly = clamp(rawEstimatedMonthly, tier.monthlyMin, tier.monthlyMax);

    return {
      score,
      tier,
      estimatedSetup,
      estimatedMonthly,
      estimatedLocalSetup: estimatedSetup * LOCAL_PRICING_MULTIPLIER,
      estimatedLocalMonthly: estimatedMonthly * LOCAL_PRICING_MULTIPLIER,
    };
  }, [complexity, integrations, compliance, teamSize]);

  return (
    <div className="pricing-scenario-planner glass-card" aria-label="pricing scenario planner">
      <div className="pricing-scenario-header">
        <h3>Scenario Planner</h3>
        <p>Adjust complexity signals to preview which engagement tier best matches your implementation profile.</p>
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
            <span>Tier setup range</span>
            <strong>{projection.tier.setupRange}</strong>
          </article>
          <article>
            <span>Tier monthly range</span>
            <strong>{projection.tier.monthlyRange}</strong>
          </article>
          <article>
            <span>Local setup range</span>
            <strong>{projection.tier.localSetupRange}</strong>
          </article>
          <article>
            <span>Local monthly range</span>
            <strong>{projection.tier.localMonthlyRange}</strong>
          </article>
          <article>
            <span>Projected global setup</span>
            <strong>{formatUsd(projection.estimatedSetup)}</strong>
          </article>
          <article>
            <span>Projected global monthly</span>
            <strong>{formatUsd(projection.estimatedMonthly)}</strong>
          </article>
          <article>
            <span>Projected local setup</span>
            <strong>{formatEtb(projection.estimatedLocalSetup)}</strong>
          </article>
          <article>
            <span>Projected local monthly</span>
            <strong>{formatEtb(projection.estimatedLocalMonthly)}</strong>
          </article>
        </div>
      </div>
    </div>
  );
}
