import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { trackingService } from '../../services/tracking';
import toast from 'react-hot-toast';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

const Home = () => {
  const navigate = useNavigate();
  const [trackingNumber, setTrackingNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({ total: 0, delivered: 0, in_transit: 0, pending: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await trackingService.getStats();
        setStats(response);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
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

  return (
    <>
      <Navbar />
      <section className="hero-section" style={{
        background: 'linear-gradient(135deg, #003366 0%, #0055a4 50%, #0077be 100%)',
        color: 'white',
        padding: '100px 0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{
          background: 'url(/api/placeholder/1920/800) center/cover',
          opacity: 0.1,
        }} />
        <Container className="position-relative" style={{ zIndex: 1 }}>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="display-3 fw-bold mb-4">
                Global Track Cargo
              </h1>
              <p className="lead mb-4" style={{ fontSize: '1.25rem', opacity: 0.9 }}>
                Real-time cargo tracking for international freight forwarding.
                Track your shipments anywhere in the world.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Button as={Link} to="/track" variant="light" size="lg" className="rounded-pill px-4">
                  Track Now
                </Button>
                <Button as={Link} to="/services" variant="outline-light" size="lg" className="rounded-pill px-4">
                  Learn More
                </Button>
              </div>
            </Col>
            <Col lg={6} className="mt-4 mt-lg-0">
              <Card className="shadow-lg border-0" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                <Card.Body className="p-4">
                  <h4 className="text-white mb-3">Track Your Cargo</h4>
                  <Form onSubmit={handleTrack}>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Enter Tracking Number (e.g., GTC202600001)"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        style={{ 
                          background: 'rgba(255,255,255,0.9)',
                          border: 'none',
                          padding: '12px 16px',
                          borderRadius: '10px'
                        }}
                      />
                    </Form.Group>
                    <Button 
                      type="submit" 
                      variant="warning" 
                      className="w-100 fw-bold"
                      disabled={isLoading}
                      style={{ 
                        padding: '12px',
                        borderRadius: '10px',
                        fontSize: '1.1rem'
                      }}
                    >
                      {isLoading ? 'Tracking...' : <><i className="bi bi-search me-2"></i>Track Cargo</>}
                    </Button>
                  </Form>
                  <small className="text-light opacity-75 d-block mt-2">
                    Enter your tracking number to get real-time updates
                  </small>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5" style={{ background: '#f8f9fa' }}>
        <Container>
          <Row className="g-4">
            <Col md={3} sm={6}>
              <Card className="border-0 shadow-sm text-center h-100">
                <Card.Body>
                  <i className="bi bi-box-seam display-4 text-primary"></i>
                  <h3 className="mt-3 mb-0">{stats.total}</h3>
                  <p className="text-muted mb-0">Total Shipments</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} sm={6}>
              <Card className="border-0 shadow-sm text-center h-100">
                <Card.Body>
                  <i className="bi bi-check-circle display-4 text-success"></i>
                  <h3 className="mt-3 mb-0">{stats.delivered}</h3>
                  <p className="text-muted mb-0">Delivered</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} sm={6}>
              <Card className="border-0 shadow-sm text-center h-100">
                <Card.Body>
                  <i className="bi bi-truck display-4 text-warning"></i>
                  <h3 className="mt-3 mb-0">{stats.in_transit}</h3>
                  <p className="text-muted mb-0">In Transit</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} sm={6}>
              <Card className="border-0 shadow-sm text-center h-100">
                <Card.Body>
                  <i className="bi bi-clock-history display-4 text-danger"></i>
                  <h3 className="mt-3 mb-0">{stats.pending}</h3>
                  <p className="text-muted mb-0">Pending</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5">Our Services</h2>
          <Row className="g-4">
            <Col md={4}>
              <Card className="border-0 shadow-sm h-100 text-center p-4">
                <Card.Body>
                  <i className="bi bi-globe2 display-3 text-primary mb-3"></i>
                  <h5>International Shipping</h5>
                  <p className="text-muted">Global freight forwarding services across all continents with reliable transit times.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="border-0 shadow-sm h-100 text-center p-4">
                <Card.Body>
                  <i className="bi bi-search display-3 text-primary mb-3"></i>
                  <h5>Real-time Tracking</h5>
                  <p className="text-muted">Track your cargo in real-time with detailed status updates at every step of the journey.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="border-0 shadow-sm h-100 text-center p-4">
                <Card.Body>
                  <i className="bi bi-shield-check display-3 text-primary mb-3"></i>
                  <h5>Secure & Reliable</h5>
                  <p className="text-muted">Your cargo is insured and handled with the highest security standards and care.</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5" style={{ 
        background: 'linear-gradient(135deg, #003366 0%, #0055a4 100%)',
        color: 'white'
      }}>
        <Container className="text-center">
          <h2 className="mb-3">Ready to Ship?</h2>
          <p className="lead mb-4 opacity-75">Experience seamless cargo tracking and management</p>
          <Button as={Link} to="/contact" variant="light" size="lg" className="rounded-pill px-5">
            Contact Us Today
          </Button>
        </Container>
      </section>

      <Footer />
    </>
  );
};

export default Home;
