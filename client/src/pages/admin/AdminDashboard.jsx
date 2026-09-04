import React, { useEffect, useState } from 'react';
import { MessageSquare, AlertCircle, Wrench, FolderKanban, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import apiClient from '../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalEnquiries: 0, newEnquiries: 0, totalServices: 0, totalProjects: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [enquiryStats, services, projects] = await Promise.all([
          apiClient.get('/enquiries/stats'),
          apiClient.get('/services'),
          apiClient.get('/projects')
        ]);

        setStats({
          totalEnquiries: enquiryStats.data.data.stats.totalEnquiries || 0,
          newEnquiries: enquiryStats.data.data.stats.newEnquiries || 0,
          totalServices: services.data.results || 0,
          totalProjects: projects.data.results || 0
        });
      } catch (err) {
        console.error('Failed to load dashboard metrics', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Dashboard Overview</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Performance metrics for Vignesh Thachchupattarai</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>NEW LEADS</span>
            <AlertCircle color="#c87a38" size={20} />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--wood-primary)' }}>{loading ? '...' : stats.newEnquiries}</div>
          <Link to="/admin/enquiries" style={{ fontSize: '0.8rem', color: 'var(--wood-amber)', display: 'inline-flex', alignItems: 'center', gap: '2px', marginTop: '0.5rem' }}>
            Review new requests <ArrowUpRight size={14} />
          </Link>
        </div>

        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>ALL ENQUIRIES</span>
            <MessageSquare color="#8c532b" size={20} />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 700 }}>{loading ? '...' : stats.totalEnquiries}</div>
          <Link to="/admin/enquiries" style={{ fontSize: '0.8rem', color: 'var(--wood-amber)', display: 'inline-flex', alignItems: 'center', gap: '2px', marginTop: '0.5rem' }}>
            View lead history <ArrowUpRight size={14} />
          </Link>
        </div>

        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>ACTIVE SERVICES</span>
            <Wrench color="#3d271d" size={20} />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 700 }}>{loading ? '...' : stats.totalServices}</div>
          <Link to="/admin/services" style={{ fontSize: '0.8rem', color: 'var(--wood-amber)', display: 'inline-flex', alignItems: 'center', gap: '2px', marginTop: '0.5rem' }}>
            Manage catalog <ArrowUpRight size={14} />
          </Link>
        </div>

        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>PORTFOLIO WORKS</span>
            <FolderKanban color="#242220" size={20} />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 700 }}>{loading ? '...' : stats.totalProjects}</div>
          <Link to="/admin/projects" style={{ fontSize: '0.8rem', color: 'var(--wood-amber)', display: 'inline-flex', alignItems: 'center', gap: '2px', marginTop: '0.5rem' }}>
            Update gallery <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;