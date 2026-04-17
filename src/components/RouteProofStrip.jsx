import ScrollReveal from './ScrollReveal';

export default function RouteProofStrip({ items = [] }) {
  if (!items.length) {
    return null;
  }

  return (
    <section className="section-sm route-proof-strip">
      <div className="container">
        <ScrollReveal stagger>
          <div className="micro-proof-grid">
            {items.map((item) => (
              <article key={item.title} className="micro-proof-card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
