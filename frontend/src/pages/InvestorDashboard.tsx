import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/layouts/DashboardLayout';

/**
 * Investor dashboard page. Investors and admins can view investment
 * applications from business owners and approve or reject them.
 */
const InvestorDashboard = () => {
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

  const handleApprove = async (id) => {
    try {
      await api.put(`/applications/${id}/approve`);
      setApplications((apps) =>
        apps.map((app) => (app.id === id ? { ...app, status: 'approved' } : app))
      );
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to approve');
    }
  };

  const handleReject = async (id) => {
    try {
      await api.put(`/applications/${id}/reject`);
      setApplications((apps) =>
        apps.map((app) => (app.id === id ? { ...app, status: 'rejected' } : app))
      );
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to reject');
    }
  };

  // Render loading and error states within the dashboard layout
  if (loading)
    return (
      <DashboardLayout>
        <div>Loading applications...</div>
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
      <h3 className="text-xl font-semibold mb-2">Investment Applications</h3>
      {applications.length === 0 ? (
        <p>No applications available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Business</th>
                <th className="px-4 py-2">Owner</th>
                <th className="px-4 py-2">Funding Amount</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="border-b">
                  <td className="px-4 py-2">{app.business_name}</td>
                  <td className="px-4 py-2">{app.owner?.name}</td>
                  <td className="px-4 py-2">${app.funding_amount.toFixed(2)}</td>
                  <td className="px-4 py-2 capitalize">{app.status}</td>
                  <td className="px-4 py-2 space-x-2">
                    {app.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleApprove(app.id)}
                          className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(app.id)}
                          className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
};

export default InvestorDashboard;