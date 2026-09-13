import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Wrench, FolderKanban, MessageSquareDot, LogOut, Hammer, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
//import './AdminLayout.css';

const AdminLayout = () => {
  const { logout, admin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-wrapper">
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <div className="logo-icon"><Hammer size={20} /></div>
          <div>
            <h3>Vignesh</h3>
            <span>Master Admin</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/admin" end className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/admin/services" className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}>
            <Wrench size={18} />
            <span>Services</span>
          </NavLink>
          <NavLink to="/admin/projects" className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}>
            <FolderKanban size={18} />
            <span>Projects</span>
          </NavLink>
          <NavLink to="/admin/enquiries" className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}>
            <MessageSquareDot size={18} />
            <span>Enquiries</span>
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <a href="/" target="_blank" rel="noreferrer" className="sidebar-link">
            <ExternalLink size={18} />
            <span>Visit Live Site</span>
          </a>
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <div className="admin-body">
        <header className="admin-header">
          <h2>Workshop Management Console</h2>
          <div className="user-badge">
            Logged in: <strong>{admin?.username || 'Admin'}</strong>
          </div>
        </header>

        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;