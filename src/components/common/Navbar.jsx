import React, { useState } from 'react';
import { Navbar, Nav, Container, Button, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MainNavbar = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const navbarStyles = {
    navbar: {
      backgroundColor: '#003366',
      padding: '12px 0',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
    },
    brand: {
      fontWeight: 'bold',
      fontSize: '1.2rem',
      color: 'white',
      textDecoration: 'none'
    },
    brandIcon: {
      marginRight: '8px'
    },
    navLink: {
      color: 'rgba(255,255,255,0.85)',
      textDecoration: 'none',
      padding: '8px 16px',
      fontSize: '0.95rem',
      transition: 'color 0.2s'
    },
    navLinkHover: {
      color: 'white'
    },
    contactBtn: {
      backgroundColor: '#ffc107',
      color: '#003366',
      padding: '8px 20px',
      borderRadius: '50px',
      fontWeight: '600',
      border: 'none',
      textDecoration: 'none',
      marginLeft: '8px',
      transition: 'all 0.3s ease'
    },
    adminBtn: {
      backgroundColor: '#ffc107',
      color: '#003366',
      padding: '8px 20px',
      borderRadius: '50px',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      transition: 'all 0.3s ease',
      textDecoration: 'none'
    },
    toggler: {
      border: 'none',
      padding: '4px 8px'
    },
    togglerIcon: {
      color: 'white',
      fontSize: '1.8rem',
      fontWeight: '300'
    },
    // Offcanvas styles - MUHIMU SANA!
    offcanvas: {
      backgroundColor: '#003366', // Rangi moja na navbar
      color: 'white'
    },
    offcanvasHeader: {
      backgroundColor: '#003366',
      color: 'white',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      padding: '16px 20px'
    },
    offcanvasTitle: {
      fontWeight: 'bold',
      color: 'white'
    },
    offcanvasClose: {
      color: 'white',
      opacity: 0.8,
      border: 'none',
      background: 'none',
      fontSize: '1.5rem'
    },
    offcanvasBody: {
      padding: '20px',
      backgroundColor: '#003366' // Rangi moja na navbar
    },
    offcanvasNav: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px'
    },
    offcanvasLink: {
      fontSize: '1.05rem',
      color: 'rgba(255,255,255,0.85)',
      textDecoration: 'none',
      padding: '12px 16px',
      borderRadius: '8px',
      transition: 'background 0.2s',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    offcanvasLinkHover: {
      backgroundColor: 'rgba(255,255,255,0.1)',
      color: 'white'
    },
    offcanvasBtn: {
      width: '100%',
      marginTop: '8px',
      borderRadius: '50px',
      padding: '12px',
      backgroundColor: '#ffc107',
      color: '#003366',
      border: 'none',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    },
    offcanvasDivider: {
      borderColor: 'rgba(255,255,255,0.1)',
      margin: '12px 0'
    }
  };

  return (
    <>
      <Navbar expand="lg" style={navbarStyles.navbar} className="shadow-sm">
        <Container>
          <Link to="/" style={navbarStyles.brand}>
            <i className="bi bi-box-seam" style={navbarStyles.brandIcon}></i>
            Global Track Cargo
          </Link>
          
          <Navbar.Toggle 
            aria-controls="main-navbar" 
            onClick={() => setShowOffcanvas(true)}
            style={navbarStyles.toggler}
          >
            <span style={navbarStyles.togglerIcon}>☰</span>
          </Navbar.Toggle>
          
          <Navbar.Collapse id="main-navbar">
            <Nav className="ms-auto align-items-center gap-1">
              <Link to="/" style={navbarStyles.navLink}>Home</Link>
              <Link to="/about" style={navbarStyles.navLink}>About</Link>
              <Link to="/services" style={navbarStyles.navLink}>Services</Link>
              <Link to="/track" style={navbarStyles.navLink}>
                <i className="bi bi-search me-1"></i>Track
              </Link>
              <Link to="/contact" style={navbarStyles.contactBtn}>
                Contact
              </Link>
              <Link to="/admin-login" style={navbarStyles.adminBtn}>
                <i className="bi bi-shield-lock-fill"></i>
                Admin
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* OFF CANVAS - MOBILE MENU - RANGI MOJA NA NAVBAR */}
      <Offcanvas 
        show={showOffcanvas} 
        onHide={() => setShowOffcanvas(false)} 
        placement="end"
        style={navbarStyles.offcanvas}
      >
        <Offcanvas.Header style={navbarStyles.offcanvasHeader}>
          <Offcanvas.Title style={navbarStyles.offcanvasTitle}>
            <i className="bi bi-box-seam me-2"></i>
            Global Track
          </Offcanvas.Title>
          <button 
            onClick={() => setShowOffcanvas(false)} 
            style={navbarStyles.offcanvasClose}
          >
            ✕
          </button>
        </Offcanvas.Header>
        <Offcanvas.Body style={navbarStyles.offcanvasBody}>
          <Nav className="flex-column" style={navbarStyles.offcanvasNav}>
            <Link to="/" style={navbarStyles.offcanvasLink} onClick={() => setShowOffcanvas(false)}>
              <i className="bi bi-house"></i> Home
            </Link>
            <Link to="/about" style={navbarStyles.offcanvasLink} onClick={() => setShowOffcanvas(false)}>
              <i className="bi bi-info-circle"></i> About
            </Link>
            <Link to="/services" style={navbarStyles.offcanvasLink} onClick={() => setShowOffcanvas(false)}>
              <i className="bi bi-grid"></i> Services
            </Link>
            <Link to="/track" style={navbarStyles.offcanvasLink} onClick={() => setShowOffcanvas(false)}>
              <i className="bi bi-search"></i> Track
            </Link>
            <Link to="/contact" style={navbarStyles.offcanvasLink} onClick={() => setShowOffcanvas(false)}>
              <i className="bi bi-envelope"></i> Contact
            </Link>
            
            <hr style={navbarStyles.offcanvasDivider} />
            
            <Link to="/admin-login" style={navbarStyles.offcanvasBtn} onClick={() => setShowOffcanvas(false)}>
              <i className="bi bi-shield-lock-fill"></i>
              Admin Login
            </Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default MainNavbar;