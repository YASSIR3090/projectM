import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, ListGroup } from 'react-bootstrap';
import AdminLayout from '../../components/admin/AdminLayout';
import { cargoService } from '../../services/cargo';
import toast from 'react-hot-toast';

const CustomerDetail = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const loadCustomer = async () => {
      try {
        const data = await cargoService.getCustomerById(id);
        setCustomer(data);
      } catch (error) {
        toast.error('Unable to load customer details');
      }
    };
    loadCustomer();
  }, [id]);

  return (
    <AdminLayout>
      <Card className="border-0 shadow-sm">
        <Card.Body>
          <h2 className="mb-4">Customer Details</h2>
          {customer ? (
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>Name:</strong> {customer.name}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Email:</strong> {customer.email}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Phone:</strong> {customer.phone}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Shipments:</strong> {customer.shipment_count}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Address:</strong> {customer.address || 'N/A'}
              </ListGroup.Item>
            </ListGroup>
          ) : (
            <p>Loading customer details…</p>
          )}
        </Card.Body>
      </Card>
    </AdminLayout>
  );
};

export default CustomerDetail;
