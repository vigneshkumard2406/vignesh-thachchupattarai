// client/src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Hammer, Menu, X, PhoneCall, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="navbar-wrapper">
      <div className="container nav-container">
        <Link to="/" className="brand-logo" onClick={closeMenu}>
          <div className="logo-icon">
            <Hammer size={24} />
          </div>
          <div className="brand-text">
            <span className="brand-name">Vignesh</span>
            <span className="brand-sub">Thachchupattarai</span>
          </div>
        </Link>

        <nav className={`nav-links ${isOpen ? 'active' : ''}`}>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')} onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')} onClick={closeMenu}>
            About Us
          </NavLink>
          <NavLink to="/services" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')} onClick={closeMenu}>
            Services
          </NavLink>
          <NavLink to="/projects" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')} onClick={closeMenu}>
            Our Work
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')} onClick={closeMenu}>
            Contact
          </NavLink>
          <Link to="/contact" className="mobile-cta btn-primary" onClick={closeMenu}>
            Get Free Quote
          </Link>
        </nav>

        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          {/* Dark / Light Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            style={{
              background: 'var(--wood-cream)',
              border: '1px solid var(--border-color)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              transition: 'all 0.2s ease',
              flexShrink: 0,
            }}
          >
            {theme === 'light' ? <Moon size={19} /> : <Sun size={19} color="#ffb74d" />}
          </button>

          {/* Direct Phone Call */}
          <a href="tel:+919751056924" className="nav-phone">
            <PhoneCall size={18} />
            <span>+91 97510 56924</span>
          </a>

          {/* Mobile Hamburger Menu */}
          <button className="mobile-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;