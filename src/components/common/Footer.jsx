import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { settingsService } from '../../services/settings';

const Footer = () => {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await settingsService.getSettings();
        setSettings(data);
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };
    fetchSettings();
  }, []);

  return (
    <footer className="bg-dark text-white py-5">
      <Container>
        <Row className="g-4">
          <Col md={4}>
            <h5 className="fw-bold mb-3">
              <i className="bi bi-box-seam me-2"></i>
              {settings.company_name || 'Global Track Cargo'}
            </h5>
            <p className="text-white-50">
              Professional cargo tracking and freight forwarding services across the globe.
              Reliable, secure, and real-time shipment monitoring.
            </p>
            <div className="d-flex gap-3">
              {settings.facebook && (
                <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="text-white-50">
                  <i className="bi bi-facebook fs-5"></i>
                </a>
              )}
              {settings.twitter && (
                <a href={settings.twitter} target="_blank" rel="noopener noreferrer" className="text-white-50">
                  <i className="bi bi-twitter-x fs-5"></i>
                </a>
              )}
              {settings.instagram && (
                <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="text-white-50">
                  <i className="bi bi-instagram fs-5"></i>
                </a>
              )}
              {settings.whatsapp && (
                <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-white-50">
                  <i className="bi bi-whatsapp fs-5"></i>
                </a>
              )}
            </div>
          </Col>
          <Col md={2}>
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-white-50 text-decoration-none">Home</Link></li>
              <li><Link to="/about" className="text-white-50 text-decoration-none">About</Link></li>
              <li><Link to="/services" className="text-white-50 text-decoration-none">Services</Link></li>
              <li><Link to="/track" className="text-white-50 text-decoration-none">Track</Link></li>
              <li><Link to="/contact" className="text-white-50 text-decoration-none">Contact</Link></li>
            </ul>
          </Col>
          <Col md={3}>
            <h6 className="fw-bold">Contact Info</h6>
            <ul className="list-unstyled text-white-50">
              {settings.phone && (
                <li><i className="bi bi-telephone me-2"></i>{settings.phone}</li>
              )}
              {settings.email && (
                <li><i className="bi bi-envelope me-2"></i>{settings.email}</li>
              )}
              {settings.office_address && (
                <li><i className="bi bi-geo-alt me-2"></i>{settings.office_address}</li>
              )}
              {settings.business_hours && (
                <li><i className="bi bi-clock me-2"></i>{settings.business_hours}</li>
              )}
            </ul>
          </Col>
          <Col md={3}>
            <h6 className="fw-bold">Business Hours</h6>
            <ul className="list-unstyled text-white-50">
              <li><strong>Mon-Fri:</strong> 8:00 AM - 6:00 PM</li>
              <li><strong>Saturday:</strong> 9:00 AM - 2:00 PM</li>
              <li><strong>Sunday:</strong> Closed</li>
            </ul>
          </Col>
        </Row>
        <hr className="border-secondary" />
        <div className="text-center text-white-50">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} {settings.company_name || 'Global Track Cargo'}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
