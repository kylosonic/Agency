import { useMemo, useState } from 'react';

const TIER_MODEL = [
  {
    id: 'tier1',
    threshold: 10,
    label: 'Tier 1: Foundational Automation',
    setupRange: '$2,000 - $15,000',
    monthlyRange: '$200 - $1,000',
    baseSetup: 10000,
    baseMonthly: 700,
  },
  {
    id: 'tier2',
    threshold: 18,
    label: 'Tier 2: Operational Intelligence',
    setupRange: '$20,000 - $80,000',
    monthlyRange: '$2,000 - $8,000',
    baseSetup: 48000,
    baseMonthly: 4200,
  },
  {
    id: 'tier3',
    threshold: Number.POSITIVE_INFINITY,
    label: 'Tier 3: Enterprise & Air-Gapped',
    setupRange: '$100,000 - $300,000+',
    monthlyRange: '$10,000 - $25,000+',
    baseSetup: 160000,
    baseMonthly: 13500,
  },
];

function formatMoney(value) {
  return `$${Math.round(value).toLocaleString()}`;
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

    const estimatedSetup =
      tier.baseSetup + complexity * 1500 + integrations * 900 + compliance * 2200 + teamSize * 45;

    const estimatedMonthly =
      tier.baseMonthly + complexity * 220 + integrations * 130 + compliance * 360 + teamSize * 8;

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
            <span>Projected setup point</span>
            <strong>{formatMoney(projection.estimatedSetup)}</strong>
          </article>
          <article>
            <span>Projected monthly point</span>
            <strong>{formatMoney(projection.estimatedMonthly)}</strong>
          </article>
        </div>
      </div>
    </div>
  );
}
