import { useMemo, useState } from 'react';
import { useLanguage } from '../i18n/useLanguage';

function roundCurrency(value) {
  return Math.max(0, Math.round(value));
}

export default function RoiEstimator({ title, subtitle }) {
  const { t } = useLanguage();

  const resolvedTitle = title || t('roi.title', 'ROI Estimator');
  const resolvedSubtitle = subtitle || t('roi.subtitle', 'Model expected revenue impact using your current funnel assumptions.');

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
    <section className="section roi-section" aria-label={t('roi.aria', 'ROI estimator')}>
      <div className="container roi-grid">
        <div className="roi-card roi-input-card">
          <h2>{resolvedTitle}</h2>
          <p>{resolvedSubtitle}</p>

          <div className="roi-input-grid">
            <label>
              {t('roi.inputs.monthlyLeads', 'Monthly leads')}
              <input type="number" min="0" value={inputs.monthlyLeads} onChange={handleNumberChange('monthlyLeads')} />
            </label>
            <label>
              {t('roi.inputs.conversionRate', 'Conversion rate (%)')}
              <input type="number" min="0" max="100" value={inputs.conversionRate} onChange={handleNumberChange('conversionRate')} />
            </label>
            <label>
              {t('roi.inputs.averageDealValue', 'Average deal value (ETB)')}
              <input type="number" min="0" value={inputs.averageDealValue} onChange={handleNumberChange('averageDealValue')} />
            </label>
            <label>
              {t('roi.inputs.monthlySpend', 'Monthly spend (ETB)')}
              <input type="number" min="0" value={inputs.monthlySpend} onChange={handleNumberChange('monthlySpend')} />
            </label>
            <label>
              {t('roi.inputs.expectedLift', 'Expected traffic lift (%)')}
              <input type="number" min="0" max="500" value={inputs.expectedLift} onChange={handleNumberChange('expectedLift')} />
            </label>
          </div>
        </div>

        <div className="roi-card roi-output-card">
          <h3>{t('roi.output.title', 'Projected monthly outcome')}</h3>
          <ul>
            <li>
              <span>{t('roi.output.projectedLeads', 'Projected leads')}</span>
              <strong>{metrics.projectedLeads}</strong>
            </li>
            <li>
              <span>{t('roi.output.currentRevenue', 'Current revenue (ETB)')}</span>
              <strong>{metrics.currentRevenue.toLocaleString()}</strong>
            </li>
            <li>
              <span>{t('roi.output.projectedRevenue', 'Projected revenue (ETB)')}</span>
              <strong>{metrics.projectedRevenue.toLocaleString()}</strong>
            </li>
            <li>
              <span>{t('roi.output.revenueLift', 'Revenue lift (ETB)')}</span>
              <strong>{metrics.revenueLift.toLocaleString()}</strong>
            </li>
            <li className={`roi-highlight ${metrics.roi >= 0 ? 'positive' : 'negative'}`}>
              <span>{t('roi.output.estimatedRoi', 'Estimated ROI')}</span>
              <strong>{metrics.roi}%</strong>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
