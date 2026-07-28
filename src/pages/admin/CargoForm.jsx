import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import AdminLayout from '../../components/admin/AdminLayout';
import { cargoService } from '../../services/cargo';
import toast from 'react-hot-toast';

const CargoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cargo, setCargo] = useState({
    tracking_number: '',
    customer_name: '',
    sender_name: '',
    receiver_name: '',
    origin_country: '',
    destination_country: '',
    cargo_type: '',
    weight: '',
    current_status: 'pending',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const loadCargo = async () => {
        setLoading(true);
        try {
          const data = await cargoService.getCargoById(id);
          setCargo(data);
        } catch (error) {
          toast.error('Unable to load shipment details');
        } finally {
          setLoading(false);
        }
      };
      loadCargo();
    }
  }, [id]);

  const handleChange = (e) => {
    setCargo({ ...cargo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await cargoService.updateCargo(id, cargo);
        toast.success('Shipment updated successfully');
      } else {
        await cargoService.createCargo(cargo);
        toast.success('Shipment created successfully');
      }
      navigate('/admin/cargo');
    } catch (error) {
      toast.error('Failed to save shipment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <Card className="border-0 shadow-sm">
        <Card.Body>
          <h2 className="mb-4">{id ? 'Edit Shipment' : 'New Shipment'}</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Tracking Number</Form.Label>
              <Form.Control
                name="tracking_number"
                value={cargo.tracking_number}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control
                name="customer_name"
                value={cargo.customer_name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Sender Name</Form.Label>
              <Form.Control
                name="sender_name"
                value={cargo.sender_name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Receiver Name</Form.Label>
              <Form.Control
                name="receiver_name"
                value={cargo.receiver_name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Origin Country</Form.Label>
              <Form.Control
                name="origin_country"
                value={cargo.origin_country}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Destination Country</Form.Label>
              <Form.Control
                name="destination_country"
                value={cargo.destination_country}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cargo Type</Form.Label>
              <Form.Control
                name="cargo_type"
                value={cargo.cargo_type}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Weight (kg)</Form.Label>
              <Form.Control
                name="weight"
                type="number"
                value={cargo.weight}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select name="current_status" value={cargo.current_status} onChange={handleChange}>
                <option value="pending">Pending</option>
                <option value="in_transit">In Transit</option>
                <option value="arrived">Arrived</option>
                <option value="delivered">Delivered</option>
              </Form.Select>
            </Form.Group>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save Shipment'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </AdminLayout>
  );
};

export default CargoForm;
