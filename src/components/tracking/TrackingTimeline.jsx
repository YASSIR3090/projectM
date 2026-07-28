import React from 'react';
import { Card, Badge } from 'react-bootstrap';

const TrackingTimeline = ({ history }) => {
  const getStatusIcon = (status) => {
    const icons = {
      received: 'bi-box-arrow-in-right',
      warehouse: 'bi-building',
      processing: 'bi-gear',
      packed: 'bi-box-seam',
      ready_for_shipment: 'bi-rocket',
      export_customs: 'bi-file-check',
      in_transit: 'bi-truck',
      airport: 'bi-airplane',
      seaport: 'bi-ship',
      arrived: 'bi-geo-alt',
      import_customs: 'bi-file-check',
      local_warehouse: 'bi-building',
      out_for_delivery: 'bi-truck-front',
      delivered: 'bi-check-circle-fill',
    };
    return icons[status] || 'bi-circle';
  };

  const getStatusColor = (status) => {
    const colors = {
      delivered: 'success',
      pending: 'warning',
      in_transit: 'info',
      cancelled: 'danger',
      arrived: 'primary',
      out_for_delivery: 'info',
    };
    return colors[status] || 'secondary';
  };

  return (
    <Card className="shadow-sm border-0">
      <Card.Header className="bg-light py-3">
        <h5 className="mb-0">
          <i className="bi bi-clock-history me-2"></i>
          Tracking Timeline
        </h5>
      </Card.Header>
      <Card.Body className="p-4">
        <div className="timeline">
          {history.map((item, index) => (
            <div key={item.id} className="timeline-item position-relative pb-4">
              <div className="d-flex align-items-start">
                <div className="timeline-icon me-3">
                  <div className={`bg-${getStatusColor(item.status)} bg-opacity-10 rounded-circle p-2`}>
                    <i className={`bi ${getStatusIcon(item.status)} text-${getStatusColor(item.status)} fs-4`}></i>
                  </div>
                </div>
                <div className="timeline-content flex-grow-1">
                  <div className="d-flex justify-content-between align-items-start flex-wrap">
                    <div>
                      <h6 className="mb-0 fw-bold">
                        {item.status.replace(/_/g, ' ').toUpperCase()}
                      </h6>
                      {item.location && (
                        <p className="mb-1 text-muted small">
                          <i className="bi bi-geo-alt me-1"></i>
                          {item.location}
                        </p>
                      )}
                      {item.description && (
                        <p className="mb-0 text-muted small">{item.description}</p>
                      )}
                    </div>
                    <Badge bg={getStatusColor(item.status)} className="mt-1 mt-sm-0">
                      {new Date(item.tracking_date).toLocaleDateString()} {item.tracking_time}
                    </Badge>
                  </div>
                </div>
              </div>
              {index < history.length - 1 && (
                <div className="timeline-line position-absolute" style={{
                  left: '28px',
                  top: '42px',
                  bottom: '0',
                  width: '2px',
                  background: '#e0e0e0',
                }} />
              )}
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default TrackingTimeline;
