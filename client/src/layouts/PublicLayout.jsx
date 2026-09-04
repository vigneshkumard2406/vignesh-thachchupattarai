// client/src/layouts/PublicLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PublicLayout = () => {
  const myWhatsAppNumber = '919751056924';
  const defaultMsg = encodeURIComponent(
    'வணக்கம் Vignesh Thachchupattarai, I need a consultation/quote for woodwork.'
  );
  const whatsappUrl = `https://wa.me/${myWhatsAppNumber}?text=${defaultMsg}`;

  return (
    <div className="site-wrapper">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />

      {/* Circular Floating WhatsApp Icon */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        title="Chat on WhatsApp"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '56px',
          height: '56px',
          backgroundColor: '#25D366',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.25)',
          zIndex: 9999,
          cursor: 'pointer',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.12)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.25)';
        }}
      >
        <MessageCircle size={30} fill="#ffffff" color="#25D366" />
      </a>
    </div>
  );
};

export default PublicLayout;