import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import SectionHeader from '../components/SectionHeader';
import IconGlyph from '../components/IconGlyph';
import { getAdditionalServices, getFeaturedAddons } from '../services/pricingData';

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
        <div className="container page-hero-content">
          <div className="eyebrow">01 · ADD-ONS</div>
          <h1>
            supporting services, <em className="verb">quoted</em>&nbsp;plainly.
          </h1>
          <p>
            These are add-ons around the main build: hosting, maintenance, brand work, copy, and launch support. They are not the first thing we try to sell.
          </p>
          <div className="page-hero-meta" aria-label="Additional services notes">
            <span className="page-hero-chip">Secondary to the main build</span>
            <span className="page-hero-chip">Live ETB pricing</span>
            <span className="page-hero-chip">Monthly maintenance only</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              eyebrow="02 · SERVICE TABLE"
              title="Use these when they support the real project, not as filler scope."
              subtitle="The table below reflects the live ETB ranges in the project."
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
              subtitle="They are useful when tied to a real launch or operating need, not as automatic upsells."
              align="left"
            />
          </ScrollReveal>

          {loading ? (
            <div className="loading-state">
              <p>Loading add-ons...</p>
            </div>
          ) : (
            <div className="editorial-card-grid editorial-card-grid-dark">
              {featuredAddons.map((addon) => (
                <ScrollReveal key={addon.title}>
                  <article className="editorial-card glass-card editorial-track-card">
                    <div className="editorial-card-top">
                      <span className="ai-preview-icon" aria-hidden="true">
                        <IconGlyph name={addon.icon} size={18} />
                      </span>
                      <h3>{addon.title}</h3>
                    </div>
                    <p>{addon.description}</p>
                    <p className="editorial-price-tag">{addon.price}</p>
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
              If the add-on request is attached to a larger operational problem, start with the Workflow Audit so the main decision is made correctly first.
            </p>
            <div className="cta-actions">
              <Link to="/workflow-audit" className="btn btn-primary btn-lg">
                Book Workflow Audit
              </Link>
              <Link to="/book-discovery-call" className="btn btn-secondary btn-lg">
                Book Discovery Call
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
