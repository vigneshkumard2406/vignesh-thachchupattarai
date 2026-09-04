// client/src/components/WhatsAppButton.jsx
import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = ({ phoneNumber = "919876543210" }) => {
  // Unga number-ai 91 kooda serthu space illama podunga (e.g., 919842123456)
  const defaultMessage = encodeURIComponent(
    "Vanakkam! Vignesh Thachchupattarai, I need a consultation/quote for custom woodwork."
  );

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        backgroundColor: '#25D366',
        color: '#ffffff',
        borderRadius: '50px',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
        zIndex: 9999,
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '0.95rem',
        transition: 'transform 0.2s ease-in-out'
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <MessageCircle size={22} fill="#ffffff" color="#25D366" />
      <span>WhatsApp Chat</span>
    </a>
  );
};

export default WhatsAppButton;