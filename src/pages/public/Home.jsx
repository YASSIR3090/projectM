import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Nav, Navbar, Modal } from 'react-bootstrap';
import { trackingService } from '../../services/tracking';
import { authService } from '../../services/auth';
import toast from 'react-hot-toast';
import Footer from '../../components/common/Footer';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
  easing: 'ease-in-out'
});

const Home = () => {
  const navigate = useNavigate();
  const [trackingNumber, setTrackingNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({ total: 0, delivered: 0, in_transit: 0, pending: 0 });
  const [statsLoading, setStatsLoading] = useState(true);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminError, setAdminError] = useState('');
  const [countUpStarted, setCountUpStarted] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      setStatsLoading(true);
      try {
        const response = await trackingService.getStats();
        setStats(response);
        // Start counter animation after stats load
        setTimeout(() => setCountUpStarted(true), 500);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setStats({ total: 0, delivered: 0, in_transit: 0, pending: 0 });
      } finally {
        setStatsLoading(false);
      }
    };
    fetchStats();
    
    // Refresh AOS on component mount
    AOS.refresh();
  }, []);

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!trackingNumber.trim()) {
      toast.error('Please enter a tracking number');
      return;
    }
    setIsLoading(true);
    try {
      const data = await trackingService.trackCargo(trackingNumber);
      navigate('/track', { state: { trackingData: data } });
    } catch (error) {
      toast.error(error.response?.data?.error || 'Cargo not found');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setAdminLoading(true);
    setAdminError('');
    
    try {
      await authService.login(adminUsername, adminPassword);
      toast.success('Login successful!');
      setShowAdminModal(false);
      navigate('/admin');
    } catch (error) {
      setAdminError(error.response?.data?.detail || 'Invalid username or password');
      toast.error('Login failed');
    } finally {
      setAdminLoading(false);
    }
  };

  const styles = {
    navbar: {
      backgroundColor: '#003366',
      padding: '12px 0',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
    },
    navbarBrand: {
      fontWeight: 'bold',
      fontSize: '1.4rem',
      color: 'white',
      textDecoration: 'none'
    },
    navLink: {
      color: 'rgba(255,255,255,0.85)',
      textDecoration: 'none',
      padding: '8px 16px',
      fontSize: '0.95rem'
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
      gap: '8px'
    },
    sectionBorder: {
      border: '3px solid #003366',
      borderRadius: '16px',
      padding: '30px 20px',
      marginBottom: '30px',
      backgroundColor: 'white',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
    },
    sectionBorderYellow: {
      border: '3px solid #ffc107',
      borderRadius: '16px',
      padding: '30px 20px',
      marginBottom: '30px',
      backgroundColor: '#f8f9fa',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
    },
    hero: {
      background: 'linear-gradient(135deg, #003366 0%, #0055a4 50%, #0077be 100%)',
      color: 'white',
      padding: '60px 0',
      borderRadius: '13px',
      position: 'relative',
      overflow: 'hidden'
    },
    heroTitle: {
      fontSize: '3rem',
      fontWeight: 'bold',
      marginBottom: '16px'
    },
    heroSubtitle: {
      fontSize: '1.1rem',
      opacity: 0.9,
      marginBottom: '24px'
    },
    heroBtnPrimary: {
      backgroundColor: '#ffc107',
      color: '#003366',
      padding: '12px 32px',
      borderRadius: '50px',
      fontWeight: '600',
      border: 'none',
      textDecoration: 'none'
    },
    heroBtnSecondary: {
      backgroundColor: 'transparent',
      color: 'white',
      padding: '12px 32px',
      borderRadius: '50px',
      fontWeight: '600',
      border: '2px solid rgba(255,255,255,0.5)',
      textDecoration: 'none',
      cursor: 'pointer'
    },
    trackCard: {
      boxShadow: '0 10px 40px rgba(0,0,0,0.25)',
      border: 'none',
      background: 'rgba(255,255,255,0.12)',
      backdropFilter: 'blur(15px)',
      borderRadius: '16px'
    },
    trackInput: {
      background: 'rgba(255,255,255,0.92)',
      border: 'none',
      padding: '12px 16px',
      borderRadius: '10px'
    },
    trackBtn: {
      padding: '12px',
      borderRadius: '10px',
      fontWeight: 'bold',
      backgroundColor: '#ffc107',
      color: '#003366',
      border: 'none',
      width: '100%'
    },
    statsCard: {
      border: '2px solid #003366',
      textAlign: 'center',
      padding: '20px 10px',
      borderRadius: '12px',
      backgroundColor: 'white',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    },
    statsNumber: {
      fontSize: '2.8rem',
      fontWeight: 'bold',
      color: '#003366',
      margin: '8px 0 4px'
    },
    statsLabel: {
      color: '#6c757d',
      margin: 0,
      fontSize: '0.95rem'
    },
    statsIcon: {
      fontSize: '2.8rem'
    },
    serviceCard: {
      border: '2px solid #003366',
      borderRadius: '12px',
      padding: '30px 20px',
      textAlign: 'center',
      height: '100%',
      backgroundColor: 'white',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    },
    serviceIcon: {
      fontSize: '3.5rem',
      color: '#003366',
      marginBottom: '16px'
    },
    serviceTitle: {
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#003366'
    },
    serviceText: {
      color: '#6c757d',
      margin: 0,
      fontSize: '0.95rem'
    },
    ctaSection: {
      background: 'linear-gradient(135deg, #003366 0%, #0055a4 100%)',
      color: 'white',
      padding: '50px 0',
      textAlign: 'center',
      borderRadius: '13px'
    },
    ctaBtn: {
      backgroundColor: '#ffc107',
      color: '#003366',
      padding: '14px 48px',
      borderRadius: '50px',
      fontWeight: 'bold',
      border: 'none',
      textDecoration: 'none',
      display: 'inline-block',
      cursor: 'pointer',
      transition: 'transform 0.3s ease'
    },
    adminQuickAccess: {
      backgroundColor: '#f8f9fa',
      borderRadius: '12px',
      padding: '10px 16px',
      border: '2px solid #ffc107',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      flexWrap: 'wrap'
    },
    adminQuickLink: {
      backgroundColor: 'white',
      padding: '5px 14px',
      borderRadius: '20px',
      fontSize: '0.85rem',
      color: '#495057',
      textDecoration: 'none',
      border: '1px solid #dee2e6',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    modalHeader: {
      backgroundColor: '#003366',
      color: 'white',
      borderBottom: 'none'
    },
    modalSubmitBtn: {
      width: '100%',
      padding: '12px',
      borderRadius: '10px',
      fontWeight: '600',
      backgroundColor: '#003366',
      color: 'white',
      border: 'none'
    },
    modalError: {
      color: '#dc3545',
      fontSize: '0.9rem',
      marginBottom: '12px'
    },
    modalDemoInfo: {
      marginTop: '16px',
      padding: '12px 16px',
      backgroundColor: '#f8f9fa',
      borderRadius: '10px',
      fontSize: '0.85rem',
      color: '#6c757d'
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <Navbar expand="lg" style={styles.navbar}>
        <Container>
          <Navbar.Brand as={Link} to="/" style={styles.navbarBrand}>
            <i className="bi bi-box-seam me-2"></i>
            Global Track Cargo
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ borderColor: 'rgba(255,255,255,0.3)' }}>
            <span style={{ color: 'white' }}>☰</span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center gap-1">
              <Nav.Link as={Link} to="/" style={styles.navLink}>Home</Nav.Link>
              <Nav.Link as={Link} to="/about" style={styles.navLink}>About</Nav.Link>
              <Nav.Link as={Link} to="/services" style={styles.navLink}>Services</Nav.Link>
              <Nav.Link as={Link} to="/track" style={styles.navLink}>Track</Nav.Link>
              <Nav.Link as={Link} to="/contact" style={styles.navLink}>Contact</Nav.Link>
              <button onClick={() => setShowAdminModal(true)} style={styles.adminBtn}>
                <i className="bi bi-shield-lock-fill"></i> Admin Login
              </button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* ADMIN QUICK ACCESS BAR */}
      <div style={{ backgroundColor: '#e9ecef', padding: '10px 0', borderBottom: '2px solid #ffc107' }}>
        <Container>
          <div style={styles.adminQuickAccess}>
            <span style={{ fontWeight: 'bold', color: '#003366' }}>
              <i className="bi bi-speedometer2 me-1"></i> 🔐 Quick Admin:
            </span>
            <button onClick={() => setShowAdminModal(true)} style={styles.adminQuickLink}>
              <i className="bi bi-box-arrow-in-right me-1"></i>Login
            </button>
            <Link to="/admin" style={styles.adminQuickLink}>Dashboard</Link>
            <Link to="/admin/cargo" style={styles.adminQuickLink}>Cargo</Link>
            <Link to="/admin/cargo/new" style={styles.adminQuickLink}>+ New</Link>
            <Link to="/admin/customers" style={styles.adminQuickLink}>Customers</Link>
            <Link to="/admin/messages" style={styles.adminQuickLink}>Messages</Link>
            <Link to="/admin/settings" style={styles.adminQuickLink}>Settings</Link>
          </div>
        </Container>
      </div>

      {/* ====== HERO SECTION WITH ANIMATION ====== */}
      <Container style={{ marginTop: '30px' }}>
        <div style={styles.sectionBorder} data-aos="fade-up">
          <div style={styles.hero}>
            <Container>
              <Row className="align-items-center">
                <Col lg={6} data-aos="fade-right" data-aos-delay="200">
                  <motion.h1 
                    style={styles.heroTitle}
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    Global Track Cargo
                  </motion.h1>
                  <motion.p 
                    style={styles.heroSubtitle}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    Real-time cargo tracking for international freight forwarding.
                    Track your shipments anywhere in the world.
                  </motion.p>
                  <motion.div 
                    style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <Link to="/track" style={styles.heroBtnPrimary}>
                      <i className="bi bi-search me-2"></i>Track Now
                    </Link>
                    <Link to="/services" style={styles.heroBtnSecondary}>
                      Learn More
                    </Link>
                    <button onClick={() => setShowAdminModal(true)} style={{ ...styles.heroBtnSecondary, borderColor: '#ffc107', color: '#ffc107' }}>
                      <i className="bi bi-shield-lock me-2"></i>Admin
                    </button>
                  </motion.div>
                </Col>
                <Col lg={6} style={{ marginTop: '30px' }} data-aos="fade-left" data-aos-delay="400">
                  <Card style={styles.trackCard}>
                    <Card.Body style={{ padding: '28px' }}>
                      <h4 style={{ color: 'white', marginBottom: '16px' }}>
                        <i className="bi bi-search me-2"></i>Track Your Cargo
                      </h4>
                      <Form onSubmit={handleTrack}>
                        <Form.Group style={{ marginBottom: '16px' }}>
                          <Form.Control
                            type="text"
                            placeholder="Enter Tracking Number (e.g., GTC202600001)"
                            value={trackingNumber}
                            onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
                            style={styles.trackInput}
                          />
                        </Form.Group>
                        <Button type="submit" disabled={isLoading} style={styles.trackBtn}>
                          {isLoading ? 'Tracking...' : <><i className="bi bi-search me-2"></i>Track Cargo</>}
                        </Button>
                      </Form>
                      <small style={{ color: 'rgba(255,255,255,0.7)', display: 'block', marginTop: '8px' }}>
                        Enter your tracking number to get real-time updates
                      </small>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </Container>

      {/* ====== STATS SECTION WITH COUNTER ANIMATION ====== */}
      <Container>
        <div style={styles.sectionBorderYellow} data-aos="fade-up" data-aos-delay="100">
          <h2 style={{ textAlign: 'center', fontWeight: 'bold', color: '#003366', marginBottom: '30px' }}>
            📊 Shipment Statistics
          </h2>
          <Row className="g-4">
            <Col md={3} sm={6} data-aos="zoom-in" data-aos-delay="200">
              <Card style={styles.statsCard}>
                <Card.Body>
                  <i className="bi bi-box-seam" style={{ ...styles.statsIcon, color: '#003366' }}></i>
                  <h3 style={styles.statsNumber}>
                    {countUpStarted && !statsLoading ? (
                      <CountUp end={stats.total} duration={2.5} separator="," />
                    ) : (
                      '0'
                    )}
                  </h3>
                  <p style={styles.statsLabel}>Total Shipments</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} sm={6} data-aos="zoom-in" data-aos-delay="300">
              <Card style={styles.statsCard}>
                <Card.Body>
                  <i className="bi bi-check-circle" style={{ ...styles.statsIcon, color: '#198754' }}></i>
                  <h3 style={styles.statsNumber}>
                    {countUpStarted && !statsLoading ? (
                      <CountUp end={stats.delivered} duration={2.5} separator="," />
                    ) : (
                      '0'
                    )}
                  </h3>
                  <p style={styles.statsLabel}>Delivered</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} sm={6} data-aos="zoom-in" data-aos-delay="400">
              <Card style={styles.statsCard}>
                <Card.Body>
                  <i className="bi bi-truck" style={{ ...styles.statsIcon, color: '#ffc107' }}></i>
                  <h3 style={styles.statsNumber}>
                    {countUpStarted && !statsLoading ? (
                      <CountUp end={stats.in_transit} duration={2.5} separator="," />
                    ) : (
                      '0'
                    )}
                  </h3>
                  <p style={styles.statsLabel}>In Transit</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} sm={6} data-aos="zoom-in" data-aos-delay="500">
              <Card style={styles.statsCard}>
                <Card.Body>
                  <i className="bi bi-clock-history" style={{ ...styles.statsIcon, color: '#dc3545' }}></i>
                  <h3 style={styles.statsNumber}>
                    {countUpStarted && !statsLoading ? (
                      <CountUp end={stats.pending} duration={2.5} separator="," />
                    ) : (
                      '0'
                    )}
                  </h3>
                  <p style={styles.statsLabel}>Pending</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>

      {/* ====== SERVICES SECTION ====== */}
      <Container>
        <div style={styles.sectionBorder} data-aos="fade-up">
          <h2 style={{ textAlign: 'center', fontWeight: 'bold', color: '#003366', marginBottom: '30px' }}>
            🌟 Our Services
          </h2>
          <Row className="g-4">
            <Col md={4} data-aos="fade-right" data-aos-delay="200">
              <Card style={styles.serviceCard}>
                <Card.Body>
                  <i className="bi bi-globe2" style={styles.serviceIcon}></i>
                  <h5 style={styles.serviceTitle}>International Shipping</h5>
                  <p style={styles.serviceText}>Global freight forwarding services across all continents with reliable transit times.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} data-aos="fade-up" data-aos-delay="300">
              <Card style={styles.serviceCard}>
                <Card.Body>
                  <i className="bi bi-search" style={styles.serviceIcon}></i>
                  <h5 style={styles.serviceTitle}>Real-time Tracking</h5>
                  <p style={styles.serviceText}>Track your cargo in real-time with detailed status updates at every step.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} data-aos="fade-left" data-aos-delay="400">
              <Card style={styles.serviceCard}>
                <Card.Body>
                  <i className="bi bi-shield-check" style={styles.serviceIcon}></i>
                  <h5 style={styles.serviceTitle}>Secure & Reliable</h5>
                  <p style={styles.serviceText}>Your cargo is insured and handled with the highest security standards.</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>

      {/* ====== CTA SECTION ====== */}
      <Container>
        <div style={styles.sectionBorderYellow} data-aos="zoom-in">
          <div style={styles.ctaSection}>
            <Container>
              <motion.h2 
                style={{ marginBottom: '8px' }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                🚀 Ready to Ship?
              </motion.h2>
              <motion.p 
                style={{ opacity: 0.8, marginBottom: '20px', fontSize: '1.1rem' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Experience seamless cargo tracking and management
              </motion.p>
              <motion.div 
                style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link to="/contact" style={styles.ctaBtn}>Contact Us Today</Link>
                <button onClick={() => setShowAdminModal(true)} style={{ ...styles.ctaBtn, backgroundColor: 'white', color: '#003366' }}>
                  <i className="bi bi-shield-lock me-2"></i>Admin Login
                </button>
              </motion.div>
            </Container>
          </div>
        </div>
      </Container>

      <Footer />

      {/* ADMIN LOGIN MODAL */}
      <Modal show={showAdminModal} onHide={() => setShowAdminModal(false)} centered>
        <Modal.Header closeButton style={styles.modalHeader}>
          <Modal.Title>
            <i className="bi bi-shield-lock-fill me-2"></i>
            Admin Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {adminError && (
            <div style={styles.modalError}>
              <i className="bi bi-exclamation-circle me-2"></i>
              {adminError}
            </div>
          )}
          <Form onSubmit={handleAdminLogin}>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: '500' }}>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
                style={{ borderRadius: '10px', padding: '10px 14px', border: '2px solid #e9ecef' }}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: '500' }}>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                style={{ borderRadius: '10px', padding: '10px 14px', border: '2px solid #e9ecef' }}
                required
              />
            </Form.Group>
            <Button type="submit" disabled={adminLoading} style={styles.modalSubmitBtn}>
              {adminLoading ? (
                <><span className="spinner-border spinner-border-sm me-2"></span>Logging in...</>
              ) : (
                <><i className="bi bi-box-arrow-in-right me-2"></i>Login</>
              )}
            </Button>
          </Form>
          <div style={styles.modalDemoInfo}>
            <strong>Demo Credentials:</strong><br />
            Username: <strong>admin</strong> | Password: <strong>admin123</strong>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Home;