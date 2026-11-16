import { Link } from 'react-router-dom';

export default function BrutalPriceBoard({
  title = 'Published starting prices',
  note = 'Fixed anchors for common scopes. Final quotes follow the same ETB table.',
  rows,
  ctaLabel = 'See full pricing',
  ctaTo = '/pricing',
}) {
  return (
    <aside className="brutal-price-board" aria-label={title}>
      <div className="brutal-price-board__head">
        <span>Rate sheet / ETB</span>
        <strong>{title}</strong>
      </div>
      <div className="brutal-price-board__rows">
        {rows.map((row) => (
          <div className="brutal-price-board__row" key={row.label}>
            <span>{row.label}</span>
            <strong>{row.price}</strong>
          </div>
        ))}
      </div>
      <div className="brutal-price-board__note">{note}</div>
      <Link className="brutal-price-board__cta" to={ctaTo}>
        {ctaLabel}
        <span aria-hidden="true">↗</span>
      </Link>
    </aside>
  );
}
