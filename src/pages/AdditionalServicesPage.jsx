import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import HeroChoreo, { HeroChoreoHeadline } from '../components/HeroChoreo';
import SectionHeader from '../components/SectionHeader';
import BrutalPriceBoard from '../components/BrutalPriceBoard';
import { getAdditionalServices, getFeaturedAddons } from '../services/pricingData';

const SUPPORT_PRICE_ROWS = [
  { label: 'Hosting', price: 'from 6,500 ETB / yr' },
  { label: 'Maintenance', price: 'from 18,000 ETB / yr' },
  { label: 'Integration', price: 'from 30,000 ETB' },
  { label: 'QA & security', price: '25,000 – 80,000 ETB' },
];

export default function AdditionalServicesPage() {
  const [services, setServices] = useState([]);
  const [featuredAddons, setFeaturedAddons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesData, addonsData] = await Promise.all([
          getAdditionalServices(),
          getFeaturedAddons(),
        ]);
        setServices(servicesData);
        setFeaturedAddons(addonsData);
      } catch (error) {
        console.error('Failed to load additional services pricing data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <section className="page-hero">
        <div className="container marquee-hero-grid">
          <div className="page-hero-content">
            <HeroChoreo>
              <div className="eyebrow">01 · ADD-ONS</div>
              <HeroChoreoHeadline>
                supporting services, <em className="verb">quoted</em>&nbsp;plainly.
              </HeroChoreoHeadline>
              <p>
                Engineering support around the main build: hosting, maintenance, integrations,
                modernization, QA, and release hardening.
              </p>
              <div className="page-hero-meta" aria-label="Additional services notes">
                <span className="page-hero-chip">Secondary to the main build</span>
                <span className="page-hero-chip">Live ETB pricing</span>
                <span className="page-hero-chip">Annual maintenance plans</span>
              </div>
            </HeroChoreo>
          </div>
          <div className="marquee-hero-side">
            <BrutalPriceBoard
              title="Support rates"
              rows={SUPPORT_PRICE_ROWS}
              note="Recurring services are annual. One-time engineering work is scoped before it starts."
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              eyebrow="02 · SERVICE TABLE"
              title="Technical add-ons that support the software you run."
              subtitle="Live ETB ranges for integration, maintenance, modernization, and quality engineering."
              align="left"
            />
          </ScrollReveal>

          <ScrollReveal>
            <div className="services-table-wrapper">
              <table className="services-table">
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Description</th>
                    <th>Estimated cost</th>
                    <th>Billing</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="4" className="table-loading-cell">Loading services...</td>
                    </tr>
                  ) : (
                    services.map((item) => (
                      <tr key={item.service}>
                        <td><strong>{item.service}</strong></td>
                        <td className="services-table-description">{item.description}</td>
                        <td className="price-cell">{item.price}</td>
                        <td>
                          <span className="billing-chip">{item.type}</span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section band-dark band-1">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              eyebrow="03 · COMMON ADDITIONS"
              title="These are the line items teams ask for most often."
              subtitle="Useful when tied to a real launch or operating need."
              align="left"
            />
          </ScrollReveal>

          {loading ? (
            <div className="loading-state">
              <p>Loading add-ons...</p>
            </div>
          ) : (
            <div className="editorial-card-grid editorial-card-grid-dark receipt-stack">
              {/* B43 (TECH-26): add-ons as ruled receipt rows — icon tops removed,
                  price stays a mono tabular figure. */}
              {featuredAddons.map((addon) => (
                <ScrollReveal key={addon.title}>
                  <article className="editorial-card editorial-track-card addon-track-card">
                    <p className="editorial-price-tag">{addon.price}</p>
                    <h3>{addon.title}</h3>
                    <p>{addon.description}</p>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div className="page-closing-card glass-strong">
            <p className="editorial-kicker">Custom need?</p>
            <div className="eyebrow">04 · FIRST STEP</div>
            <h2>If it supports a real workflow or launch, we can scope it.</h2>
            <p>
              Start a project with scope and budget context — we respond within 1 business day.
            </p>
            <div className="cta-actions">
              {/* R-6 (TECH-46): Start a Project primary → Home intake form. */}
              <Link to="/#project-intake" className="btn btn-primary btn-lg">
                Start a Project
              </Link>
              <Link to="/book-discovery-call" className="btn btn-secondary btn-lg">
                Discuss Your Software Idea
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
