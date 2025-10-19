import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/layouts/DashboardLayout';

/**
 * Investments page lists all investments made by the logged-in investor.
 */
const InvestmentPage = () => {
  const { user } = useAuth();
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const response = await api.get('/investments');
        setInvestments(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load investments');
      } finally {
        setLoading(false);
      }
    };
    fetchInvestments();
  }, []);

  if (loading)
    return (
      <DashboardLayout>
        <div>Loading investments...</div>
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
      <h2 className="text-2xl font-bold mb-4">Your Investments</h2>
      {investments.length === 0 ? (
        <p>You have not made any investments yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Business</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Profit</th>
              </tr>
            </thead>
            <tbody>
              {investments.map((inv) => (
                <tr key={inv.id} className="border-b">
                  <td className="px-4 py-2">{inv.application?.business_name}</td>
                  <td>${Number(inv.amount || 0).toFixed(2)}</td> 
                  <td className="px-4 py-2">{inv.investment_date}</td>
                  <td className="px-4 py-2 capitalize">{inv.status}</td>
                  <td className="px-4 py-2">
                    {inv.profit !== null ? `$${inv.profit.toFixed(2)}` : '-'}
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

export default InvestmentPage;