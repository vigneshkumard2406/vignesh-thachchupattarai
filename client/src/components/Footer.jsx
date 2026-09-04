import React from 'react';
import { Link } from 'react-router-dom';
import { Hammer, Phone, Mail, MapPin, Clock } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="container footer-grid">
        <div className="footer-col brand-col">
          <div className="brand-logo footer-logo">
            <div className="logo-icon"><Hammer size={24} /></div>
            <div className="brand-text">
              <span className="brand-name light">Vignesh</span>
              <span className="brand-sub light">Thachchupattarai</span>
            </div>
          </div>
          <p className="footer-tagline">
            Excellence in custom woodwork, traditional craftsmanship, and bespoke furniture solutions built to endure for generations.
          </p>
        </div>

        <div className="footer-col">
          <h4 className="footer-title">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Our Heritage</Link></li>
            <li><Link to="/services">Carpentry Services</Link></li>
            <li><Link to="/projects">Project Gallery</Link></li>
            <li><Link to="/contact">Get an Enquiry</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-title">Our Expertise</h4>
          <ul className="footer-links">
            <li>Solid Teak Wood Doors</li>
            <li>Modular Kitchen Cabinets</li>
            <li>Bespoke Dining Tables</li>
            <li>Wardrobes & Lofts</li>
            <li>Temple & Pooja Woodworks</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-title">Workshop Contact</h4>
          <ul className="footer-contact">
            <li><MapPin size={18} /><span>Kottapulipalayam road,Near Janani hospital,Dharapuram-638656</span></li>
            <li><Phone size={18} /><span>+91 97510 56924</span></li>
            <li><Mail size={18} /><span>adhandapani926@gmail.com</span></li>
            <li><Clock size={18} /><span>Mon - Sat: 8:30 AM - 7:30 PM</span></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container bottom-content">
          <p>© {new Date().getFullYear()} Vignesh Thachchupattarai. All rights reserved.</p>
          <Link to="/admin/login" className="admin-link">Master Access</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;