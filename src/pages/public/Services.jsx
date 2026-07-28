import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

const Services = () => {
  const servicesStyles = {
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
    serviceCard: {
      border: 'none',
      boxShadow: '0 2px 15px rgba(0,0,0,0.08)',
      borderRadius: '12px',
      height: '100%',
      padding: '32px 24px',
      textAlign: 'center',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden'
    },
    serviceCardHover: {
      transform: 'translateY(-8px)',
      boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
    },
    serviceIcon: {
      fontSize: '3.5rem',
      color: '#0d6efd',
      marginBottom: '16px',
      display: 'block'
    },
    serviceIconBg: {
      backgroundColor: 'rgba(13, 110, 253, 0.1)',
      borderRadius: '50%',
      width: '80px',
      height: '80px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 16px'
    },
    serviceTitle: {
      fontWeight: 'bold',
      marginBottom: '12px',
      fontSize: '1.25rem'
    },
    serviceText: {
      color: '#6c757d',
      lineHeight: '1.8',
      margin: 0,
      fontSize: '0.95rem'
    },
    serviceBadge: {
      position: 'absolute',
      top: '12px',
      right: '12px'
    },
    serviceList: {
      listStyle: 'none',
      padding: 0,
      margin: '16px 0 0',
      textAlign: 'left'
    },
    serviceListItem: {
      padding: '6px 0',
      color: '#6c757d',
      fontSize: '0.9rem',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    serviceListItemIcon: {
      color: '#198754',
      fontSize: '0.8rem'
    },
    featureCard: {
      border: 'none',
      boxShadow: '0 2px 15px rgba(0,0,0,0.08)',
      borderRadius: '12px',
      padding: '24px',
      height: '100%',
      transition: 'transform 0.3s ease'
    },
    featureIcon: {
      fontSize: '2rem',
      color: '#0d6efd',
      marginBottom: '12px'
    },
    featureTitle: {
      fontWeight: 'bold',
      marginBottom: '8px'
    },
    featureText: {
      color: '#6c757d',
      margin: 0,
      fontSize: '0.95rem'
    },
    processCard: {
      border: 'none',
      boxShadow: '0 2px 15px rgba(0,0,0,0.08)',
      borderRadius: '12px',
      padding: '24px',
      textAlign: 'center',
      height: '100%',
      position: 'relative'
    },
    processNumber: {
      backgroundColor: '#0d6efd',
      color: 'white',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      margin: '0 auto 16px'
    },
    processTitle: {
      fontWeight: 'bold',
      marginBottom: '8px'
    },
    processText: {
      color: '#6c757d',
      margin: 0,
      fontSize: '0.95rem'
    },
    processArrow: {
      position: 'absolute',
      right: '-20px',
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: '1.5rem',
      color: '#dee2e6'
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
    pricingCard: {
      border: 'none',
      boxShadow: '0 2px 15px rgba(0,0,0,0.08)',
      borderRadius: '12px',
      padding: '32px 24px',
      textAlign: 'center',
      height: '100%',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    },
    pricingCardFeatured: {
      border: '2px solid #0d6efd',
      boxShadow: '0 8px 30px rgba(13, 110, 253, 0.15)',
      transform: 'scale(1.02)'
    },
    pricingTitle: {
      fontWeight: 'bold',
      marginBottom: '8px'
    },
    pricingPrice: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#0d6efd',
      marginBottom: '4px'
    },
    pricingPeriod: {
      color: '#6c757d',
      fontSize: '0.9rem'
    },
    pricingFeatures: {
      listStyle: 'none',
      padding: 0,
      margin: '16px 0',
      textAlign: 'left'
    },
    pricingFeature: {
      padding: '8px 0',
      color: '#6c757d',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      borderBottom: '1px solid #f8f9fa'
    },
    pricingFeatureLast: {
      padding: '8px 0',
      color: '#6c757d',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      borderBottom: 'none'
    },
    pricingBtn: {
      borderRadius: '50px',
      padding: '10px 32px',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      width: '100%'
    }
  };

  const services = [
    {
      id: 1,
      icon: 'bi-globe2',
      title: 'International Freight Forwarding',
      description: 'Comprehensive freight forwarding services across all continents with reliable transit times and competitive rates.',
      features: ['Air Freight', 'Sea Freight', 'Road Transport', 'Multi-modal Shipping']
    },
    {
      id: 2,
      icon: 'bi-search',
      title: 'Real-Time Cargo Tracking',
      description: 'Advanced tracking system providing real-time updates on your cargo location, status, and estimated arrival time.',
      features: ['Live GPS Tracking', 'Status Updates', 'Timeline History', 'Email Notifications']
    },
    {
      id: 3,
      icon: 'bi-shield-check',
      title: 'Secure Cargo Insurance',
      description: 'Comprehensive insurance coverage for your cargo, protecting against loss, damage, and unforeseen circumstances.',
      features: ['Full Coverage', 'Damage Protection', 'Theft Protection', 'Claims Assistance']
    },
    {
      id: 4,
      icon: 'bi-file-earmark-text',
      title: 'Customs Clearance Services',
      description: 'Expert customs clearance services ensuring smooth passage of your cargo through international borders.',
      features: ['Documentation Support', 'Customs Brokerage', 'Compliance Checks', 'Duty Calculation']
    },
    {
      id: 5,
      icon: 'bi-archive',
      title: 'Warehousing & Storage',
      description: 'Secure warehousing facilities with inventory management and distribution services for your cargo.',
      features: ['Climate-Controlled', 'Inventory Management', 'Distribution Services', '24/7 Security']
    },
    {
      id: 6,
      icon: 'bi-truck-front',
      title: 'Door-to-Door Delivery',
      description: 'Complete door-to-door delivery services from pickup to final destination with end-to-end visibility.',
      features: ['Pickup Service', 'Last-Mile Delivery', 'Tracking', 'Proof of Delivery']
    }
  ];

  const features = [
    {
      icon: 'bi-clock',
      title: '24/7 Availability',
      text: 'Our services are available around the clock to ensure your cargo is always monitored.'
    },
    {
      icon: 'bi-graph-up',
      title: 'Real-Time Analytics',
      text: 'Advanced analytics and reporting to give you full visibility of your shipping operations.'
    },
    {
      icon: 'bi-phone',
      title: 'Mobile Access',
      text: 'Track your cargo on the go with our mobile-friendly platform and notifications.'
    },
    {
      icon: 'bi-person-check',
      title: 'Dedicated Support',
      text: 'Personal account managers and dedicated support teams for all your shipping needs.'
    }
  ];

  const process = [
    {
      number: '01',
      title: 'Book Your Shipment',
      text: 'Schedule your cargo pickup with our easy booking system'
    },
    {
      number: '02',
      title: 'Pickup & Dispatch',
      text: 'We collect your cargo and prepare it for shipping'
    },
    {
      number: '03',
      title: 'Track in Real-Time',
      text: 'Monitor your cargo journey with live updates'
    },
    {
      number: '04',
      title: 'Receive Delivery',
      text: 'Your cargo arrives safely at the destination'
    }
  ];

  return (
    <div style={servicesStyles.page}>
      <Navbar />

      {/* Hero Section */}
      <section style={servicesStyles.hero}>
        <div style={servicesStyles.heroOverlay} />
        <Container style={servicesStyles.heroContent}>
          <h1 style={servicesStyles.heroTitle}>Our Services</h1>
          <p style={servicesStyles.heroSubtitle}>
            Comprehensive cargo tracking and freight forwarding solutions designed 
            to meet all your logistics needs with efficiency and reliability.
          </p>
        </Container>
      </section>

      {/* Main Services */}
      <section style={servicesStyles.section}>
        <Container>
          <h2 style={servicesStyles.sectionTitle}>
            What We Offer
            <div style={servicesStyles.sectionTitleUnderline} />
          </h2>
          <Row className="g-4">
            {services.map((service) => (
              <Col key={service.id} lg={4} md={6}>
                <Card 
                  style={servicesStyles.serviceCard}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 15px rgba(0,0,0,0.08)';
                  }}
                >
                  <Badge 
                    bg="primary" 
                    style={servicesStyles.serviceBadge}
                  >
                    Popular
                  </Badge>
                  <Card.Body>
                    <div style={servicesStyles.serviceIconBg}>
                      <i className={`bi ${service.icon}`} style={servicesStyles.serviceIcon}></i>
                    </div>
                    <h5 style={servicesStyles.serviceTitle}>{service.title}</h5>
                    <p style={servicesStyles.serviceText}>{service.description}</p>
                    <ul style={servicesStyles.serviceList}>
                      {service.features.map((feature, index) => (
                        <li key={index} style={servicesStyles.serviceListItem}>
                          <i className="bi bi-check-circle-fill" style={servicesStyles.serviceListItemIcon}></i>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* How It Works */}
      <section style={servicesStyles.sectionAlt}>
        <Container>
          <h2 style={servicesStyles.sectionTitle}>
            How It Works
            <div style={servicesStyles.sectionTitleUnderline} />
          </h2>
          <Row className="g-4 position-relative">
            {process.map((step, index) => (
              <Col key={index} md={3} sm={6}>
                <Card style={servicesStyles.processCard}>
                  <Card.Body>
                    <div style={servicesStyles.processNumber}>{step.number}</div>
                    <h6 style={servicesStyles.processTitle}>{step.title}</h6>
                    <p style={servicesStyles.processText}>{step.text}</p>
                  </Card.Body>
                </Card>
                {index < process.length - 1 && (
                  <div style={{
                    ...servicesStyles.processArrow,
                    display: 'none'
                  }}>
                    <i className="bi bi-arrow-right"></i>
                  </div>
                )}
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Why Choose Us - Features */}
      <section style={servicesStyles.section}>
        <Container>
          <h2 style={servicesStyles.sectionTitle}>
            Why Choose Our Services
            <div style={servicesStyles.sectionTitleUnderline} />
          </h2>
          <Row className="g-4">
            {features.map((feature, index) => (
              <Col key={index} md={3} sm={6}>
                <Card style={servicesStyles.featureCard}>
                  <Card.Body>
                    <i className={`bi ${feature.icon}`} style={servicesStyles.featureIcon}></i>
                    <h6 style={servicesStyles.featureTitle}>{feature.title}</h6>
                    <p style={servicesStyles.featureText}>{feature.text}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Pricing Section */}
      <section style={servicesStyles.sectionAlt}>
        <Container>
          <h2 style={servicesStyles.sectionTitle}>
            Flexible Pricing Plans
            <div style={servicesStyles.sectionTitleUnderline} />
          </h2>
          <Row className="g-4">
            <Col md={4}>
              <Card style={servicesStyles.pricingCard}>
                <Card.Body>
                  <h5 style={servicesStyles.pricingTitle}>Basic</h5>
                  <h3 style={servicesStyles.pricingPrice}>$99</h3>
                  <p style={servicesStyles.pricingPeriod}>per shipment</p>
                  <ul style={servicesStyles.pricingFeatures}>
                    <li style={servicesStyles.pricingFeature}>
                      <i className="bi bi-check-circle-fill" style={{ color: '#198754' }}></i>
                      Standard Tracking
                    </li>
                    <li style={servicesStyles.pricingFeature}>
                      <i className="bi bi-check-circle-fill" style={{ color: '#198754' }}></i>
                      Email Updates
                    </li>
                    <li style={servicesStyles.pricingFeature}>
                      <i className="bi bi-x-circle-fill" style={{ color: '#dc3545' }}></i>
                      Priority Support
                    </li>
                    <li style={servicesStyles.pricingFeatureLast}>
                      <i className="bi bi-x-circle-fill" style={{ color: '#dc3545' }}></i>
                      Insurance Coverage
                    </li>
                  </ul>
                  <button 
                    style={{
                      ...servicesStyles.pricingBtn,
                      backgroundColor: '#6c757d',
                      color: 'white',
                      border: 'none'
                    }}
                  >
                    Get Started
                  </button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card style={{
                ...servicesStyles.pricingCard,
                ...servicesStyles.pricingCardFeatured
              }}>
                <Badge 
                  bg="primary" 
                  style={{ 
                    position: 'absolute', 
                    top: '12px', 
                    right: '12px',
                    padding: '6px 16px'
                  }}
                >
                  Most Popular
                </Badge>
                <Card.Body>
                  <h5 style={servicesStyles.pricingTitle}>Professional</h5>
                  <h3 style={servicesStyles.pricingPrice}>$199</h3>
                  <p style={servicesStyles.pricingPeriod}>per shipment</p>
                  <ul style={servicesStyles.pricingFeatures}>
                    <li style={servicesStyles.pricingFeature}>
                      <i className="bi bi-check-circle-fill" style={{ color: '#198754' }}></i>
                      Real-Time Tracking
                    </li>
                    <li style={servicesStyles.pricingFeature}>
                      <i className="bi bi-check-circle-fill" style={{ color: '#198754' }}></i>
                      SMS & Email Updates
                    </li>
                    <li style={servicesStyles.pricingFeature}>
                      <i className="bi bi-check-circle-fill" style={{ color: '#198754' }}></i>
                      Priority Support
                    </li>
                    <li style={servicesStyles.pricingFeatureLast}>
                      <i className="bi bi-check-circle-fill" style={{ color: '#198754' }}></i>
                      Basic Insurance
                    </li>
                  </ul>
                  <button 
                    style={{
                      ...servicesStyles.pricingBtn,
                      backgroundColor: '#0d6efd',
                      color: 'white',
                      border: 'none'
                    }}
                  >
                    Get Started
                  </button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card style={servicesStyles.pricingCard}>
                <Card.Body>
                  <h5 style={servicesStyles.pricingTitle}>Enterprise</h5>
                  <h3 style={servicesStyles.pricingPrice}>$399</h3>
                  <p style={servicesStyles.pricingPeriod}>per shipment</p>
                  <ul style={servicesStyles.pricingFeatures}>
                    <li style={servicesStyles.pricingFeature}>
                      <i className="bi bi-check-circle-fill" style={{ color: '#198754' }}></i>
                      Premium Tracking
                    </li>
                    <li style={servicesStyles.pricingFeature}>
                      <i className="bi bi-check-circle-fill" style={{ color: '#198754' }}></i>
                      All Updates
                    </li>
                    <li style={servicesStyles.pricingFeature}>
                      <i className="bi bi-check-circle-fill" style={{ color: '#198754' }}></i>
                      Dedicated Support
                    </li>
                    <li style={servicesStyles.pricingFeatureLast}>
                      <i className="bi bi-check-circle-fill" style={{ color: '#198754' }}></i>
                      Full Insurance
                    </li>
                  </ul>
                  <button 
                    style={{
                      ...servicesStyles.pricingBtn,
                      backgroundColor: '#198754',
                      color: 'white',
                      border: 'none'
                    }}
                  >
                    Get Started
                  </button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section style={servicesStyles.cta}>
        <Container>
          <h2 style={servicesStyles.ctaTitle}>Ready to Ship with Us?</h2>
          <p style={servicesStyles.ctaSubtitle}>
            Experience reliable, secure, and transparent cargo tracking services
          </p>
          <Link 
            to="/contact" 
            style={servicesStyles.ctaBtn}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 30px rgba(255,255,255,0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            Get a Free Quote
          </Link>
        </Container>
      </section>

      <Footer />
    </div>
  );
};

export default Services;