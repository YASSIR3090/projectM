import React, { useEffect, useState } from 'react';
import { Table, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { cargoService } from '../../services/cargo';
import toast from 'react-hot-toast';

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const data = await cargoService.getCustomers();
        setCustomers(data.results || data);
      } catch (error) {
        toast.error('Unable to load customers');
      }
    };
    loadCustomers();
  }, []);

  return (
    <AdminLayout>
      <Card className="border-0 shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Customers</h2>
          </div>
          <div className="table-responsive">
            <Table hover className="mb-0">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Shipments</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.shipment_count}</td>
                    <td>
                      <Link to={`/admin/customers/${customer.id}`} className="text-decoration-none">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </AdminLayout>
  );
};

export default Customers;
