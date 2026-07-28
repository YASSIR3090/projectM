import React, { useState } from 'react';
import { Container, Navbar, Nav, Dropdown, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Sidebar from './Sidebar';

const AdminLayout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin-login');
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      
      <div className="flex-grow-1" style={{ background: '#f4f6f9' }}>
        <Navbar bg="white" className="shadow-sm px-4 py-2 sticky-top">
          <div className="d-flex align-items-center w-100">
            <Button
              variant="link"
              className="text-dark me-3 p-0"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <i className={`bi ${sidebarCollapsed ? 'bi-list' : 'bi-x'} fs-4`}></i>
            </Button>
            
            <h5 className="mb-0 flex-grow-1">Global Track Cargo</h5>
            
            <div className="d-flex align-items-center">
              <Dropdown align="end">
                <Dropdown.Toggle as={Button} variant="link" className="text-dark p-0 border-0">
                  <div className="d-flex align-items-center">
                    {user?.profile_picture ? (
                      <img
                        src={`http://localhost:8000${user.profile_picture}`}
                        alt="Profile"
                        style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                    ) : (
                      <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                           style={{ width: '36px', height: '36px' }}>
                        {user?.first_name?.[0] || user?.username?.[0] || 'A'}
                      </div>
                    )}
                    <span className="ms-2 d-none d-sm-inline">
                      {user?.first_name || user?.username}
                    </span>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/admin/profile">
                    <i className="bi bi-person me-2"></i>Profile
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/admin/settings">
                    <i className="bi bi-gear me-2"></i>Settings
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout} className="text-danger">
                    <i className="bi bi-box-arrow-right me-2"></i>Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </Navbar>

        <Container fluid className="p-4">
          {children}
        </Container>
      </div>
    </div>
  );
};

export default AdminLayout;
