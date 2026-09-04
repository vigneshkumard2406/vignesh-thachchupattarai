import React, { useEffect, useState } from 'react';
import { Phone, Mail, Trash2 } from 'lucide-react';
import apiClient from '../../services/api';

const ManageEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = async () => {
    try {
      const url = filterStatus !== 'all' ? `/enquiries?status=${filterStatus}` : '/enquiries';
      const res = await apiClient.get(url);
      setEnquiries(res.data.data.enquiries);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [filterStatus]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await apiClient.put(`/enquiries/${id}`, { status: newStatus });
      fetchEnquiries();
    } catch (err) {
      alert('Status change failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this enquiry record?')) return;
    try {
      await apiClient.delete(`/enquiries/${id}`);
      fetchEnquiries();
    } catch (err) {
      alert('Failed to delete enquiry');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ fontSize: '1.8rem' }}>Customer Inquiries</h1>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['all', 'new', 'contacted', 'completed'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={filterStatus === st ? 'btn-primary' : 'btn-secondary'}
              style={{ padding: '0.4rem 1rem', fontSize: '0.85rem', textTransform: 'capitalize' }}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead style={{ background: 'var(--wood-cream)', borderBottom: '1px solid var(--border-color)' }}>
            <tr>
              <th style={{ padding: '0.85rem 1rem' }}>Customer</th>
              <th style={{ padding: '0.85rem 1rem' }}>Service Required</th>
              <th style={{ padding: '0.85rem 1rem' }}>Details / Note</th>
              <th style={{ padding: '0.85rem 1rem' }}>Status</th>
              <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} style={{ padding: '2rem', textAlign: 'center' }}>Loading inquiries...</td></tr>
            ) : enquiries.length === 0 ? (
              <tr><td colSpan={5} style={{ padding: '2rem', textAlign: 'center' }}>No inquiries matching this status.</td></tr>
            ) : (
              enquiries.map((enq) => (
                <tr key={enq.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <div style={{ fontWeight: 600 }}>{enq.customer_name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', gap: '0.5rem', marginTop: '0.2rem' }}>
                      <span><Phone size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> {enq.phone}</span>
                      {enq.email && <span><Mail size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> {enq.email}</span>}
                    </div>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 500 }}>{enq.service_name}</td>
                  <td style={{ padding: '0.85rem 1rem', maxWidth: '300px', color: 'var(--text-muted)' }}>{enq.message}</td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <select
                      value={enq.status}
                      onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                      style={{
                        padding: '0.35rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        border: '1px solid var(--border-color)',
                        background: enq.status === 'new' ? '#fff4e5' : enq.status === 'contacted' ? '#e5f3ff' : '#eaf7ed',
                        color: enq.status === 'new' ? '#c87a38' : enq.status === 'contacted' ? '#0066cc' : '#1e6834'
                      }}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                    <button onClick={() => handleDelete(enq.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#b9281e' }}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageEnquiries;