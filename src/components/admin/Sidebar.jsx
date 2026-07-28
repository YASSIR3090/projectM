import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ collapsed }) => {
  const menuItems = [
    { path: '/admin', icon: 'bi-grid-1x2', label: 'Dashboard' },
    { path: '/admin/cargo', icon: 'bi-box-seam', label: 'Cargo Management' },
    { path: '/admin/customers', icon: 'bi-people', label: 'Customers' },
    { path: '/admin/messages', icon: 'bi-envelope', label: 'Messages' },
    { path: '/admin/settings', icon: 'bi-gear', label: 'Settings' },
    { path: '/admin/profile', icon: 'bi-person', label: 'Profile' },
  ];

  return (
    <div className={`bg-dark text-white vh-100 sticky-top ${collapsed ? 'sidebar-collapsed' : ''}`}
         style={{ width: collapsed ? '70px' : '250px', transition: 'width 0.3s', flexShrink: 0 }}>
      <div className="d-flex align-items-center justify-content-center p-3 border-bottom border-secondary">
        {!collapsed ? (
          <h5 className="mb-0">
            <i className="bi bi-box-seam me-2"></i>
            Cargo Track
          </h5>
        ) : (
          <i className="bi bi-box-seam fs-4"></i>
        )}
      </div>

      <Nav className="flex-column p-2">
        {menuItems.map((item) => (
          <Nav.Item key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `nav-link text-white px-3 py-2 rounded mb-1 ${isActive ? 'bg-primary' : ''}`
              }
              style={{ 
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'background 0.2s',
              }}
            >
              <i className={`bi ${item.icon} fs-5`}></i>
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          </Nav.Item>
        ))}
      </Nav>
    </div>
  );
};

export default Sidebar;
