import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/layouts/DashboardLayout';

/**
 * Business owner dashboard page. Shows applications submitted by the
 * logged-in business owner and provides a link to submit a new one.
 */
const OwnerDashboard = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get('/applications');
        setApplications(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load applications');
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  if (loading)
    return (
      <DashboardLayout>
        <div>Loading your applications...</div>
      </DashboardLayout>
    );
  if (error)
    return (
      <DashboardLayout>
        <div className="text-red-500">{error}</div>
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-4">Welcome, {user?.name}</h2>
      <div className="mb-4">
        <Link to="/applications/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Submit New Application
        </Link>
      </div>
      <h3 className="text-xl font-semibold mb-2">Your Applications</h3>
      {applications.length === 0 ? (
        <p>You have not submitted any applications yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Business</th>
                <th className="px-4 py-2">Funding Amount</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="border-b">
                  <td className="px-4 py-2">{app.business_name}</td>
                  <td className="px-4 py-2">${app.funding_amount.toFixed(2)}</td>
                  <td className="px-4 py-2 capitalize">{app.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
};

export default OwnerDashboard;