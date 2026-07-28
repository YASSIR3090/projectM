import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, ListGroup, Badge } from 'react-bootstrap';
import AdminLayout from '../../components/admin/AdminLayout';
import { trackingService } from '../../services/tracking';
import toast from 'react-hot-toast';

const TrackingHistory = () => {
  const { id } = useParams();
  const [history, setHistory] = useState([]);
  const [cargo, setCargo] = useState(null);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await trackingService.getTrackingHistory(id);
        setCargo(data.cargo);
        setHistory(data.tracking_history || []);
      } catch (error) {
        toast.error('Unable to load tracking history');
      }
    };
    loadHistory();
  }, [id]);

  return (
    <AdminLayout>
      <Card className="border-0 shadow-sm">
        <Card.Body>
          <h2 className="mb-4">Tracking History</h2>
          {cargo && (
            <div className="mb-4">
              <h5>{cargo.tracking_number}</h5>
              <p className="mb-0 text-muted">{cargo.customer_name}</p>
            </div>
          )}
          <ListGroup variant="flush">
            {history.length > 0 ? (
              history.map((event) => (
                <ListGroup.Item key={event.id} className="d-flex justify-content-between align-items-start">
                  <div>
                    <div className="fw-bold">{event.status.replace(/_/g, ' ').toUpperCase()}</div>
                    <div className="text-muted">{event.location}</div>
                    <div className="text-muted small">{new Date(event.timestamp).toLocaleString()}</div>
                  </div>
                  <Badge bg="secondary" pill>
                    {event.status}
                  </Badge>
                </ListGroup.Item>
              ))
            ) : (
              <p>No tracking history available for this shipment.</p>
            )}
          </ListGroup>
        </Card.Body>
      </Card>
    </AdminLayout>
  );
};

export default TrackingHistory;
