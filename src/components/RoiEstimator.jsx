import { useMemo, useState } from 'react';

function roundCurrency(value) {
  return Math.max(0, Math.round(value));
}

export default function RoiEstimator({ title = 'ROI Estimator', subtitle = 'Model expected revenue impact using your current funnel assumptions.' }) {
  const [inputs, setInputs] = useState({
    monthlyLeads: 120,
    conversionRate: 7,
    averageDealValue: 18000,
    monthlySpend: 25000,
    expectedLift: 35,
  });

  const metrics = useMemo(() => {
    const projectedLeads = inputs.monthlyLeads * (1 + inputs.expectedLift / 100);
    const currentCustomers = inputs.monthlyLeads * (inputs.conversionRate / 100);
    const projectedCustomers = projectedLeads * (inputs.conversionRate / 100);

    const currentRevenue = currentCustomers * inputs.averageDealValue;
    const projectedRevenue = projectedCustomers * inputs.averageDealValue;
    const revenueLift = projectedRevenue - currentRevenue;
    const roi = inputs.monthlySpend > 0 ? ((revenueLift - inputs.monthlySpend) / inputs.monthlySpend) * 100 : 0;

    return {
      projectedLeads: roundCurrency(projectedLeads),
      currentRevenue: roundCurrency(currentRevenue),
      projectedRevenue: roundCurrency(projectedRevenue),
      revenueLift: roundCurrency(revenueLift),
      roi: Math.round(roi),
    };
  }, [inputs]);

  const handleNumberChange = (key) => (event) => {
    const value = Number(event.target.value || 0);
    setInputs((current) => ({
      ...current,
      [key]: Number.isFinite(value) ? value : 0,
    }));
  };

  return (
    <section className="section roi-section" aria-label="ROI estimator">
      <div className="container roi-grid">
        <div className="roi-card roi-input-card">
          <h2>{title}</h2>
          <p>{subtitle}</p>

          <div className="roi-input-grid">
            <label>
              Monthly leads
              <input type="number" min="0" value={inputs.monthlyLeads} onChange={handleNumberChange('monthlyLeads')} />
            </label>
            <label>
              Conversion rate (%)
              <input type="number" min="0" max="100" value={inputs.conversionRate} onChange={handleNumberChange('conversionRate')} />
            </label>
            <label>
              Average deal value (ETB)
              <input type="number" min="0" value={inputs.averageDealValue} onChange={handleNumberChange('averageDealValue')} />
            </label>
            <label>
              Monthly spend (ETB)
              <input type="number" min="0" value={inputs.monthlySpend} onChange={handleNumberChange('monthlySpend')} />
            </label>
            <label>
              Expected traffic lift (%)
              <input type="number" min="0" max="500" value={inputs.expectedLift} onChange={handleNumberChange('expectedLift')} />
            </label>
          </div>
        </div>

        <div className="roi-card roi-output-card">
          <h3>Projected monthly outcome</h3>
          <ul>
            <li>
              <span>Projected leads</span>
              <strong>{metrics.projectedLeads}</strong>
            </li>
            <li>
              <span>Current revenue (ETB)</span>
              <strong>{metrics.currentRevenue.toLocaleString()}</strong>
            </li>
            <li>
              <span>Projected revenue (ETB)</span>
              <strong>{metrics.projectedRevenue.toLocaleString()}</strong>
            </li>
            <li>
              <span>Revenue lift (ETB)</span>
              <strong>{metrics.revenueLift.toLocaleString()}</strong>
            </li>
            <li className={`roi-highlight ${metrics.roi >= 0 ? 'positive' : 'negative'}`}>
              <span>Estimated ROI</span>
              <strong>{metrics.roi}%</strong>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
