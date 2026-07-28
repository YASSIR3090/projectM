import React, { useEffect, useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import AdminLayout from '../../components/admin/AdminLayout';
import { settingsService } from '../../services/settings';
import toast from 'react-hot-toast';

const Settings = () => {
  const [settings, setSettings] = useState({ company_name: '', support_email: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await settingsService.getSettings();
        setSettings(data);
      } catch (error) {
        toast.error('Unable to load settings');
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await settingsService.updateSettings(settings);
      toast.success('Settings saved');
    } catch (error) {
      toast.error('Unable to save settings');
    }
  };

  return (
    <AdminLayout>
      <Card className="border-0 shadow-sm">
        <Card.Body>
          <h2 className="mb-4">Settings</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                name="company_name"
                value={settings.company_name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Support Email</Form.Label>
              <Form.Control
                name="support_email"
                value={settings.support_email}
                onChange={handleChange}
              />
            </Form.Group>
            <Button type="submit" variant="primary" disabled={loading}>
              Save Settings
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </AdminLayout>
  );
};

export default Settings;
