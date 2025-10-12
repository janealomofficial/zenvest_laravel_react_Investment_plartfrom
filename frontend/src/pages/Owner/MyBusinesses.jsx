import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../../components/layouts/DashboardLayout';

/**
 * MyBusinesses page for business owners. This page lists all businesses
 * associated with the logged in business owner. For now, it simply
 * fetches a list of businesses from the backend and displays their
 * names and any relevant details. If there are no businesses, it
 * shows a friendly message. Errors and loading states are handled
 * within the layout.
 */
const MyBusinesses = () => {
  const { user } = useAuth();
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        // Attempt to fetch businesses for the authenticated owner.
        // The exact endpoint may vary depending on your API. Adjust
        // `/businesses` as needed.
        const response = await api.get('/businesses');
        setBusinesses(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load businesses');
      } finally {
        setLoading(false);
      }
    };
    fetchBusinesses();
  }, []);

  if (loading)
    return (
      <DashboardLayout>
        <div>Loading your businesses...</div>
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
      <h3 className="text-xl font-semibold mb-2">Your Businesses</h3>
      {businesses.length === 0 ? (
        <p>You currently have no registered businesses.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Business Name</th>
                <th className="px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {businesses.map((biz) => (
                <tr key={biz.id} className="border-b">
                  <td className="px-4 py-2">{biz.name}</td>
                  <td className="px-4 py-2">{biz.description || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
};

export default MyBusinesses;