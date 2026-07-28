import React, { useEffect, useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (user) {
      setProfile(user);
    }
  }, [user]);

  return (
    <AdminLayout>
      <Card className="border-0 shadow-sm">
        <Card.Body>
          <h2 className="mb-4">Profile</h2>
          {profile ? (
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>Username:</strong> {profile.username}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Email:</strong> {profile.email || 'admin@example.com'}</ListGroup.Item>
              <ListGroup.Item>
                <strong>Role:</strong> {profile.role || 'Administrator'}</ListGroup.Item>
            </ListGroup>
          ) : (
            <p>Loading profile…</p>
          )}
        </Card.Body>
      </Card>
    </AdminLayout>
  );
};

export default Profile;
