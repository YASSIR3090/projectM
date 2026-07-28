import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await login(formData.username, formData.password);
      toast.success('Login successful! Welcome back!');
      navigate('/admin');
    } catch (error) {
      const errorMsg = error.response?.data?.detail || 'Invalid username or password';
      setError(errorMsg);
      toast.error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const loginStyles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #003366 0%, #0055a4 50%, #0077be 100%)',
      padding: '20px'
    },
    card: {
      maxWidth: '420px',
      width: '100%',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      border: 'none',
      borderRadius: '16px',
      overflow: 'hidden'
    },
    cardBody: {
      padding: '40px 32px'
    },
    header: {
      textAlign: 'center',
      marginBottom: '32px'
    },
    iconWrapper: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      backgroundColor: 'rgba(13, 110, 253, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 16px'
    },
    icon: {
      fontSize: '3rem',
      color: '#0d6efd'
    },
    title: {
      fontWeight: 'bold',
      marginBottom: '4px',
      fontSize: '1.75rem'
    },
    subtitle: {
      color: '#6c757d',
      margin: 0,
      fontSize: '0.95rem'
    },
    alert: {
      display: 'flex',
      alignItems: 'center',
      borderRadius: '10px',
      padding: '12px 16px',
      marginBottom: '20px'
    },
    alertIcon: {
      marginRight: '10px',
      fontSize: '1.1rem'
    },
    formGroup: {
      marginBottom: '20px'
    },
    label: {
      fontWeight: '500',
      marginBottom: '6px',
      fontSize: '0.9rem'
    },
    inputGroup: {
      borderRadius: '10px',
      overflow: 'hidden'
    },
    inputGroupText: {
      backgroundColor: '#f8f9fa',
      border: '2px solid #e9ecef',
      borderRight: 'none',
      padding: '0 14px'
    },
    input: {
      border: '2px solid #e9ecef',
      borderRadius: '0',
      padding: '10px 14px',
      fontSize: '0.95rem',
      transition: 'all 0.3s'
    },
    inputFocus: {
      borderColor: '#0d6efd',
      boxShadow: 'none'
    },
    submitBtn: {
      width: '100%',
      padding: '12px',
      fontWeight: '600',
      borderRadius: '10px',
      border: 'none',
      backgroundColor: '#0d6efd',
      color: 'white',
      fontSize: '1rem',
      transition: 'all 0.3s ease'
    },
    submitBtnHover: {
      backgroundColor: '#0b5ed7',
      transform: 'translateY(-2px)',
      boxShadow: '0 5px 20px rgba(13, 110, 253, 0.3)'
    },
    submitBtnDisabled: {
      opacity: 0.7,
      cursor: 'not-allowed'
    },
    footer: {
      textAlign: 'center',
      marginTop: '20px',
      paddingTop: '20px',
      borderTop: '1px solid #e9ecef'
    },
    footerLink: {
      color: '#0d6efd',
      textDecoration: 'none',
      fontWeight: '500'
    },
    footerLinkHover: {
      textDecoration: 'underline'
    },
    demoInfo: {
      marginTop: '16px',
      padding: '12px 16px',
      backgroundColor: '#f8f9fa',
      borderRadius: '10px',
      fontSize: '0.85rem',
      color: '#6c757d'
    },
    demoInfoStrong: {
      color: '#212529'
    }
  };

  return (
    <div style={loginStyles.container}>
      <Container style={{ maxWidth: '420px' }}>
        <Card style={loginStyles.card}>
          <Card.Body style={loginStyles.cardBody}>
            <div style={loginStyles.header}>
              <div style={loginStyles.iconWrapper}>
                <i className="bi bi-box-seam" style={loginStyles.icon}></i>
              </div>
              <h2 style={loginStyles.title}>Admin Login</h2>
              <p style={loginStyles.subtitle}>Global Track Cargo Management</p>
            </div>

            {error && (
              <Alert variant="danger" style={loginStyles.alert}>
                <i className="bi bi-exclamation-circle" style={loginStyles.alertIcon}></i>
                {error}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group style={loginStyles.formGroup}>
                <Form.Label style={loginStyles.label}>
                  <i className="bi bi-person me-2"></i>
                  Username
                </Form.Label>
                <div className="input-group" style={loginStyles.inputGroup}>
                  <span className="input-group-text" style={loginStyles.inputGroupText}>
                    <i className="bi bi-person"></i>
                  </span>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter username"
                    required
                    style={loginStyles.input}
                    className={formData.username ? 'focused' : ''}
                    onFocus={(e) => e.target.style.borderColor = '#0d6efd'}
                    onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                  />
                </div>
              </Form.Group>

              <Form.Group style={loginStyles.formGroup}>
                <Form.Label style={loginStyles.label}>
                  <i className="bi bi-lock me-2"></i>
                  Password
                </Form.Label>
                <div className="input-group" style={loginStyles.inputGroup}>
                  <span className="input-group-text" style={loginStyles.inputGroupText}>
                    <i className="bi bi-lock"></i>
                  </span>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    required
                    style={loginStyles.input}
                    onFocus={(e) => e.target.style.borderColor = '#0d6efd'}
                    onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                  />
                </div>
              </Form.Group>

              <Button
                type="submit"
                disabled={isLoading}
                style={{
                  ...loginStyles.submitBtn,
                  ...(isLoading ? loginStyles.submitBtnDisabled : {})
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.target.style.backgroundColor = '#0b5ed7';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 5px 20px rgba(13, 110, 253, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) {
                    e.target.style.backgroundColor = '#0d6efd';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              >
                {isLoading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      style={{ marginRight: '10px' }}
                    />
                    Logging in...
                  </>
                ) : (
                  <>
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Login
                  </>
                )}
              </Button>
            </Form>

            <div style={loginStyles.demoInfo}>
              <strong style={loginStyles.demoInfoStrong}>Demo Credentials:</strong><br />
              Username: <strong>admin</strong> | Password: <strong>admin123</strong>
            </div>

            <div style={loginStyles.footer}>
              <Link to="/" style={loginStyles.footerLink}>
                <i className="bi bi-arrow-left me-1"></i>
                Back to Website
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Login;