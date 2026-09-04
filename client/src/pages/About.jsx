import React from 'react';
import { Target, ShieldCheck, HeartHandshake } from 'lucide-react';

const About = () => {
  return (
    <div className="about-page">
      <section className="section-py container">
        <div className="section-header">
          <span className="section-subtitle">Heritage & Legacy</span>
          <h1 className="section-title">The Story of Vignesh Thachchupattarai</h1>
          <p className="section-desc">
            Founded on pure passion for genuine woodworking, our workshop merges time-tested South Indian craftsmanship with contemporary functional design.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center', marginBottom: '5rem' }}>
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Handcrafted with Care and Integrity</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: '1.8' }}>
              What began over two decades ago as a humble neighborhood workshop has blossomed into a trusted name for residential and commercial woodwork. Every piece of wood entering our shop is personally inspected, seasoned, planed, and carved by our veteran carpenters.
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
              We do not believe in disposable, flat-pack particle board furniture. We handcraft items that live through celebrations, family gatherings, and everyday moments for decades.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?q=80&w=800&auto=format&fit=crop"
            alt="Carpenter shaping wood at workbench"
            style={{ borderRadius: 'var(--radius-md)', width: '100%', height: '380px', objectFit: 'cover' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          <div className="pillar-card">
            <div className="pillar-icon"><Target size={28} /></div>
            <h3>Our Mission</h3>
            <p>To provide durable woodwork solutions at genuine pricing without compromising on material authenticity.</p>
          </div>
          <div className="pillar-card">
            <div className="pillar-icon"><ShieldCheck size={28} /></div>
            <h3>Material Purity</h3>
            <p>We source certified first-grade teakwood, neem, mahogany, and moisture-resistant plywood directly.</p>
          </div>
          <div className="pillar-card">
            <div className="pillar-icon"><HeartHandshake size={28} /></div>
            <h3>Lifelong Relationship</h3>
            <p>Our commitment doesn't end at delivery. We stand by our joinery, offering polishing and support.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;