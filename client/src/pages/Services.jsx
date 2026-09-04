// client/src/pages/Services.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { fetchServices, getImageUrl } from '../services/api';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchServices();
        setServices(data);
      } catch (err) {
        setError('Failed to fetch services from server. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadServices();
  }, []);

  return (
    <div className="section-py container">
      <div className="section-header">
        <span className="section-subtitle">What We Offer</span>
        <h1 className="section-title">Master Carpentry & Custom Works</h1>
        <p className="section-desc">
          Tailored carpentry crafted specifically to your home's exact dimensions and design preferences.
        </p>
      </div>

      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '250px', gap: '0.75rem', color: 'var(--wood-primary)' }}>
          <Loader2 className="animate-spin" size={32} />
          <span>Loading carpentry services...</span>
        </div>
      )}

      {error && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#fdf0ed', color: '#b9281e', padding: '1.25rem', borderRadius: '8px', maxWidth: '600px', margin: '0 auto' }}>
          <AlertCircle size={22} />
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && services.length === 0 && (
        <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No services listed yet.</p>
      )}

      {!loading && !error && services.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
          {services.map((srv) => (
            <div key={srv.id} className="pillar-card" style={{ padding: '0', overflow: 'hidden' }}>
              <img
                src={getImageUrl(srv.image_url)}
                alt={srv.title}
                style={{ height: '220px', width: '100%', objectFit: 'cover' }}
              />
              <div style={{ padding: '1.75rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{srv.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.25rem' }}>
                  {srv.description}
                </p>
                <Link
                  to={`/contact?service=${encodeURIComponent(srv.title)}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    color: 'var(--wood-primary)',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                  }}
                >
                  Enquire For This Work <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Services;