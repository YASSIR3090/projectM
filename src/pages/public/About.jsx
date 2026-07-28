import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

const About = () => {
  const aboutStyles = {
    page: {
      minHeight: '100vh',
      backgroundColor: '#f8f9fa'
    },
    hero: {
      background: 'linear-gradient(135deg, #003366 0%, #0055a4 50%, #0077be 100%)',
      color: 'white',
      padding: '80px 0',
      position: 'relative',
      overflow: 'hidden'
    },
    heroOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'url(/api/placeholder/1920/400) center/cover',
      opacity: 0.1
    },
    heroContent: {
      position: 'relative',
      zIndex: 1
    },
    heroTitle: {
      fontSize: '3rem',
      fontWeight: 'bold',
      marginBottom: '16px',
      textAlign: 'center'
    },
    heroSubtitle: {
      fontSize: '1.2rem',
      opacity: 0.9,
      textAlign: 'center',
      maxWidth: '700px',
      margin: '0 auto'
    },
    section: {
      padding: '60px 0'
    },
    sectionAlt: {
      padding: '60px 0',
      backgroundColor: 'white'
    },
    sectionTitle: {
      textAlign: 'center',
      marginBottom: '40px',
      fontWeight: 'bold'
    },
    sectionTitleUnderline: {
      width: '60px',
      height: '4px',
      backgroundColor: '#0d6efd',
      margin: '12px auto 0',
      borderRadius: '2px'
    },
    aboutCard: {
      border: 'none',
      boxShadow: '0 2px 15px rgba(0,0,0,0.08)',
      borderRadius: '12px',
      height: '100%',
      padding: '24px',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    },
    aboutCardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 30px rgba(0,0,0,0.15)'
    },
    aboutIcon: {
      fontSize: '2.5rem',
      color: '#0d6efd',
      marginBottom: '16px'
    },
    aboutTitle: {
      fontWeight: 'bold',
      marginBottom: '12px'
    },
    aboutText: {
      color: '#6c757d',
      lineHeight: '1.8',
      margin: 0
    },
    missionCard: {
      border: 'none',
      boxShadow: '0 2px 15px rgba(0,0,0,0.08)',
      borderRadius: '12px',
      height: '100%',
      padding: '32px',
      textAlign: 'center',
      transition: 'transform 0.3s ease'
    },
    missionIcon: {
      fontSize: '3rem',
      color: '#0d6efd',
      marginBottom: '16px'
    },
    missionTitle: {
      fontWeight: 'bold',
      marginBottom: '12px'
    },
    missionText: {
      color: '#6c757d',
      lineHeight: '1.8',
      margin: 0
    },
    statsCard: {
      border: 'none',
      boxShadow: '0 2px 15px rgba(0,0,0,0.08)',
      borderRadius: '12px',
      textAlign: 'center',
      padding: '24px',
      height: '100%'
    },
    statsNumber: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#0d6efd',
      marginBottom: '4px'
    },
    statsLabel: {
      color: '#6c757d',
      margin: 0,
      fontWeight: '500'
    },
    teamCard: {
      border: 'none',
      boxShadow: '0 2px 15px rgba(0,0,0,0.08)',
      borderRadius: '12px',
      textAlign: 'center',
      padding: '24px',
      height: '100%',
      transition: 'transform 0.3s ease'
    },
    teamImage: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      objectFit: 'cover',
      margin: '0 auto 16px',
      border: '4px solid #f8f9fa',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    teamName: {
      fontWeight: 'bold',
      marginBottom: '4px'
    },
    teamRole: {
      color: '#6c757d',
      margin: 0,
      fontSize: '0.9rem'
    },
    valuesList: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    valuesItem: {
      display: 'flex',
      alignItems: 'flex-start',
      padding: '12px 0',
      borderBottom: '1px solid #e9ecef'
    },
    valuesItemLast: {
      display: 'flex',
      alignItems: 'flex-start',
      padding: '12px 0',
      borderBottom: 'none'
    },
    valuesIcon: {
      color: '#0d6efd',
      fontSize: '1.25rem',
      marginRight: '12px',
      marginTop: '2px'
    },
    valuesTitle: {
      fontWeight: 'bold',
      marginBottom: '2px'
    },
    valuesText: {
      color: '#6c757d',
      margin: 0,
      fontSize: '0.95rem'
    },
    cta: {
      background: 'linear-gradient(135deg, #003366 0%, #0055a4 100%)',
      color: 'white',
      padding: '60px 0',
      textAlign: 'center'
    },
    ctaTitle: {
      marginBottom: '8px'
    },
    ctaSubtitle: {
      opacity: 0.75,
      marginBottom: '24px',
      fontSize: '1.1rem'
    },
    ctaBtn: {
      borderRadius: '50px',
      padding: '12px 48px',
      fontWeight: '500',
      backgroundColor: 'white',
      color: '#003366',
      border: 'none',
      textDecoration: 'none',
      display: 'inline-block',
      transition: 'all 0.3s ease'
    },
    ctaBtnHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 30px rgba(255,255,255,0.3)'
    }
  };

  return (
    <div style={aboutStyles.page}>
      <Navbar />

      {/* Hero Section */}
      <section style={aboutStyles.hero}>
        <div style={aboutStyles.heroOverlay} />
        <Container style={aboutStyles.heroContent}>
          <h1 style={aboutStyles.heroTitle}>About Us</h1>
          <p style={aboutStyles.heroSubtitle}>
            Learn more about Global Track Cargo - your trusted partner in international 
            freight forwarding and cargo tracking solutions.
          </p>
        </Container>
      </section>

      {/* Company Overview */}
      <section style={aboutStyles.section}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h2 style={{ fontWeight: 'bold', marginBottom: '16px' }}>
                Who We Are
              </h2>
              <div style={{ 
                width: '60px', 
                height: '4px', 
                backgroundColor: '#0d6efd', 
                marginBottom: '20px',
                borderRadius: '2px'
              }} />
              <p style={{ color: '#495057', lineHeight: '1.8', fontSize: '1.05rem' }}>
                Global Track Cargo is a premier international freight forwarding company 
                dedicated to providing seamless, reliable, and transparent cargo tracking 
                services worldwide.
              </p>
              <p style={{ color: '#6c757d', lineHeight: '1.8' }}>
                With years of experience in the logistics industry, we leverage cutting-edge 
                technology to ensure your shipments are tracked in real-time, giving you 
                peace of mind and complete visibility over your cargo.
              </p>
              <div style={{ display: 'flex', gap: '24px', marginTop: '24px' }}>
                <div>
                  <h4 style={{ color: '#0d6efd', fontWeight: 'bold', margin: 0 }}>10+</h4>
                  <p style={{ color: '#6c757d', margin: 0, fontSize: '0.9rem' }}>Years Experience</p>
                </div>
                <div>
                  <h4 style={{ color: '#0d6efd', fontWeight: 'bold', margin: 0 }}>50+</h4>
                  <p style={{ color: '#6c757d', margin: 0, fontSize: '0.9rem' }}>Countries Served</p>
                </div>
                <div>
                  <h4 style={{ color: '#0d6efd', fontWeight: 'bold', margin: 0 }}>10K+</h4>
                  <p style={{ color: '#6c757d', margin: 0, fontSize: '0.9rem' }}>Shipments Handled</p>
                </div>
              </div>
            </Col>
            <Col lg={6} style={{ marginTop: '24px' }}>
              <div style={{
                backgroundColor: '#f8f9fa',
                borderRadius: '12px',
                padding: '32px',
                boxShadow: '0 2px 15px rgba(0,0,0,0.05)'
              }}>
                <div style={{ display: 'grid', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      backgroundColor: 'rgba(13, 110, 253, 0.1)',
                      borderRadius: '50%',
                      padding: '10px',
                      width: '48px',
                      height: '48px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <i className="bi bi-globe2" style={{ fontSize: '1.5rem', color: '#0d6efd' }}></i>
                    </div>
                    <div>
                      <h6 style={{ fontWeight: 'bold', margin: 0 }}>Global Network</h6>
                      <p style={{ color: '#6c757d', margin: 0, fontSize: '0.9rem' }}>
                        Connected to 50+ countries worldwide
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      backgroundColor: 'rgba(13, 110, 253, 0.1)',
                      borderRadius: '50%',
                      padding: '10px',
                      width: '48px',
                      height: '48px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <i className="bi bi-shield-check" style={{ fontSize: '1.5rem', color: '#0d6efd' }}></i>
                    </div>
                    <div>
                      <h6 style={{ fontWeight: 'bold', margin: 0 }}>Secure & Reliable</h6>
                      <p style={{ color: '#6c757d', margin: 0, fontSize: '0.9rem' }}>
                        Fully insured and secure handling
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      backgroundColor: 'rgba(13, 110, 253, 0.1)',
                      borderRadius: '50%',
                      padding: '10px',
                      width: '48px',
                      height: '48px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <i className="bi bi-clock" style={{ fontSize: '1.5rem', color: '#0d6efd' }}></i>
                    </div>
                    <div>
                      <h6 style={{ fontWeight: 'bold', margin: 0 }}>24/7 Support</h6>
                      <p style={{ color: '#6c757d', margin: 0, fontSize: '0.9rem' }}>
                        Dedicated support team always available
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section style={aboutStyles.sectionAlt}>
        <Container>
          <h2 style={aboutStyles.sectionTitle}>
            Our Mission & Vision
            <div style={aboutStyles.sectionTitleUnderline} />
          </h2>
          <Row className="g-4">
            <Col md={6}>
              <Card style={aboutStyles.missionCard}>
                <Card.Body>
                  <i className="bi bi-bullseye" style={aboutStyles.missionIcon}></i>
                  <h4 style={aboutStyles.missionTitle}>Our Mission</h4>
                  <p style={aboutStyles.missionText}>
                    To provide reliable, transparent, and efficient cargo tracking solutions 
                    that empower businesses and individuals to monitor their shipments with 
                    confidence and ease.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card style={aboutStyles.missionCard}>
                <Card.Body>
                  <i className="bi bi-eye" style={aboutStyles.missionIcon}></i>
                  <h4 style={aboutStyles.missionTitle}>Our Vision</h4>
                  <p style={aboutStyles.missionText}>
                    To become the world's most trusted cargo tracking platform, revolutionizing 
                    the logistics industry through innovation, transparency, and customer-centric 
                    solutions.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Core Values */}
      <section style={aboutStyles.section}>
        <Container>
          <h2 style={aboutStyles.sectionTitle}>
            Our Core Values
            <div style={aboutStyles.sectionTitleUnderline} />
          </h2>
          <Row className="g-4">
            <Col lg={6}>
              <Card style={aboutStyles.aboutCard}>
                <Card.Body>
                  <i className="bi bi-check-circle" style={{ ...aboutStyles.aboutIcon, color: '#198754' }}></i>
                  <h5 style={aboutStyles.aboutTitle}>Integrity</h5>
                  <p style={aboutStyles.aboutText}>
                    We operate with complete transparency and honesty in all our dealings, 
                    ensuring trust and reliability in every shipment.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6}>
              <Card style={aboutStyles.aboutCard}>
                <Card.Body>
                  <i className="bi bi-star" style={{ ...aboutStyles.aboutIcon, color: '#ffc107' }}></i>
                  <h5 style={aboutStyles.aboutTitle}>Excellence</h5>
                  <p style={aboutStyles.aboutText}>
                    We strive for excellence in every aspect of our service, continuously 
                    improving to exceed customer expectations.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6}>
              <Card style={aboutStyles.aboutCard}>
                <Card.Body>
                  <i className="bi bi-people" style={{ ...aboutStyles.aboutIcon, color: '#0dcaf0' }}></i>
                  <h5 style={aboutStyles.aboutTitle}>Customer First</h5>
                  <p style={aboutStyles.aboutText}>
                    Our customers are at the heart of everything we do. We prioritize their 
                    needs and ensure their satisfaction.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6}>
              <Card style={aboutStyles.aboutCard}>
                <Card.Body>
                  <i className="bi bi-rocket" style={{ ...aboutStyles.aboutIcon, color: '#6f42c1' }}></i>
                  <h5 style={aboutStyles.aboutTitle}>Innovation</h5>
                  <p style={aboutStyles.aboutText}>
                    We embrace technology and innovation to provide cutting-edge tracking 
                    solutions that simplify logistics.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Statistics */}
      <section style={aboutStyles.sectionAlt}>
        <Container>
          <h2 style={aboutStyles.sectionTitle}>
            Our Impact in Numbers
            <div style={aboutStyles.sectionTitleUnderline} />
          </h2>
          <Row className="g-4">
            <Col md={3} sm={6}>
              <Card style={aboutStyles.statsCard}>
                <Card.Body>
                  <h3 style={aboutStyles.statsNumber}>10,000+</h3>
                  <p style={aboutStyles.statsLabel}>Shipments Delivered</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} sm={6}>
              <Card style={aboutStyles.statsCard}>
                <Card.Body>
                  <h3 style={aboutStyles.statsNumber}>50+</h3>
                  <p style={aboutStyles.statsLabel}>Countries Served</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} sm={6}>
              <Card style={aboutStyles.statsCard}>
                <Card.Body>
                  <h3 style={aboutStyles.statsNumber}>98%</h3>
                  <p style={aboutStyles.statsLabel}>Customer Satisfaction</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} sm={6}>
              <Card style={aboutStyles.statsCard}>
                <Card.Body>
                  <h3 style={aboutStyles.statsNumber}>24/7</h3>
                  <p style={aboutStyles.statsLabel}>Support Available</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Team Section */}
      <section style={aboutStyles.section}>
        <Container>
          <h2 style={aboutStyles.sectionTitle}>
            Leadership Team
            <div style={aboutStyles.sectionTitleUnderline} />
          </h2>
          <Row className="g-4">
            <Col md={3} sm={6}>
              <Card style={aboutStyles.teamCard}>
                <Card.Body>
                  <img 
                    src="https://i.pravatar.cc/150?img=1" 
                    alt="CEO" 
                    style={aboutStyles.teamImage}
                  />
                  <h5 style={aboutStyles.teamName}>John Smith</h5>
                  <p style={aboutStyles.teamRole}>CEO & Founder</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} sm={6}>
              <Card style={aboutStyles.teamCard}>
                <Card.Body>
                  <img 
                    src="https://i.pravatar.cc/150?img=2" 
                    alt="COO" 
                    style={aboutStyles.teamImage}
                  />
                  <h5 style={aboutStyles.teamName}>Sarah Johnson</h5>
                  <p style={aboutStyles.teamRole}>Chief Operations Officer</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} sm={6}>
              <Card style={aboutStyles.teamCard}>
                <Card.Body>
                  <img 
                    src="https://i.pravatar.cc/150?img=3" 
                    alt="CTO" 
                    style={aboutStyles.teamImage}
                  />
                  <h5 style={aboutStyles.teamName}>Michael Chen</h5>
                  <p style={aboutStyles.teamRole}>Chief Technology Officer</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} sm={6}>
              <Card style={aboutStyles.teamCard}>
                <Card.Body>
                  <img 
                    src="https://i.pravatar.cc/150?img=4" 
                    alt="CMO" 
                    style={aboutStyles.teamImage}
                  />
                  <h5 style={aboutStyles.teamName}>Emily Davis</h5>
                  <p style={aboutStyles.teamRole}>Chief Marketing Officer</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section style={aboutStyles.sectionAlt}>
        <Container>
          <h2 style={aboutStyles.sectionTitle}>
            Why Choose Us?
            <div style={aboutStyles.sectionTitleUnderline} />
          </h2>
          <Row className="g-4">
            <Col lg={4} md={6}>
              <div style={{ display: 'flex', gap: '16px', padding: '16px' }}>
                <div style={{ flexShrink: 0 }}>
                  <div style={{
                    backgroundColor: 'rgba(13, 110, 253, 0.1)',
                    borderRadius: '50%',
                    padding: '12px',
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <i className="bi bi-clock-history" style={{ fontSize: '1.5rem', color: '#0d6efd' }}></i>
                  </div>
                </div>
                <div>
                  <h6 style={{ fontWeight: 'bold', margin: 0 }}>Real-Time Tracking</h6>
                  <p style={{ color: '#6c757d', margin: '4px 0 0', fontSize: '0.9rem' }}>
                    Monitor your cargo with live updates and detailed status history.
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={4} md={6}>
              <div style={{ display: 'flex', gap: '16px', padding: '16px' }}>
                <div style={{ flexShrink: 0 }}>
                  <div style={{
                    backgroundColor: 'rgba(13, 110, 253, 0.1)',
                    borderRadius: '50%',
                    padding: '12px',
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <i className="bi bi-shield-check" style={{ fontSize: '1.5rem', color: '#0d6efd' }}></i>
                  </div>
                </div>
                <div>
                  <h6 style={{ fontWeight: 'bold', margin: 0 }}>Secure & Insured</h6>
                  <p style={{ color: '#6c757d', margin: '4px 0 0', fontSize: '0.9rem' }}>
                    Your cargo is fully insured and handled with the highest security.
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={4} md={6}>
              <div style={{ display: 'flex', gap: '16px', padding: '16px' }}>
                <div style={{ flexShrink: 0 }}>
                  <div style={{
                    backgroundColor: 'rgba(13, 110, 253, 0.1)',
                    borderRadius: '50%',
                    padding: '12px',
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <i className="bi bi-headset" style={{ fontSize: '1.5rem', color: '#0d6efd' }}></i>
                  </div>
                </div>
                <div>
                  <h6 style={{ fontWeight: 'bold', margin: 0 }}>24/7 Customer Support</h6>
                  <p style={{ color: '#6c757d', margin: '4px 0 0', fontSize: '0.9rem' }}>
                    Our dedicated team is always available to assist you.
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={4} md={6}>
              <div style={{ display: 'flex', gap: '16px', padding: '16px' }}>
                <div style={{ flexShrink: 0 }}>
                  <div style={{
                    backgroundColor: 'rgba(13, 110, 253, 0.1)',
                    borderRadius: '50%',
                    padding: '12px',
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <i className="bi bi-globe2" style={{ fontSize: '1.5rem', color: '#0d6efd' }}></i>
                  </div>
                </div>
                <div>
                  <h6 style={{ fontWeight: 'bold', margin: 0 }}>Global Network</h6>
                  <p style={{ color: '#6c757d', margin: '4px 0 0', fontSize: '0.9rem' }}>
                    Extensive network covering 50+ countries worldwide.
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={4} md={6}>
              <div style={{ display: 'flex', gap: '16px', padding: '16px' }}>
                <div style={{ flexShrink: 0 }}>
                  <div style={{
                    backgroundColor: 'rgba(13, 110, 253, 0.1)',
                    borderRadius: '50%',
                    padding: '12px',
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <i className="bi bi-file-pdf" style={{ fontSize: '1.5rem', color: '#0d6efd' }}></i>
                  </div>
                </div>
                <div>
                  <h6 style={{ fontWeight: 'bold', margin: 0 }}>Documentation Support</h6>
                  <p style={{ color: '#6c757d', margin: '4px 0 0', fontSize: '0.9rem' }}>
                    Complete shipping documentation and customs support.
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={4} md={6}>
              <div style={{ display: 'flex', gap: '16px', padding: '16px' }}>
                <div style={{ flexShrink: 0 }}>
                  <div style={{
                    backgroundColor: 'rgba(13, 110, 253, 0.1)',
                    borderRadius: '50%',
                    padding: '12px',
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <i className="bi bi-credit-card" style={{ fontSize: '1.5rem', color: '#0d6efd' }}></i>
                  </div>
                </div>
                <div>
                  <h6 style={{ fontWeight: 'bold', margin: 0 }}>Flexible Payment</h6>
                  <p style={{ color: '#6c757d', margin: '4px 0 0', fontSize: '0.9rem' }}>
                    Multiple payment options for your convenience.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section style={aboutStyles.cta}>
        <Container>
          <h2 style={aboutStyles.ctaTitle}>Ready to Get Started?</h2>
          <p style={aboutStyles.ctaSubtitle}>
            Join thousands of satisfied customers who trust us with their cargo
          </p>
          <Link 
            to="/contact" 
            style={aboutStyles.ctaBtn}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 30px rgba(255,255,255,0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            Contact Us Today
          </Link>
        </Container>
      </section>

      <Footer />
    </div>
  );
};

export default About;