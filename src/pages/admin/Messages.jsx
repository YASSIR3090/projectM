import React, { useEffect, useState } from 'react';
import { Table, Card, Badge } from 'react-bootstrap';
import AdminLayout from '../../components/admin/AdminLayout';
import { cargoService } from '../../services/cargo';
import toast from 'react-hot-toast';

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const data = await cargoService.getMessages();
        setMessages(data.results || data);
      } catch (error) {
        toast.error('Unable to load messages');
      }
    };
    loadMessages();
  }, []);

  return (
    <AdminLayout>
      <Card className="border-0 shadow-sm">
        <Card.Body>
          <h2 className="mb-4">Messages</h2>
          <div className="table-responsive">
            <Table hover className="mb-0">
              <thead>
                <tr>
                  <th>From</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((message) => (
                  <tr key={message.id}>
                    <td>{message.sender_name}</td>
                    <td>{message.subject}</td>
                    <td>
                      <Badge bg={message.status === 'unread' ? 'warning' : 'secondary'}>
                        {message.status}
                      </Badge>
                    </td>
                    <td>{new Date(message.created_at).toLocaleDateString()}</td>
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

export default Messages;
