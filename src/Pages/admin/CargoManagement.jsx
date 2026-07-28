import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Card, Badge } from 'react-bootstrap';
import AdminLayout from '../../components/admin/AdminLayout';
import { cargoService } from '../../services/cargo';
import toast from 'react-hot-toast';

const CargoManagement = () => {
  const [cargoList, setCargoList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCargo = async () => {
      setLoading(true);
      try {
        const data = await cargoService.getCargo({ ordering: '-created_at' });
        setCargoList(data.results || data);
      } catch (error) {
        toast.error('Unable to load cargo shipments');
      } finally {
        setLoading(false);
      }
    };
    fetchCargo();
  }, []);

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Cargo Management</h2>
        <Button as={Link} to="/admin/cargo/new" variant="primary">
          New Shipment
        </Button>
      </div>

      <Card className="border-0 shadow-sm">
        <Card.Body>
          <div className="table-responsive">
            <Table hover className="mb-0">
              <thead>
                <tr>
                  <th>Tracking #</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Origin</th>
                  <th>Destination</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cargoList.map((item) => (
                  <tr key={item.id}>
                    <td>{item.tracking_number}</td>
                    <td>{item.customer_name}</td>
                    <td>
                      <Badge bg={item.current_status === 'delivered' ? 'success' : 'info'}>
                        {item.current_status.replace(/_/g, ' ').toUpperCase()}
                      </Badge>
                    </td>
                    <td>{item.origin_country}</td>
                    <td>{item.destination_country}</td>
                    <td className="d-flex gap-2 flex-wrap">
                      <Button as={Link} to={`/admin/cargo/${item.id}/tracking`} size="sm" variant="outline-primary">
                        History
                      </Button>
                      <Button as={Link} to={`/admin/cargo/${item.id}/edit`} size="sm" variant="outline-secondary">
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {loading && <p className="text-center mt-3">Loading shipments…</p>}
            {!loading && cargoList.length === 0 && <p className="text-center mt-3">No cargo shipments available.</p>}
          </div>
        </Card.Body>
      </Card>
    </AdminLayout>
  );
};

export default CargoManagement;
