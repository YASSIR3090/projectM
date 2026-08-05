import React, { useState } from 'react';
import { Navbar, Nav, Container, Offcanvas } from 'react-bootstrap';
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
      padding: '4px 8px',
      backgroundColor: 'transparent'
    },
    togglerIcon: {
      color: 'white',
      fontSize: '1.8rem',
      fontWeight: '300'
    },

    // ===== OFFCANVAS - KUSHOTO (LEFT) =====
    offcanvas: {
      backgroundColor: '#003366',
      color: 'white',
      width: '280px'
    },
    offcanvasHeader: {
      backgroundColor: '#003366',
      color: 'white',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      padding: '16px 20px'
    },
    offcanvasTitle: {
      fontWeight: 'bold',
      color: 'white',
      fontSize: '1.1rem'
    },
    offcanvasClose: {
      color: 'white',
      opacity: 0.8,
      border: 'none',
      background: 'none',
      fontSize: '1.5rem',
      padding: '0 8px'
    },
    offcanvasBody: {
      padding: '16px 0',
      backgroundColor: '#003366'
    },
    offcanvasNav: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2px',
      padding: '0'
    },
    offcanvasLink: {
      fontSize: '1rem',
      color: 'rgba(255,255,255,0.85)',
      textDecoration: 'none',
      padding: '12px 20px',
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      borderLeft: '3px solid transparent'
    },
    offcanvasLinkActive: {
      backgroundColor: 'rgba(255,255,255,0.08)',
      color: 'white',
      borderLeftColor: '#ffc107'
    },
    offcanvasDivider: {
      borderColor: 'rgba(255,255,255,0.08)',
      margin: '8px 16px'
    },
    offcanvasBtn: {
      width: 'calc(100% - 32px)',
      margin: '8px 16px',
      borderRadius: '50px',
      padding: '12px',
      backgroundColor: '#ffc107',
      color: '#003366',
      border: 'none',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      textDecoration: 'none',
      transition: 'all 0.3s ease'
    },
    offcanvasBrand: {
      color: 'white',
      textDecoration: 'none',
      fontWeight: 'bold',
      fontSize: '1.1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    offcanvasIcon: {
      fontSize: '1.2rem',
      width: '24px',
      textAlign: 'center'
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
          
          {/* Toggle Button - Inafungua Offcanvas kutoka Kushoto */}
          <button 
            onClick={() => setShowOffcanvas(true)} 
            style={navbarStyles.toggler}
            aria-label="Toggle navigation"
          >
            <span style={navbarStyles.togglerIcon}>☰</span>
          </button>
          
          {/* Desktop Menu - Inaonekana kwenye screen kubwa tu */}
          <div className="d-none d-lg-flex align-items-center gap-1">
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
          </div>
        </Container>
      </Navbar>

      {/* ===== OFFCANVAS - SIDEBAR KUSHOTO (LEFT) ===== */}
      <Offcanvas 
        show={showOffcanvas} 
        onHide={() => setShowOffcanvas(false)} 
        placement="start"  // <--- HII NI KUSHOTO (LEFT)
        style={navbarStyles.offcanvas}
      >
        <Offcanvas.Header style={navbarStyles.offcanvasHeader}>
          <Link to="/" style={navbarStyles.offcanvasBrand} onClick={() => setShowOffcanvas(false)}>
            <i className="bi bi-box-seam"></i>
            Global Track
          </Link>
          <button 
            onClick={() => setShowOffcanvas(false)} 
            style={navbarStyles.offcanvasClose}
          >
            ✕
          </button>
        </Offcanvas.Header>
        
        <Offcanvas.Body style={navbarStyles.offcanvasBody}>
          <Nav className="flex-column" style={navbarStyles.offcanvasNav}>
            <Link 
              to="/" 
              style={navbarStyles.offcanvasLink} 
              onClick={() => setShowOffcanvas(false)}
            >
              <i className="bi bi-house" style={navbarStyles.offcanvasIcon}></i>
              Home
            </Link>
            <Link 
              to="/about" 
              style={navbarStyles.offcanvasLink} 
              onClick={() => setShowOffcanvas(false)}
            >
              <i className="bi bi-info-circle" style={navbarStyles.offcanvasIcon}></i>
              About
            </Link>
            <Link 
              to="/services" 
              style={navbarStyles.offcanvasLink} 
              onClick={() => setShowOffcanvas(false)}
            >
              <i className="bi bi-grid" style={navbarStyles.offcanvasIcon}></i>
              Services
            </Link>
            <Link 
              to="/track" 
              style={navbarStyles.offcanvasLink} 
              onClick={() => setShowOffcanvas(false)}
            >
              <i className="bi bi-search" style={navbarStyles.offcanvasIcon}></i>
              Track
            </Link>
            <Link 
              to="/contact" 
              style={navbarStyles.offcanvasLink} 
              onClick={() => setShowOffcanvas(false)}
            >
              <i className="bi bi-envelope" style={navbarStyles.offcanvasIcon}></i>
              Contact
            </Link>
            
            <hr style={navbarStyles.offcanvasDivider} />
            
            <Link 
              to="/admin-login" 
              style={navbarStyles.offcanvasBtn} 
              onClick={() => setShowOffcanvas(false)}
            >
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