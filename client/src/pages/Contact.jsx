// client/src/pages/Contact.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, AlertCircle, MessageCircle } from 'lucide-react';
import { submitEnquiry } from '../services/api';

const Contact = () => {
  const [searchParams] = useSearchParams();
  const requestedService = searchParams.get('service');

  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    email: '',
    service_name: requestedService || 'Door & Window Works',
    message: '',
  });

  useEffect(() => {
    if (requestedService) {
      setFormData((prev) => ({ ...prev, service_name: requestedService }));
    }
  }, [requestedService]);

  const [status, setStatus] = useState({ loading: false, success: null, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null });

    try {
      const response = await submitEnquiry(formData);
      setStatus({
        loading: false,
        success: response.message || 'Enquiry submitted successfully! We will contact you soon.',
        error: null,
      });

      setFormData({
        customer_name: '',
        phone: '',
        email: '',
        service_name: 'Door & Window Works',
        message: '',
      });
    } catch (err) {
      setStatus({
        loading: false,
        success: null,
        error: err.response?.data?.message || 'Failed to submit enquiry. Please call us directly.',
      });
    }
  };

  // WhatsApp click link with pre-filled message
  const whatsappUrl = `https://wa.me/919751056924?text=${encodeURIComponent(
    'வணக்கம் Vignesh Thachchupattarai, I need a consultation/quote for woodwork.'
  )}`;

  return (
    <div className="section-py container">
      <div className="section-header">
        <span className="section-subtitle">Get In Touch</span>
        <h1 className="section-title">Request a Woodwork Consultation</h1>
        <p className="section-desc">Have a question, need an estimate, or want us to visit your site? Send us a message.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem' }}>
        {/* Workshop Contact Details Card */}
        <div style={{ background: 'var(--wood-walnut)', color: '#ffffff', padding: '3rem', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ color: '#ffffff', fontSize: '1.8rem', marginBottom: '1.5rem' }}>Workshop Details</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <MapPin color="#c87a38" />
                <div>
                  <strong>Location:</strong>
                  <p style={{ color: 'var(--wood-light)' }}>Kottapulipalayam road, Near Janani hospital, Dharapuram - 638656</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Phone color="#c87a38" />
                <div>
                  <strong>Direct Call:</strong>
                  <p>
                    <a href="tel:+919751056924" style={{ color: 'var(--wood-light)', textDecoration: 'none' }}>
                      +91 97510 56924
                    </a>
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Mail color="#c87a38" />
                <div>
                  <strong>Email Address:</strong>
                  <p>
                    <a href="mailto:adhandapani926@gmail.com" style={{ color: 'var(--wood-light)', textDecoration: 'none' }}>
                      adhandapani926@gmail.com
                    </a>
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Clock color="#c87a38" />
                <div>
                  <strong>Working Hours:</strong>
                  <p style={{ color: 'var(--wood-light)' }}>Monday - Saturday: 8:30 AM to 7:30 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick WhatsApp Chat Action */}
          <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--wood-light)', marginBottom: '0.75rem' }}>
              Need instant price estimation or sketch discussion?
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                backgroundColor: '#25D366',
                color: '#ffffff',
                textDecoration: 'none',
                padding: '0.85rem 1.4rem',
                borderRadius: '6px',
                fontWeight: 600,
                width: '100%',
                boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)',
                transition: 'all 0.2s ease',
              }}
            >
              <MessageCircle size={20} fill="#ffffff" color="#25D366" />
              <span>Chat Directly on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Database Enquiry Form */}
        <div style={{ background: 'var(--bg-surface)', padding: '3rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Send Us an Enquiry</h3>

          {status.success && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#eaf7ed', color: '#1e6834', padding: '1rem', borderRadius: '6px', marginBottom: '1.5rem' }}>
              <CheckCircle2 size={20} />
              <span>{status.success}</span>
            </div>
          )}

          {status.error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#fdf0ed', color: '#b9281e', padding: '1rem', borderRadius: '6px', marginBottom: '1.5rem' }}>
              <AlertCircle size={20} />
              <span>{status.error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem', fontSize: '0.9rem' }}>Full Name *</label>
              <input
                type="text"
                name="customer_name"
                required
                value={formData.customer_name}
                onChange={handleChange}
                placeholder="e.g. Senthil Kumar"
                style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem', fontSize: '0.9rem' }}>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. 9842100000"
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem', fontSize: '0.9rem' }}>Email Address (Optional)</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem', fontSize: '0.9rem' }}>Service Required *</label>
              <input
                type="text"
                name="service_name"
                required
                value={formData.service_name}
                onChange={handleChange}
                style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem', fontSize: '0.9rem' }}>Details / Requirements *</label>
              <textarea
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Mention dimensions, preferred timber (Teak, Neem), or work type..."
                style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
              ></textarea>
            </div>

            <button type="submit" disabled={status.loading} className="btn-primary" style={{ justifyContent: 'center', marginTop: '0.5rem' }}>
              {status.loading ? 'Submitting...' : 'Send Enquiry'} <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;