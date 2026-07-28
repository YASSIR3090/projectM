import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge } from 'react-bootstrap';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import AdminLayout from '../../components/admin/AdminLayout';
import { cargoService } from '../../services/cargo';
import toast from 'react-hot-toast';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    delivered: 0,
    in_transit: 0,
    pending: 0,
  });
  const [recentCargo, setRecentCargo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const [statsData, cargoData] = await Promise.all([
        cargoService.getStats(),
        cargoService.getCargo({ limit: 10, ordering: '-created_at' }),
      ]);
      setStats(statsData);
      setRecentCargo(cargoData.results || cargoData);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const chartData = {
    labels: ['Total', 'Delivered', 'In Transit', 'Pending'],
    datasets: [
      {
        label: 'Shipments',
        data: [stats.total, stats.delivered, stats.in_transit, stats.pending],
        backgroundColor: ['#0d6efd', '#198754', '#ffc107', '#dc3545'],
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Shipment Overview',
        font: { size: 16, weight: 'bold' },
      },
    },
  };

  const getStatusBadge = (status) => {
    const colors = {
      delivered: 'success',
      in_transit: 'info',
      pending: 'warning',
      cancelled: 'danger',
      arrived: 'primary',
      out_for_delivery: 'info',
    };
    return colors[status] || 'secondary';
  };

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Dashboard</h2>
      </div>

      <Row className="g-4 mb-4">
        <Col md={3} sm={6}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="bg-primary bg-opacity-10 rounded-circle p-3 me-3">
                  <i className="bi bi-box-seam text-primary fs-2"></i>
                </div>
                <div>
                  <h6 className="text-muted mb-0">Total Shipments</h6>
                  <h3 className="fw-bold mb-0">{stats.total}</h3>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="bg-success bg-opacity-10 rounded-circle p-3 me-3">
                  <i className="bi bi-check-circle text-success fs-2"></i>
                </div>
                <div>
                  <h6 className="text-muted mb-0">Delivered</h6>
                  <h3 className="fw-bold mb-0">{stats.delivered}</h3>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="bg-warning bg-opacity-10 rounded-circle p-3 me-3">
                  <i className="bi bi-truck text-warning fs-2"></i>
                </div>
                <div>
                  <h6 className="text-muted mb-0">In Transit</h6>
                  <h3 className="fw-bold mb-0">{stats.in_transit}</h3>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="bg-danger bg-opacity-10 rounded-circle p-3 me-3">
                  <i className="bi bi-clock-history text-danger fs-2"></i>
                </div>
                <div>
                  <h6 className="text-muted mb-0">Pending</h6>
                  <h3 className="fw-bold mb-0">{stats.pending}</h3>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-4">
        <Col lg={8}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <Bar data={chartData} options={chartOptions} height={250} />
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white fw-bold">Quick Actions</Card.Header>
            <Card.Body className="d-grid gap-2">
              <button className="btn btn-primary">
                <i className="bi bi-plus-lg me-2"></i>Create New Shipment
              </button>
              <button className="btn btn-outline-primary">
                <i className="bi bi-search me-2"></i>Track Shipment
              </button>
              <button className="btn btn-outline-success">
                <i className="bi bi-download me-2"></i>Export Report
              </button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white fw-bold">
              Recent Shipments
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table hover className="mb-0">
                  <thead>
                    <tr>
                      <th>Tracking #</th>
                      <th>Customer</th>
                      <th>Origin</th>
                      <th>Destination</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentCargo.map((item) => (
                      <tr key={item.id}>
                        <td className="fw-bold">{item.tracking_number}</td>
                        <td>{item.customer_name}</td>
                        <td>{item.origin_country}</td>
                        <td>{item.destination_country}</td>
                        <td>
                          <Badge bg={getStatusBadge(item.current_status)}>
                            {item.current_status.replace(/_/g, ' ').toUpperCase()}
                          </Badge>
                        </td>
                        <td>{new Date(item.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default Dashboard;
