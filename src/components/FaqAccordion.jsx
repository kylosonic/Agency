import { useState } from 'react';
import IconGlyph from './IconGlyph';

export default function FaqAccordion({ title, subtitle, items = [] }) {
  const [openIndex, setOpenIndex] = useState(0);

  if (!items.length) {
    return null;
  }

  return (
    <section className="section faq-section" aria-label={title || 'Frequently asked questions'}>
      <div className="container">
        {title ? <h2 className="faq-title">{title}</h2> : null}
        {subtitle ? <p className="faq-subtitle">{subtitle}</p> : null}
        <div className="faq-list">
          {items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <article key={item.question} className={`faq-item ${isOpen ? 'open' : ''}`.trim()}>
                <button
                  type="button"
                  className="faq-question"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span>{item.question}</span>
                  <span className="faq-icon" aria-hidden="true">
                    <IconGlyph name={isOpen ? 'close' : 'spark'} size={14} />
                  </span>
                </button>
                <div className="faq-answer" hidden={!isOpen}>
                  <p>{item.answer}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
