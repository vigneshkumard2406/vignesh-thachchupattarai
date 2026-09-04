import React, { useEffect, useState } from 'react';
import { Trash2, Edit2, Loader2, CheckCircle2 } from 'lucide-react';
import apiClient, { getImageUrl } from '../../services/api';

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', category: 'Doors', description: '', is_featured: false, completion_date: '' });
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);

  const fetchProjects = async () => {
    try {
      const res = await apiClient.get('/projects');
      setProjects(res.data.data.projects);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleEdit = (p) => {
    setEditingId(p.id);
    setFormData({
      title: p.title,
      category: p.category,
      description: p.description,
      is_featured: !!p.is_featured,
      completion_date: p.completion_date ? p.completion_date.split('T')[0] : ''
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ title: '', category: 'Doors', description: '', is_featured: false, completion_date: '' });
    setImageFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editingId && !imageFile) {
      alert('Please select an image for the project');
      return;
    }
    setSubmitting(true);

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('category', formData.category);
      data.append('description', formData.description);
      data.append('is_featured', formData.is_featured);
      if (formData.completion_date) data.append('completion_date', formData.completion_date);
      if (imageFile) data.append('image', imageFile);

      if (editingId) {
        await apiClient.put(`/projects/${editingId}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
        setNotification('Project updated successfully');
      } else {
        await apiClient.post('/projects', data, { headers: { 'Content-Type': 'multipart/form-data' } });
        setNotification('Project added successfully');
      }

      resetForm();
      fetchProjects();
      setTimeout(() => setNotification(null), 4000);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save project');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project permanently?')) return;
    try {
      await apiClient.delete(`/projects/${id}`);
      fetchProjects();
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Portfolio Gallery Projects</h1>

      {notification && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#eaf7ed', color: '#1e6834', padding: '0.85rem', borderRadius: '6px', marginBottom: '1.5rem' }}>
          <CheckCircle2 size={18} />
          <span>{notification}</span>
        </div>
      )}

      <div style={{ background: '#fff', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '2.5rem' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>{editingId ? 'Edit Project' : 'Upload New Project'}</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Project Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Traditional Teak Main Door"
              style={{ width: '100%', padding: '0.65rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Category *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              style={{ width: '100%', padding: '0.65rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
            >
              <option value="Doors">Doors</option>
              <option value="Furniture">Furniture</option>
              <option value="Storage">Storage</option>
              <option value="Interior">Interior</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Project Image *</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              style={{ width: '100%', padding: '0.45rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Date Completed</label>
            <input
              type="date"
              value={formData.completion_date}
              onChange={(e) => setFormData({ ...formData, completion_date: e.target.value })}
              style={{ width: '100%', padding: '0.65rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
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

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              id="is_featured"
              checked={formData.is_featured}
              onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
            />
            <label htmlFor="is_featured" style={{ fontSize: '0.85rem' }}>Feature in Homepage Carousel</label>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', alignItems: 'center' }}>
            {editingId && (
              <button type="button" onClick={resetForm} className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>Cancel</button>
            )}
            <button type="submit" disabled={submitting} className="btn-primary" style={{ padding: '0.5rem 1.25rem' }}>
              {submitting ? <Loader2 className="animate-spin" size={16} /> : editingId ? 'Update Work' : 'Add Work'}
            </button>
          </div>
        </form>
      </div>

      <div style={{ background: '#fff', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead style={{ background: 'var(--wood-cream)', borderBottom: '1px solid var(--border-color)' }}>
            <tr>
              <th style={{ padding: '0.85rem 1rem' }}>Photo</th>
              <th style={{ padding: '0.85rem 1rem' }}>Title</th>
              <th style={{ padding: '0.85rem 1rem' }}>Category</th>
              <th style={{ padding: '0.85rem 1rem' }}>Featured</th>
              <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} style={{ padding: '2rem', textAlign: 'center' }}>Loading projects...</td></tr>
            ) : projects.length === 0 ? (
              <tr><td colSpan={5} style={{ padding: '2rem', textAlign: 'center' }}>No gallery items recorded.</td></tr>
            ) : (
              projects.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <img src={getImageUrl(p.image_url)} alt={p.title} style={{ width: '54px', height: '54px', borderRadius: '4px' }} />
                  </td>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>{p.title}</td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <span style={{ background: '#f5efe6', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem' }}>{p.category}</span>
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    {p.is_featured ? <span style={{ color: '#1e6834', fontWeight: 600 }}>Yes</span> : 'No'}
                  </td>
                  <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                    <button onClick={() => handleEdit(p)} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '0.75rem', color: 'var(--wood-primary)' }}>
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(p.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#b9281e' }}>
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

export default ManageProjects;