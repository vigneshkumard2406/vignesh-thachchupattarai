// client/src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import { fetchFeaturedServices, fetchProjects, getImageUrl } from '../services/api';
import './Home.css';

const Home = () => {
  const [featuredServices, setFeaturedServices] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const [servicesData, projectsData] = await Promise.all([
          fetchFeaturedServices(),
          fetchProjects()
        ]);
        setFeaturedServices(servicesData.slice(0, 3));
        setFeaturedProjects(projectsData.slice(0, 3));
      } catch (err) {
        console.error('Error loading featured content:', err);
      }
    };
    loadFeatured();
  }, []);

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <span className="section-subtitle">Authentic Tamil Woodcraft</span>
            <h1 className="hero-title">Custom Carpentry Handcrafted With Soul & Strength</h1>
            <p className="hero-desc">
              From hand-carved teak doors to modern bespoke storage and interior fittings, Vignesh Thachchupattarai turns raw timber into timeless works of art for your home.
            </p>
            <div className="hero-actions">
              <Link to="/projects" className="btn-primary">
                View Our Portfolio <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="btn-secondary">
                Request Free Estimate
              </Link>
            </div>
            <div className="hero-features">
              <div className="feat-pill"><CheckCircle2 size={16} color="#c87a38" /> 100% Solid Teak & Hardwood</div>
              <div className="feat-pill"><CheckCircle2 size={16} color="#c87a38" /> 25+ Years Crafting Heritage</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services from Database */}
      {featuredServices.length > 0 && (
        <section className="section-py container">
          <div className="section-header">
            <span className="section-subtitle">Core Craftsmanship</span>
            <h2 className="section-title">Specialized Carpentry Works</h2>
            <p className="section-desc">Engineered for architectural harmony, structural strength, and beauty.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {featuredServices.map((srv) => (
              <div key={srv.id} className="pillar-card" style={{ padding: '0', overflow: 'hidden' }}>
                <img src={getImageUrl(srv.image_url)} alt={srv.title} style={{ height: '220px', width: '100%', objectFit: 'cover' }} />
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{srv.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>{srv.description}</p>
                  <Link to={`/contact?service=${encodeURIComponent(srv.title)}`} style={{ color: 'var(--wood-primary)', fontWeight: '600', fontSize: '0.9rem' }}>
                    Request Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Pillars */}
      <section className="section-py pillars-section" style={{ background: '#f5efe6' }}>
        <div className="container">
          <div className="pillars-grid">
            <div className="pillar-card">
              <div className="pillar-icon"><Award size={28} /></div>
              <h3>Master Joinery</h3>
              <p>Traditional mortise and tenon joinery techniques guaranteeing lifetime structural durability.</p>
            </div>
            <div className="pillar-card">
              <div className="pillar-icon"><ShieldCheck size={28} /></div>
              <h3>Seasoned Quality Timber</h3>
              <p>Strictly vetted first-grade teak, rosewood, neem, and marine plywood resistant to pests and warping.</p>
            </div>
            <div className="pillar-card">
              <div className="pillar-icon"><Clock size={28} /></div>
              <h3>Punctual Delivery</h3>
              <p>Precise on-site measurements, transparent quoting, and reliable completion timelines.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects from Database */}
      {featuredProjects.length > 0 && (
        <section className="section-py container">
          <div className="section-header">
            <span className="section-subtitle">Portfolio Highlights</span>
            <h2 className="section-title">Recent Wooden Creations</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {featuredProjects.map((proj) => (
              <div key={proj.id} className="pillar-card" style={{ padding: '0', overflow: 'hidden' }}>
                <img src={getImageUrl(proj.image_url)} alt={proj.title} style={{ height: '240px', width: '100%', objectFit: 'cover' }} />
                <div style={{ padding: '1.5rem' }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--wood-amber)', fontWeight: '700' }}>{proj.category}</span>
                  <h3 style={{ fontSize: '1.2rem', margin: '0.35rem 0' }}>{proj.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{proj.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/projects" className="btn-secondary">Explore Complete Gallery <ArrowRight size={16} /></Link>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="section-py cta-banner">
        <div className="container banner-inner">
          <div>
            <h2 className="banner-title">Have a custom furniture idea in mind?</h2>
            <p className="banner-sub">Bring your sketches or dimensions. We bring wood to life.</p>
          </div>
          <Link to="/contact" className="btn-primary">
            Speak Directly With The Carpenter <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;