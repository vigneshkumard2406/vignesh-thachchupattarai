// client/src/pages/Projects.jsx
import React, { useState, useEffect } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { fetchProjects, getImageUrl } from '../services/api';

const categories = ['All', 'Doors', 'Furniture', 'Storage', 'Interior'];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      try {
        const data = await fetchProjects(filter);
        setProjects(data);
        setError(null);
      } catch (err) {
        setError('Failed to load portfolio projects.');
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, [filter]);

  return (
    <div className="section-py container">
      <div className="section-header">
        <span className="section-subtitle">Crafted with Pride</span>
        <h1 className="section-title">Completed Works Gallery</h1>
        <p className="section-desc">Browse our portfolio of real residential woodwork and bespoke projects.</p>
      </div>

      {/* Category Pills */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={filter === cat ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '0.5rem 1.4rem', fontSize: '0.9rem' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '250px', gap: '0.75rem', color: 'var(--wood-primary)' }}>
          <Loader2 className="animate-spin" size={32} />
          <span>Fetching gallery items...</span>
        </div>
      )}

      {error && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#fdf0ed', color: '#b9281e', padding: '1.25rem', borderRadius: '8px', maxWidth: '600px', margin: '0 auto' }}>
          <AlertCircle size={22} />
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && projects.length === 0 && (
        <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No projects found under this category.</p>
      )}

      {!loading && !error && projects.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
          {projects.map((proj) => (
            <div key={proj.id} className="pillar-card" style={{ padding: 0, overflow: 'hidden' }}>
              <img
                src={getImageUrl(proj.image_url)}
                alt={proj.title}
                style={{ height: '260px', width: '100%', objectFit: 'cover' }}
              />
              <div style={{ padding: '1.5rem' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--wood-amber)', fontWeight: '700' }}>
                  {proj.category}
                </span>
                <h3 style={{ fontSize: '1.2rem', margin: '0.35rem 0 0.5rem' }}>{proj.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{proj.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;