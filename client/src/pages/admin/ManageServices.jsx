import React, { useEffect, useState } from 'react';
import { Trash2, Edit2, Loader2, CheckCircle2 } from 'lucide-react';
import apiClient, { getImageUrl } from '../../services/api';

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', is_featured: false, sort_order: 0 });
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);

  const fetchServices = async () => {
    try {
      const res = await apiClient.get('/services');
      setServices(res.data.data.services);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleEdit = (service) => {
    setEditingId(service.id);
    setFormData({
      title: service.title,
      description: service.description,
      is_featured: !!service.is_featured,
      sort_order: service.sort_order || 0
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ title: '', description: '', is_featured: false, sort_order: 0 });
    setImageFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('is_featured', formData.is_featured);
      data.append('sort_order', formData.sort_order);
      if (imageFile) data.append('image', imageFile);

      if (editingId) {
        await apiClient.put(`/services/${editingId}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
        setNotification('Service updated successfully');
      } else {
        await apiClient.post('/services', data, { headers: { 'Content-Type': 'multipart/form-data' } });
        setNotification('Service created successfully');
      }

      resetForm();
      fetchServices();
      setTimeout(() => setNotification(null), 4000);
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving service');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      await apiClient.delete(`/services/${id}`);
      fetchServices();
    } catch (err) {
      alert('Failed to delete service');
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Manage Services</h1>

      {notification && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#eaf7ed', color: '#1e6834', padding: '0.85rem', borderRadius: '6px', marginBottom: '1.5rem' }}>
          <CheckCircle2 size={18} />
          <span>{notification}</span>
        </div>
      )}

      <div style={{ background: '#fff', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '2.5rem' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>{editingId ? 'Edit Service' : 'Add New Service'}</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Service Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              style={{ width: '100%', padding: '0.65rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Image File</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              style={{ width: '100%', padding: '0.45rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
            />
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Description *</label>
            <textarea
              required
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              style={{ width: '100%', padding: '0.65rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
            ></textarea>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
              <input
                type="checkbox"
                checked={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
              />
              Show on Homepage
            </label>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', alignItems: 'center' }}>
            {editingId && (
              <button type="button" onClick={resetForm} className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>Cancel</button>
            )}
            <button type="submit" disabled={submitting} className="btn-primary" style={{ padding: '0.5rem 1.25rem' }}>
              {submitting ? <Loader2 className="animate-spin" size={16} /> : editingId ? 'Update Service' : 'Save Service'}
            </button>
          </div>
        </form>
      </div>

      <div style={{ background: '#fff', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead style={{ background: 'var(--wood-cream)', borderBottom: '1px solid var(--border-color)' }}>
            <tr>
              <th style={{ padding: '0.85rem 1rem' }}>Image</th>
              <th style={{ padding: '0.85rem 1rem' }}>Title</th>
              <th style={{ padding: '0.85rem 1rem' }}>Featured</th>
              <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} style={{ padding: '2rem', textAlign: 'center' }}>Loading services...</td></tr>
            ) : services.length === 0 ? (
              <tr><td colSpan={4} style={{ padding: '2rem', textAlign: 'center' }}>No services configured.</td></tr>
            ) : (
              services.map((s) => (
                <tr key={s.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <img src={getImageUrl(s.image_url)} alt={s.title} style={{ width: '48px', height: '48px', borderRadius: '4px' }} />
                  </td>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>{s.title}</td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    {s.is_featured ? <span style={{ color: '#1e6834', fontWeight: 600 }}>Yes</span> : 'No'}
                  </td>
                  <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                    <button onClick={() => handleEdit(s)} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '0.75rem', color: 'var(--wood-primary)' }}>
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(s.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#b9281e' }}>
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

export default ManageServices;