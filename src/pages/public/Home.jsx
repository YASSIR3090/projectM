import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { trackingService } from '../../services/tracking';
import toast from 'react-hot-toast';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

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
  const [countUpStarted, setCountUpStarted] = useState(false);

  // Hero Slider Images
  const heroSlides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=600&fit=crop',
      title: 'Global Cargo Shipping',
      subtitle: 'Reliable freight forwarding services across the world',
      buttonText: 'Track Now',
      buttonLink: '/track'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1200&h=600&fit=crop',
      title: 'Real-Time Tracking',
      subtitle: 'Monitor your shipments anywhere, anytime',
      buttonText: 'Learn More',
      buttonLink: '/services'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1566577134770-3c85bb3d3ad4?w=1200&h=600&fit=crop',
      title: 'Secure & Reliable',
      subtitle: 'Your cargo is insured and handled with care',
      buttonText: 'Contact Us',
      buttonLink: '/contact'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1543080853-556086153871?w=1200&h=600&fit=crop',
      title: 'International Shipping',
      subtitle: 'Shipping to 50+ countries worldwide',
      buttonText: 'Get Started',
      buttonLink: '/services'
    }
  ];

  useEffect(() => {
    const fetchStats = async () => {
      setStatsLoading(true);
      try {
        const response = await trackingService.getStats();
        setStats(response);
        setTimeout(() => setCountUpStarted(true), 500);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setStats({ total: 0, delivered: 0, in_transit: 0, pending: 0 });
      } finally {
        setStatsLoading(false);
      }
    };
    fetchStats();
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

  // Styles
  const styles = {
    heroSlider: {
      height: '600px',
      width: '100%',
      position: 'relative',
      overflow: 'hidden'
    },
    slideContent: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      color: 'white',
      zIndex: 10,
      width: '80%',
      maxWidth: '800px'
    },
    slideTitle: {
      fontSize: '3.5rem',
      fontWeight: 'bold',
      textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
      marginBottom: '16px'
    },
    slideSubtitle: {
      fontSize: '1.3rem',
      textShadow: '1px 1px 4px rgba(0,0,0,0.5)',
      marginBottom: '24px',
      opacity: 0.9
    },
    slideOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, rgba(0,51,102,0.7) 0%, rgba(0,85,164,0.5) 100%)',
      zIndex: 5
    },
    slideImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    slideBtn: {
      backgroundColor: '#ffc107',
      color: '#003366',
      padding: '14px 40px',
      borderRadius: '50px',
      fontWeight: '600',
      border: 'none',
      textDecoration: 'none',
      fontSize: '1.1rem',
      transition: 'all 0.3s ease',
      display: 'inline-block'
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
    }
  };

  return (
    <>
      <Navbar />

      {/* ====== HERO SLIDER SECTION ====== */}
      <section style={styles.heroSlider} data-aos="fade-in">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          effect="fade"
          loop={true}
          style={{ height: '100%', width: '100%' }}
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={slide.id}>
              <div style={{ position: 'relative', height: '100%', width: '100%' }}>
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  style={styles.slideImage}
                />
                <div style={styles.slideOverlay}></div>
                
                {/* Slide Content with Animation */}
                <div style={styles.slideContent}>
                  <motion.h1 
                    style={styles.slideTitle}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.p 
                    style={styles.slideSubtitle}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    {slide.subtitle}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <Link to={slide.buttonLink} style={styles.slideBtn}>
                      {slide.buttonText}
                    </Link>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ====== TRACKING SECTION ====== */}
      <section style={{ padding: '40px 0', backgroundColor: '#f8f9fa' }} data-aos="fade-up">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <Card style={styles.trackCard}>
                <Card.Body style={{ padding: '32px' }}>
                  <h4 style={{ color: '#003366', marginBottom: '16px', fontWeight: 'bold' }}>
                    <i className="bi bi-search me-2"></i>
                    Track Your Cargo
                  </h4>
                  <Form onSubmit={handleTrack}>
                    <Row className="g-3">
                      <Col md={9}>
                        <Form.Control
                          type="text"
                          placeholder="Enter Tracking Number (e.g., GTC202600001)"
                          value={trackingNumber}
                          onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
                          style={styles.trackInput}
                        />
                      </Col>
                      <Col md={3}>
                        <Button
                          type="submit"
                          disabled={isLoading}
                          style={styles.trackBtn}
                        >
                          {isLoading ? 'Tracking...' : <><i className="bi bi-search me-2"></i>Track</>}
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                  <small style={{ color: '#6c757d', display: 'block', marginTop: '12px' }}>
                    Enter your tracking number to get real-time updates
                  </small>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ====== STATS SECTION WITH COUNTER ====== */}
      <section style={{ padding: '60px 0', backgroundColor: 'white' }} data-aos="fade-up">
        <Container>
          <h2 style={{ textAlign: 'center', fontWeight: 'bold', color: '#003366', marginBottom: '40px' }}>
            📊 Shipment Statistics
          </h2>
          <Row className="g-4">
            <Col md={3} sm={6} data-aos="zoom-in" data-aos-delay="100">
              <Card style={styles.statsCard}>
                <Card.Body>
                  <i className="bi bi-box-seam" style={{ ...styles.statsIcon, color: '#003366' }}></i>
                  <h3 style={styles.statsNumber}>
                    {countUpStarted && !statsLoading ? (
                      <CountUp end={stats.total} duration={2.5} separator="," />
                    ) : '0'}
                  </h3>
                  <p style={styles.statsLabel}>Total Shipments</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} sm={6} data-aos="zoom-in" data-aos-delay="200">
              <Card style={styles.statsCard}>
                <Card.Body>
                  <i className="bi bi-check-circle" style={{ ...styles.statsIcon, color: '#198754' }}></i>
                  <h3 style={styles.statsNumber}>
                    {countUpStarted && !statsLoading ? (
                      <CountUp end={stats.delivered} duration={2.5} separator="," />
                    ) : '0'}
                  </h3>
                  <p style={styles.statsLabel}>Delivered</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} sm={6} data-aos="zoom-in" data-aos-delay="300">
              <Card style={styles.statsCard}>
                <Card.Body>
                  <i className="bi bi-truck" style={{ ...styles.statsIcon, color: '#ffc107' }}></i>
                  <h3 style={styles.statsNumber}>
                    {countUpStarted && !statsLoading ? (
                      <CountUp end={stats.in_transit} duration={2.5} separator="," />
                    ) : '0'}
                  </h3>
                  <p style={styles.statsLabel}>In Transit</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} sm={6} data-aos="zoom-in" data-aos-delay="400">
              <Card style={styles.statsCard}>
                <Card.Body>
                  <i className="bi bi-clock-history" style={{ ...styles.statsIcon, color: '#dc3545' }}></i>
                  <h3 style={styles.statsNumber}>
                    {countUpStarted && !statsLoading ? (
                      <CountUp end={stats.pending} duration={2.5} separator="," />
                    ) : '0'}
                  </h3>
                  <p style={styles.statsLabel}>Pending</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ====== SERVICES SECTION ====== */}
      <section style={{ padding: '60px 0', backgroundColor: '#f8f9fa' }} data-aos="fade-up">
        <Container>
          <h2 style={{ textAlign: 'center', fontWeight: 'bold', color: '#003366', marginBottom: '40px' }}>
            🌟 Our Services
          </h2>
          <Row className="g-4">
            <Col md={4} data-aos="fade-right" data-aos-delay="100">
              <Card style={styles.serviceCard}>
                <Card.Body>
                  <i className="bi bi-globe2" style={styles.serviceIcon}></i>
                  <h5 style={styles.serviceTitle}>International Shipping</h5>
                  <p style={styles.serviceText}>Global freight forwarding services across all continents with reliable transit times.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} data-aos="fade-up" data-aos-delay="200">
              <Card style={styles.serviceCard}>
                <Card.Body>
                  <i className="bi bi-search" style={styles.serviceIcon}></i>
                  <h5 style={styles.serviceTitle}>Real-time Tracking</h5>
                  <p style={styles.serviceText}>Track your cargo in real-time with detailed status updates at every step.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} data-aos="fade-left" data-aos-delay="300">
              <Card style={styles.serviceCard}>
                <Card.Body>
                  <i className="bi bi-shield-check" style={styles.serviceIcon}></i>
                  <h5 style={styles.serviceTitle}>Secure & Reliable</h5>
                  <p style={styles.serviceText}>Your cargo is insured and handled with the highest security standards.</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ====== CTA SECTION ====== */}
      <section style={{ 
        background: 'linear-gradient(135deg, #003366 0%, #0055a4 100%)',
        color: 'white',
        padding: '60px 0',
        textAlign: 'center'
      }} data-aos="zoom-in">
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
            style={{ opacity: 0.8, marginBottom: '24px', fontSize: '1.1rem' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Experience seamless cargo tracking and management
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button as={Link} to="/contact" variant="light" size="lg" className="rounded-pill px-5">
              Contact Us Today
            </Button>
          </motion.div>
        </Container>
      </section>

      <Footer />
    </>
  );
};

export default Home;