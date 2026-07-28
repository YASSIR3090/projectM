import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Card, Form, Button, Table, Badge, Row, Col, Spinner } from 'react-bootstrap';
import { trackingService } from '../../services/tracking';
import toast from 'react-hot-toast';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import TrackingTimeline from '../../components/tracking/TrackingTimeline';

const TrackCargo = () => {
  const location = useLocation();
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (location.state?.trackingData) {
      setTrackingData(location.state.trackingData);
      setTrackingNumber(location.state.trackingData.cargo.tracking_number);
    }
  }, [location.state]);

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!trackingNumber.trim()) {
      toast.error('Please enter a tracking number');
      return;
    }
    setIsLoading(true);
    setError('');
    setIsSearching(true);
    try {
      const data = await trackingService.trackCargo(trackingNumber);
      setTrackingData(data);
      toast.success('Cargo found!');
    } catch (error) {
      setError(error.response?.data?.error || 'Cargo not found with this tracking number');
      setTrackingData(null);
      toast.error('Cargo not found');
    } finally {
      setIsLoading(false);
      setIsSearching(false);
    }
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      delivered: 'success',
      pending: 'warning',
      in_transit: 'info',
      cancelled: 'danger',
      arrived: 'primary',
      out_for_delivery: 'info',
      received: 'info',
      warehouse: 'secondary',
      processing: 'warning',
      packed: 'info',
      ready_for_shipment: 'primary',
      export_customs: 'warning',
      airport: 'info',
      seaport: 'info',
      import_customs: 'warning',
      local_warehouse: 'secondary'
    };
    return colors[status] || 'secondary';
  };

  const getStatusIcon = (status) => {
    const icons = {
      delivered: 'bi-check-circle-fill',
      pending: 'bi-clock',
      in_transit: 'bi-truck',
      cancelled: 'bi-x-circle',
      arrived: 'bi-geo-alt-fill',
      out_for_delivery: 'bi-truck-front',
      received: 'bi-box-arrow-in-right',
      warehouse: 'bi-building',
      processing: 'bi-gear',
      packed: 'bi-box-seam',
      ready_for_shipment: 'bi-rocket',
      export_customs: 'bi-file-check',
      airport: 'bi-airplane',
      seaport: 'bi-ship',
      import_customs: 'bi-file-check',
      local_warehouse: 'bi-building'
    };
    return icons[status] || 'bi-circle';
  };

  const getStatusText = (status) => {
    return status.replace(/_/g, ' ').toUpperCase();
  };

  const trackStyles = {
    page: {
      padding: '48px 0',
      minHeight: '80vh',
      backgroundColor: '#f8f9fa'
    },
    title: {
      textAlign: 'center',
      marginBottom: '8px',
      fontWeight: 'bold',
      color: '#212529'
    },
    subtitle: {
      textAlign: 'center',
      color: '#6c757d',
      marginBottom: '32px',
      fontSize: '1.1rem'
    },
    searchCard: {
      boxShadow: '0 2px 15px rgba(0,0,0,0.08)',
      border: 'none',
      borderRadius: '16px',
      marginBottom: '32px',
      overflow: 'hidden'
    },
    searchCardHeader: {
      backgroundColor: '#0d6efd',
      color: 'white',
      padding: '16px 24px',
      borderBottom: 'none'
    },
    searchCardHeaderTitle: {
      margin: 0,
      fontWeight: '600',
      fontSize: '1.1rem'
    },
    searchBody: {
      padding: '24px'
    },
    searchInputGroup: {
      borderRadius: '10px',
      overflow: 'hidden'
    },
    searchInput: {
      padding: '14px 18px',
      borderRadius: '0',
      border: '2px solid #e9ecef',
      fontSize: '1rem'
    },
    searchInputFocus: {
      borderColor: '#0d6efd',
      boxShadow: 'none'
    },
    searchBtn: {
      padding: '14px 32px',
      borderRadius: '0',
      fontWeight: '600',
      fontSize: '1rem',
      backgroundColor: '#0d6efd',
      border: 'none'
    },
    searchBtnDisabled: {
      opacity: 0.7,
      cursor: 'not-allowed'
    },
    errorText: {
      color: '#dc3545',
      marginTop: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    detailCard: {
      boxShadow: '0 2px 15px rgba(0,0,0,0.08)',
      border: 'none',
      borderRadius: '16px',
      marginBottom: '24px',
      overflow: 'hidden'
    },
    detailHeader: {
      backgroundColor: '#0d6efd',
      color: 'white',
      padding: '16px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '8px'
    },
    detailHeaderTitle: {
      margin: 0,
      fontWeight: '600',
      fontSize: '1.1rem'
    },
    detailHeaderBadge: {
      padding: '6px 16px',
      borderRadius: '50px',
      fontSize: '0.85rem',
      fontWeight: '500'
    },
    detailBody: {
      padding: '24px'
    },
    infoSection: {
      marginBottom: '16px'
    },
    infoLabel: {
      fontWeight: '600',
      color: '#495057',
      marginBottom: '2px',
      fontSize: '0.85rem'
    },
    infoValue: {
      color: '#212529',
      fontSize: '1rem',
      fontWeight: '500'
    },
    divider: {
      margin: '20px 0',
      borderColor: '#e9ecef'
    },
    statusSection: {
      backgroundColor: '#f8f9fa',
      borderRadius: '12px',
      padding: '16px 20px',
      marginTop: '8px'
    },
    statusBadge: {
      padding: '10px 20px',
      fontSize: '1.1rem',
      fontWeight: '600',
      borderRadius: '50px'
    },
    statusLocation: {
      color: '#6c757d',
      margin: 0,
      fontSize: '1rem'
    },
    statusIcon: {
      marginRight: '8px'
    },
    timelineWrapper: {
      marginTop: '8px'
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '200px',
      flexDirection: 'column',
      gap: '16px'
    },
    loadingText: {
      color: '#6c757d',
      fontSize: '1rem'
    },
    emptyState: {
      textAlign: 'center',
      padding: '60px 24px'
    },
    emptyIcon: {
      fontSize: '4rem',
      color: '#dee2e6',
      marginBottom: '16px'
    },
    emptyTitle: {
      fontSize: '1.25rem',
      fontWeight: '500',
      marginBottom: '8px',
      color: '#212529'
    },
    emptyText: {
      color: '#6c757d',
      marginBottom: '0',
      fontSize: '1rem'
    },
    recentSearches: {
      marginTop: '16px'
    },
    recentSearchBadge: {
      cursor: 'pointer',
      padding: '6px 16px',
      borderRadius: '50px',
      backgroundColor: '#e9ecef',
      color: '#495057',
      border: 'none',
      fontSize: '0.85rem',
      transition: 'all 0.2s',
      margin: '4px'
    },
    recentSearchBadgeHover: {
      backgroundColor: '#0d6efd',
      color: 'white'
    },
    tipsCard: {
      boxShadow: '0 2px 15px rgba(0,0,0,0.08)',
      border: 'none',
      borderRadius: '16px',
      marginTop: '24px',
      backgroundColor: '#fff'
    },
    tipsHeader: {
      backgroundColor: '#f8f9fa',
      padding: '16px 24px',
      borderBottom: '1px solid #e9ecef',
      fontWeight: '600'
    },
    tipsBody: {
      padding: '20px 24px'
    },
    tipItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      padding: '8px 0'
    },
    tipIcon: {
      color: '#0d6efd',
      fontSize: '1.1rem',
      marginTop: '2px'
    },
    tipText: {
      color: '#6c757d',
      margin: 0,
      fontSize: '0.95rem'
    }
  };

  // Recent searches from localStorage
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('recentTrackingSearches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved).slice(0, 5));
      } catch (e) {
        setRecentSearches([]);
      }
    }
  }, []);

  const saveRecentSearch = (number) => {
    if (!number) return;
    let searches = [number, ...recentSearches.filter(s => s !== number)];
    if (searches.length > 5) searches = searches.slice(0, 5);
    setRecentSearches(searches);
    localStorage.setItem('recentTrackingSearches', JSON.stringify(searches));
  };

  const handleRecentSearchClick = (number) => {
    setTrackingNumber(number);
    // Auto-search
    setTimeout(() => {
      const fakeEvent = { preventDefault: () => {} };
      handleTrack(fakeEvent);
    }, 100);
  };

  return (
    <>
      <Navbar />
      <section style={trackStyles.page}>
        <Container>
          <h1 style={trackStyles.title}>
            <i className="bi bi-search" style={{ color: '#0d6efd', marginRight: '12px' }}></i>
            Track Your Cargo
          </h1>
          <p style={trackStyles.subtitle}>
            Enter your tracking number to get the latest status of your shipment
          </p>

          <Row className="justify-content-center">
            <Col lg={8}>
              {/* Search Card */}
              <Card style={trackStyles.searchCard}>
                <div style={trackStyles.searchCardHeader}>
                  <h5 style={trackStyles.searchCardHeaderTitle}>
                    <i className="bi bi-box-seam me-2"></i>
                    Track Shipment
                  </h5>
                </div>
                <Card.Body style={trackStyles.searchBody}>
                  <Form onSubmit={handleTrack}>
                    <Row className="g-0">
                      <Col md={9}>
                        <Form.Control
                          type="text"
                          placeholder="Enter Tracking Number (e.g., GTC202600001)"
                          value={trackingNumber}
                          onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
                          style={trackStyles.searchInput}
                          className="rounded-0"
                          disabled={isLoading}
                        />
                      </Col>
                      <Col md={3}>
                        <Button 
                          type="submit" 
                          variant="primary"
                          className="w-100 rounded-0"
                          disabled={isLoading}
                          style={{
                            ...trackStyles.searchBtn,
                            ...(isLoading ? trackStyles.searchBtnDisabled : {})
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
                                style={{ marginRight: '8px' }}
                              />
                              Searching...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-search me-2"></i>
                              Track
                            </>
                          )}
                        </Button>
                      </Col>
                    </Row>
                  </Form>

                  {error && (
                    <div style={trackStyles.errorText}>
                      <i className="bi bi-exclamation-circle-fill"></i>
                      {error}
                    </div>
                  )}

                  {/* Recent Searches */}
                  {recentSearches.length > 0 && !trackingData && (
                    <div style={trackStyles.recentSearches}>
                      <small style={{ color: '#6c757d', fontWeight: '500' }}>Recent Searches:</small>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                        {recentSearches.map((search, index) => (
                          <button
                            key={index}
                            style={trackStyles.recentSearchBadge}
                            onClick={() => handleRecentSearchClick(search)}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = '#0d6efd';
                              e.target.style.color = 'white';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = '#e9ecef';
                              e.target.style.color = '#495057';
                            }}
                          >
                            {search}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </Card.Body>
              </Card>

              {/* Loading State */}
              {isSearching && !trackingData && (
                <div style={trackStyles.loadingContainer}>
                  <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
                  <p style={trackStyles.loadingText}>Searching for your cargo...</p>
                </div>
              )}

              {/* Tracking Results */}
              {trackingData && (
                <>
                  {/* Cargo Details */}
                  <Card style={trackStyles.detailCard}>
                    <div style={trackStyles.detailHeader}>
                      <h5 style={trackStyles.detailHeaderTitle}>
                        <i className="bi bi-box-seam me-2"></i>
                        Shipment Details
                      </h5>
                      <Badge 
                        bg={getStatusBadgeColor(trackingData.cargo.current_status)}
                        style={trackStyles.detailHeaderBadge}
                      >
                        <i className={`bi ${getStatusIcon(trackingData.cargo.current_status)} me-1`}></i>
                        {getStatusText(trackingData.cargo.current_status)}
                      </Badge>
                    </div>
                    <Card.Body style={trackStyles.detailBody}>
                      <Row>
                        <Col md={6}>
                          <div style={trackStyles.infoSection}>
                            <p style={trackStyles.infoLabel}>Tracking Number</p>
                            <p style={{ ...trackStyles.infoValue, color: '#0d6efd', fontWeight: '700' }}>
                              {trackingData.cargo.tracking_number}
                            </p>
                          </div>
                          <div style={trackStyles.infoSection}>
                            <p style={trackStyles.infoLabel}>Customer Name</p>
                            <p style={trackStyles.infoValue}>{trackingData.cargo.customer_name}</p>
                          </div>
                          <div style={trackStyles.infoSection}>
                            <p style={trackStyles.infoLabel}>Phone</p>
                            <p style={trackStyles.infoValue}>{trackingData.cargo.customer_phone}</p>
                          </div>
                          <div style={trackStyles.infoSection}>
                            <p style={trackStyles.infoLabel}>Sender</p>
                            <p style={trackStyles.infoValue}>{trackingData.cargo.sender_name}</p>
                          </div>
                          <div style={trackStyles.infoSection}>
                            <p style={trackStyles.infoLabel}>Receiver</p>
                            <p style={trackStyles.infoValue}>{trackingData.cargo.receiver_name}</p>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div style={trackStyles.infoSection}>
                            <p style={trackStyles.infoLabel}>Origin Country</p>
                            <p style={trackStyles.infoValue}>
                              <i className="bi bi-geo-alt me-1" style={{ color: '#0d6efd' }}></i>
                              {trackingData.cargo.origin_country}
                            </p>
                          </div>
                          <div style={trackStyles.infoSection}>
                            <p style={trackStyles.infoLabel}>Destination Country</p>
                            <p style={trackStyles.infoValue}>
                              <i className="bi bi-geo-alt me-1" style={{ color: '#dc3545' }}></i>
                              {trackingData.cargo.destination_country}
                            </p>
                          </div>
                          <div style={trackStyles.infoSection}>
                            <p style={trackStyles.infoLabel}>Cargo Type</p>
                            <p style={trackStyles.infoValue}>{trackingData.cargo.cargo_type}</p>
                          </div>
                          <div style={trackStyles.infoSection}>
                            <p style={trackStyles.infoLabel}>Weight</p>
                            <p style={trackStyles.infoValue}>{trackingData.cargo.weight || 'N/A'} kg</p>
                          </div>
                          <div style={trackStyles.infoSection}>
                            <p style={trackStyles.infoLabel}>Shipping Method</p>
                            <p style={trackStyles.infoValue}>
                              <Badge bg="secondary" style={{ fontSize: '0.85rem', padding: '4px 12px' }}>
                                {trackingData.cargo.shipping_method?.toUpperCase() || 'N/A'}
                              </Badge>
                            </p>
                          </div>
                        </Col>
                      </Row>

                      <hr style={trackStyles.divider} />

                      <Row>
                        <Col md={6}>
                          <div style={trackStyles.statusSection}>
                            <p style={{ ...trackStyles.infoLabel, marginBottom: '4px' }}>
                              <i className="bi bi-arrow-right-circle me-1"></i>
                              Current Status
                            </p>
                            <Badge 
                              bg={getStatusBadgeColor(trackingData.cargo.current_status)}
                              style={trackStyles.statusBadge}
                            >
                              <i className={`bi ${getStatusIcon(trackingData.cargo.current_status)} me-2`}></i>
                              {getStatusText(trackingData.cargo.current_status)}
                            </Badge>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div style={trackStyles.statusSection}>
                            <p style={{ ...trackStyles.infoLabel, marginBottom: '4px' }}>
                              <i className="bi bi-geo-alt me-1"></i>
                              Current Location
                            </p>
                            <p style={trackStyles.statusLocation}>
                              {trackingData.cargo.current_location || 'Not specified'}
                            </p>
                          </div>
                        </Col>
                      </Row>

                      {trackingData.cargo.expected_delivery_date && (
                        <Row style={{ marginTop: '12px' }}>
                          <Col>
                            <div style={trackStyles.statusSection}>
                              <p style={{ ...trackStyles.infoLabel, marginBottom: '4px' }}>
                                <i className="bi bi-calendar-event me-1"></i>
                                Expected Delivery Date
                              </p>
                              <p style={{ ...trackStyles.statusLocation, fontWeight: '600' }}>
                                {new Date(trackingData.cargo.expected_delivery_date).toLocaleDateString('en-US', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </p>
                            </div>
                          </Col>
                        </Row>
                      )}

                      {trackingData.cargo.description && (
                        <Row style={{ marginTop: '12px' }}>
                          <Col>
                            <div style={trackStyles.statusSection}>
                              <p style={{ ...trackStyles.infoLabel, marginBottom: '4px' }}>
                                <i className="bi bi-file-text me-1"></i>
                                Description
                              </p>
                              <p style={trackStyles.statusLocation}>{trackingData.cargo.description}</p>
                            </div>
                          </Col>
                        </Row>
                      )}
                    </Card.Body>
                  </Card>

                  {/* Tracking Timeline */}
                  {trackingData.tracking_history && trackingData.tracking_history.length > 0 && (
                    <div style={trackStyles.timelineWrapper}>
                      <TrackingTimeline history={trackingData.tracking_history} />
                    </div>
                  )}
                </>
              )}

              {/* Empty State */}
              {!trackingData && !isSearching && !error && (
                <Card style={trackStyles.tipsCard}>
                  <div style={trackStyles.tipsHeader}>
                    <i className="bi bi-lightbulb me-2" style={{ color: '#ffc107' }}></i>
                    Tracking Tips
                  </div>
                  <Card.Body style={trackStyles.tipsBody}>
                    <div style={trackStyles.tipItem}>
                      <i className="bi bi-info-circle" style={trackStyles.tipIcon}></i>
                      <p style={trackStyles.tipText}>
                        Enter your tracking number exactly as it appears on your shipping receipt.
                      </p>
                    </div>
                    <div style={trackStyles.tipItem}>
                      <i className="bi bi-clock" style={trackStyles.tipIcon}></i>
                      <p style={trackStyles.tipText}>
                        Tracking information may take up to 24 hours to update after shipment.
                      </p>
                    </div>
                    <div style={trackStyles.tipItem}>
                      <i className="bi bi-envelope" style={trackStyles.tipIcon}></i>
                      <p style={trackStyles.tipText}>
                        Contact our support team if you need assistance with your tracking.
                      </p>
                    </div>
                    <div style={{ ...trackStyles.tipItem, marginTop: '8px', paddingTop: '12px', borderTop: '1px solid #e9ecef' }}>
                      <i className="bi bi-question-circle" style={{ ...trackStyles.tipIcon, color: '#ffc107' }}></i>
                      <p style={trackStyles.tipText}>
                        Need help? <a href="/contact" style={{ color: '#0d6efd' }}>Contact our support team</a>
                      </p>
                    </div>
                  </Card.Body>
                </Card>
              )}
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default TrackCargo;