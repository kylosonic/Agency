import { useMemo, useState } from 'react';

function formatCurrency(value) {
  return `$${Math.round(value).toLocaleString()}`;
}

export default function AutomationImpactCalculator() {
  const [hoursPerWeek, setHoursPerWeek] = useState(42);
  const [hourlyCost, setHourlyCost] = useState(34);
  const [reworkCost, setReworkCost] = useState(4800);
  const [implementationCost, setImplementationCost] = useState(42000);

  const metrics = useMemo(() => {
    const monthlyLaborSavings = hoursPerWeek * 4.33 * hourlyCost;
    const monthlySavings = monthlyLaborSavings + reworkCost;
    const annualSavings = monthlySavings * 12;
    const paybackMonths = implementationCost / Math.max(monthlySavings, 1);
    const netYearOne = annualSavings - implementationCost;
    const roi = (netYearOne / Math.max(implementationCost, 1)) * 100;

    return {
      monthlySavings,
      annualSavings,
      paybackMonths,
      netYearOne,
      roi,
    };
  }, [hourlyCost, hoursPerWeek, implementationCost, reworkCost]);

  return (
    <div className="ai-impact-calculator glass-card" aria-label="automation impact calculator">
      <div className="ai-impact-calculator-header">
        <h3>Automation Impact Calculator</h3>
        <p>Model recoverable capacity and payback period from your current manual workload.</p>
      </div>

      <div className="ai-impact-calculator-grid">
        <label className="ai-impact-control">
          <span>Manual hours/week to eliminate</span>
          <strong>{hoursPerWeek} hrs</strong>
          <input
            type="range"
            min="5"
            max="120"
            step="1"
            value={hoursPerWeek}
            onChange={(event) => setHoursPerWeek(Number(event.target.value))}
          />
        </label>

        <label className="ai-impact-control">
          <span>Average blended hourly cost</span>
          <strong>{formatCurrency(hourlyCost)} / hr</strong>
          <input
            type="range"
            min="10"
            max="180"
            step="1"
            value={hourlyCost}
            onChange={(event) => setHourlyCost(Number(event.target.value))}
          />
        </label>

        <label className="ai-impact-control">
          <span>Monthly error + rework cost</span>
          <strong>{formatCurrency(reworkCost)} / mo</strong>
          <input
            type="range"
            min="0"
            max="30000"
            step="250"
            value={reworkCost}
            onChange={(event) => setReworkCost(Number(event.target.value))}
          />
        </label>

        <label className="ai-impact-control">
          <span>Estimated implementation spend</span>
          <strong>{formatCurrency(implementationCost)}</strong>
          <input
            type="range"
            min="10000"
            max="300000"
            step="1000"
            value={implementationCost}
            onChange={(event) => setImplementationCost(Number(event.target.value))}
          />
        </label>
      </div>

      <div className="ai-impact-metrics">
        <article>
          <p>Monthly Savings</p>
          <h4>{formatCurrency(metrics.monthlySavings)}</h4>
        </article>
        <article>
          <p>Year-One Net Gain</p>
          <h4>{formatCurrency(metrics.netYearOne)}</h4>
        </article>
        <article>
          <p>Payback Period</p>
          <h4>{metrics.paybackMonths.toFixed(1)} months</h4>
        </article>
        <article>
          <p>Estimated ROI</p>
          <h4>{metrics.roi.toFixed(0)}%</h4>
        </article>
      </div>
    </div>
  );
}
