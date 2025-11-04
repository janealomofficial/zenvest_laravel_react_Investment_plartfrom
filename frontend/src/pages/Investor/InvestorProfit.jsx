import React, { useEffect, useState } from "react";
import api from "../../api/api";
import DashboardLayout from "../../components/layouts/DashboardLayout";

const InvestorProfit = () => {
  const [profits, setProfits] = useState([]);
  const [totalProfit, setTotalProfit] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfits = async () => {
      try {
        const response = await api.get("/investor-profits");

        // The updated API returns: { success, total_earnings, profits }
        const { profits = [], total_earnings = 0 } = response.data;

        setProfits(profits);
        setTotalProfit(total_earnings);
      } catch (err) {
        console.error("Failed to load investor profits:", err);
        setError("Unable to load profit data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfits();
  }, []);

  return (
    <DashboardLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Investor Profit</h2>

        {/* Total Profit Summary */}
        <div className="p-4 bg-yellow-100 rounded shadow mb-6 border border-yellow-300">
          <h3 className="text-lg font-semibold mb-1">My Total Profit</h3>
          <p className="text-xl font-bold text-gray-900">
            ${Number(totalProfit).toLocaleString()}
          </p>
        </div>

        {/* Data States */}
        {loading && <p>Loading profits...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {/* Profit Table */}
        {!loading && !error && profits.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border border-gray-200 bg-white rounded">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-4 py-2">Business</th>
                  <th className="px-4 py-2">Month</th>
                  <th className="px-4 py-2">Year</th>
                  <th className="px-4 py-2">Amount ($)</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {profits.map((profit) => (
                  <tr
                    key={profit.id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-2">
                      {profit.business?.name || "N/A"}
                    </td>
                    <td className="px-4 py-2">{profit.month}</td>
                    <td className="px-4 py-2">{profit.year}</td>
                    <td className="px-4 py-2 font-semibold text-green-700">
                      ${Number(profit.amount).toFixed(2)}
                    </td>
                    <td className="px-4 py-2 capitalize">
                      {profit.status || "credited"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && !error && profits.length === 0 && (
          <p className="text-gray-500">
            No profits distributed yet. Please check back after admin approval.
          </p>
        )}
      </div>
    </DashboardLayout>
  );
};

export default InvestorProfit;
