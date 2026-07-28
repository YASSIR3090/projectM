import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { messageService } from '../../services/messages';
import { settingsService } from '../../services/settings';
import toast from 'react-hot-toast';

const Contact = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const data = await settingsService.getSettings();
      setSettings(data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);
    try {
      await messageService.createMessage(formData);
      setSubmitSuccess(true);
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      // Reset success after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('Error sending message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactStyles = {
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
    contactCard: {
      border: 'none',
      boxShadow: '0 2px 15px rgba(0,0,0,0.08)',
      borderRadius: '16px',
      overflow: 'hidden',
      height: '100%'
    },
    contactCardBody: {
      padding: '32px'
    },
    contactInfoCard: {
      border: 'none',
      boxShadow: '0 2px 15px rgba(0,0,0,0.08)',
      borderRadius: '16px',
      height: '100%',
      padding: '24px',
      textAlign: 'center',
      transition: 'transform 0.3s ease'
    },
    contactInfoIcon: {
      fontSize: '2.5rem',
      color: '#0d6efd',
      marginBottom: '12px'
    },
    contactInfoTitle: {
      fontWeight: 'bold',
      marginBottom: '8px'
    },
    contactInfoText: {
      color: '#6c757d',
      margin: 0,
      fontSize: '0.95rem'
    },
    formLabel: {
      fontWeight: '500',
      marginBottom: '4px'
    },
    formControl: {
      borderRadius: '10px',
      padding: '10px 14px',
      border: '2px solid #e9ecef'
    },
    formControlError: {
      borderColor: '#dc3545'
    },
    errorText: {
      color: '#dc3545',
      fontSize: '0.85rem',
      marginTop: '4px'
    },
    submitBtn: {
      padding: '12px 48px',
      borderRadius: '50px',
      fontWeight: '600',
      backgroundColor: '#0d6efd',
      border: 'none',
      width: '100%',
      transition: 'all 0.3s ease'
    },
    submitBtnDisabled: {
      opacity: 0.7,
      cursor: 'not-allowed'
    },
    successAlert: {
      borderRadius: '12px',
      padding: '16px 20px',
      marginBottom: '16px',
      backgroundColor: '#d1e7dd',
      borderColor: '#badbcc',
      color: '#0f5132'
    },
    mapContainer: {
      borderRadius: '16px',
      overflow: 'hidden',
      height: '300px',
      marginTop: '32px'
    },
    mapIframe: {
      width: '100%',
      height: '100%',
      border: 'none'
    },
    businessHours: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    businessHoursItem: {
      padding: '8px 0',
      display: 'flex',
      justifyContent: 'space-between',
      borderBottom: '1px solid #f8f9fa'
    },
    businessHoursItemLast: {
      padding: '8px 0',
      display: 'flex',
      justifyContent: 'space-between',
      borderBottom: 'none'
    },
    businessHoursDay: {
      fontWeight: '500',
      color: '#495057'
    },
    businessHoursTime: {
      color: '#6c757d'
    },
    socialLinks: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'center',
      marginTop: '16px'
    },
    socialLink: {
      width: '44px',
      height: '44px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8f9fa',
      color: '#495057',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      fontSize: '1.1rem'
    }
  };

  const businessHours = [
    { day: 'Monday - Friday', time: '8:00 AM - 6:00 PM' },
    { day: 'Saturday', time: '9:00 AM - 2:00 PM' },
    { day: 'Sunday', time: 'Closed' }
  ];

  return (
    <div style={contactStyles.page}>
      <Navbar />

      {/* Hero Section */}
      <section style={contactStyles.hero}>
        <div style={contactStyles.heroOverlay} />
        <Container style={contactStyles.heroContent}>
          <h1 style={contactStyles.heroTitle}>Contact Us</h1>
          <p style={contactStyles.heroSubtitle}>
            Have questions about your cargo or need assistance? Reach out to our team 
            and we'll get back to you promptly.
          </p>
        </Container>
      </section>

      {/* Contact Section */}
      <section style={contactStyles.section}>
        <Container>
          <Row className="g-4">
            {/* Contact Form */}
            <Col lg={7}>
              <Card style={contactStyles.contactCard}>
                <Card.Body style={contactStyles.contactCardBody}>
                  <h4 style={{ marginBottom: '24px', fontWeight: 'bold' }}>
                    <i className="bi bi-envelope-paper me-2" style={{ color: '#0d6efd' }}></i>
                    Send Us a Message
                  </h4>

                  {submitSuccess && (
                    <Alert variant="success" style={contactStyles.successAlert}>
                      <i className="bi bi-check-circle-fill me-2"></i>
                      Your message has been sent successfully! We'll get back to you soon.
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmit}>
                    <Row className="g-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label style={contactStyles.formLabel}>Full Name *</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            style={{
                              ...contactStyles.formControl,
                              ...(errors.name ? contactStyles.formControlError : {})
                            }}
                            className={errors.name ? 'is-invalid' : ''}
                          />
                          {errors.name && (
                            <div style={contactStyles.errorText}>{errors.name}</div>
                          )}
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label style={contactStyles.formLabel}>Email Address *</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            style={{
                              ...contactStyles.formControl,
                              ...(errors.email ? contactStyles.formControlError : {})
                            }}
                            className={errors.email ? 'is-invalid' : ''}
                          />
                          {errors.email && (
                            <div style={contactStyles.errorText}>{errors.email}</div>
                          )}
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label style={contactStyles.formLabel}>Phone Number</Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            style={contactStyles.formControl}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label style={contactStyles.formLabel}>Subject</Form.Label>
                          <Form.Control
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="What is this about?"
                            style={contactStyles.formControl}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={12}>
                        <Form.Group>
                          <Form.Label style={contactStyles.formLabel}>Message *</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows="5"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Write your message here..."
                            style={{
                              ...contactStyles.formControl,
                              ...(errors.message ? contactStyles.formControlError : {})
                            }}
                            className={errors.message ? 'is-invalid' : ''}
                          />
                          {errors.message && (
                            <div style={contactStyles.errorText}>{errors.message}</div>
                          )}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Button
                      type="submit"
                      variant="primary"
                      disabled={isSubmitting}
                      style={{
                        ...contactStyles.submitBtn,
                        ...(isSubmitting ? contactStyles.submitBtnDisabled : {})
                      }}
                      onMouseEnter={(e) => {
                        if (!isSubmitting) {
                          e.target.style.backgroundColor = '#0b5ed7';
                          e.target.style.transform = 'translateY(-2px)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSubmitting) {
                          e.target.style.backgroundColor = '#0d6efd';
                          e.target.style.transform = 'translateY(0)';
                        }
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Sending...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-send me-2"></i>
                          Send Message
                        </>
                      )}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            {/* Contact Information */}
            <Col lg={5}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Contact Info Cards */}
                <Row className="g-3">
                  <Col sm={6}>
                    <Card style={contactStyles.contactInfoCard}>
                      <Card.Body>
                        <i className="bi bi-geo-alt" style={contactStyles.contactInfoIcon}></i>
                        <h6 style={contactStyles.contactInfoTitle}>Address</h6>
                        <p style={contactStyles.contactInfoText}>
                          {settings.office_address || 'Dar es Salaam, Tanzania'}
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col sm={6}>
                    <Card style={contactStyles.contactInfoCard}>
                      <Card.Body>
                        <i className="bi bi-telephone" style={contactStyles.contactInfoIcon}></i>
                        <h6 style={contactStyles.contactInfoTitle}>Phone</h6>
                        <p style={contactStyles.contactInfoText}>
                          {settings.phone || '+255 754 000 000'}
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col sm={6}>
                    <Card style={contactStyles.contactInfoCard}>
                      <Card.Body>
                        <i className="bi bi-envelope" style={contactStyles.contactInfoIcon}></i>
                        <h6 style={contactStyles.contactInfoTitle}>Email</h6>
                        <p style={contactStyles.contactInfoText}>
                          {settings.email || 'support@globaltrackcargo.com'}
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col sm={6}>
                    <Card style={contactStyles.contactInfoCard}>
                      <Card.Body>
                        <i className="bi bi-whatsapp" style={{ ...contactStyles.contactInfoIcon, color: '#25D366' }}></i>
                        <h6 style={contactStyles.contactInfoTitle}>WhatsApp</h6>
                        <p style={contactStyles.contactInfoText}>
                          {settings.whatsapp || '+255 754 000 000'}
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                {/* Business Hours */}
                <Card style={contactStyles.contactCard}>
                  <Card.Body style={contactStyles.contactCardBody}>
                    <h6 style={{ fontWeight: 'bold', marginBottom: '16px' }}>
                      <i className="bi bi-clock me-2" style={{ color: '#0d6efd' }}></i>
                      Business Hours
                    </h6>
                    <ul style={contactStyles.businessHours}>
                      {businessHours.map((item, index) => (
                        <li 
                          key={index}
                          style={index === businessHours.length - 1 
                            ? contactStyles.businessHoursItemLast 
                            : contactStyles.businessHoursItem
                          }
                        >
                          <span style={contactStyles.businessHoursDay}>{item.day}</span>
                          <span style={contactStyles.businessHoursTime}>{item.time}</span>
                        </li>
                      ))}
                    </ul>
                  </Card.Body>
                </Card>

                {/* Social Links */}
                <Card style={contactStyles.contactCard}>
                  <Card.Body style={contactStyles.contactCardBody}>
                    <h6 style={{ fontWeight: 'bold', marginBottom: '16px' }}>
                      <i className="bi bi-share me-2" style={{ color: '#0d6efd' }}></i>
                      Connect With Us
                    </h6>
                    <div style={contactStyles.socialLinks}>
                      {settings.facebook && (
                        <a 
                          href={settings.facebook} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={contactStyles.socialLink}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#1877f2';
                            e.target.style.color = 'white';
                            e.target.style.transform = 'translateY(-3px)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#f8f9fa';
                            e.target.style.color = '#495057';
                            e.target.style.transform = 'translateY(0)';
                          }}
                        >
                          <i className="bi bi-facebook"></i>
                        </a>
                      )}
                      {settings.twitter && (
                        <a 
                          href={settings.twitter} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={contactStyles.socialLink}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#000000';
                            e.target.style.color = 'white';
                            e.target.style.transform = 'translateY(-3px)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#f8f9fa';
                            e.target.style.color = '#495057';
                            e.target.style.transform = 'translateY(0)';
                          }}
                        >
                          <i className="bi bi-twitter-x"></i>
                        </a>
                      )}
                      {settings.instagram && (
                        <a 
                          href={settings.instagram} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={contactStyles.socialLink}
                          onMouseEnter={(e) => {
                            e.target.style.background = 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)';
                            e.target.style.color = 'white';
                            e.target.style.transform = 'translateY(-3px)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#f8f9fa';
                            e.target.style.color = '#495057';
                            e.target.style.transform = 'translateY(0)';
                          }}
                        >
                          <i className="bi bi-instagram"></i>
                        </a>
                      )}
                      {settings.tiktok && (
                        <a 
                          href={settings.tiktok} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={contactStyles.socialLink}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#000000';
                            e.target.style.color = 'white';
                            e.target.style.transform = 'translateY(-3px)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#f8f9fa';
                            e.target.style.color = '#495057';
                            e.target.style.transform = 'translateY(0)';
                          }}
                        >
                          <i className="bi bi-tiktok"></i>
                        </a>
                      )}
                      {settings.whatsapp && (
                        <a 
                          href={`https://wa.me/${settings.whatsapp}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={contactStyles.socialLink}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#25D366';
                            e.target.style.color = 'white';
                            e.target.style.transform = 'translateY(-3px)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#f8f9fa';
                            e.target.style.color = '#495057';
                            e.target.style.transform = 'translateY(0)';
                          }}
                        >
                          <i className="bi bi-whatsapp"></i>
                        </a>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>

          {/* Map */}
          <div style={contactStyles.mapContainer}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.60912413133!2d39.19554644378776!3d-6.792354093587584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4bca2c8b24ad%3A0x2f8c3f8c4c7c8f8c!2sDar%20es%20Salaam%2C%20Tanzania!5e0!3m2!1sen!2s!4v1700000000000"
              style={contactStyles.mapIframe}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location"
            />
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;