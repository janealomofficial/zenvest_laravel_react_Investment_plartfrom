import React, { useEffect, useState } from "react";
import api from "../../api/api";
import DashboardLayout from "../../components/layouts/DashboardLayout";

const MonthlyProfitsPage = () => {
  const [profits, setProfits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(false); // to re-fetch after approval

  useEffect(() => {
    const fetchProfits = async () => {
      try {
        const response = await api.get("/monthly-profits");
        const list = response.data.data || response.data;
        setProfits(Array.isArray(list) ? list : []);
      } catch (err: any) {
        console.error("Error loading profits:", err);
        setError(err.response?.data?.message || "Failed to load monthly profits");
      } finally {
        setLoading(false);
      }
    };

    fetchProfits();
  }, [refresh]);

  const handleApprove = async (id: number) => {
    try {
      await api.post(`/monthly-profits/${id}/approve`);
      setProfits((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: "approved" } : p))
      );
      setRefresh((prev) => !prev);
    } catch (err) {
      console.error("Failed to approve profit:", err);
      alert("Failed to approve profit. Check backend logs or database.");
    }
  };

  const handleDownload = (id: number) => {
    const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";
    const url = `${baseURL}/monthly-profits/${id}/invoice`;
    window.open(url, "_blank"); // opens in a new tab
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Monthly Profit Submissions</h2>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && profits.length === 0 && (
          <p className="text-gray-600">No monthly profit submissions found.</p>
        )}

        {!loading && profits.length > 0 && (
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Business</th>
                <th className="border p-2 text-left">Month</th>
                <th className="border p-2 text-left">Year</th>
                <th className="border p-2 text-left">Profit</th>
                <th className="border p-2 text-left">Status</th>
                <th className="border p-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {profits.map((profit) => (
                <tr key={profit.id}>
                  <td className="border p-2">{profit.business?.name || "N/A"}</td>
                  <td className="border p-2">{profit.month}</td>
                  <td className="border p-2">{profit.year}</td>
                  <td className="border p-2">${profit.profit_amount.toLocaleString()}</td>
                  <td className="border p-2 capitalize">{profit.status}</td>
                  <td className="border p-2">
                    {profit.status === "pending" ? (
                      <button
                        onClick={() => handleApprove(profit.id)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                      >
                        Approve
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <span className="text-green-700 font-semibold">Approved</span>
                        <button
                          onClick={() => handleDownload(profit.id)}
                          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                        >
                          Download PDF
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MonthlyProfitsPage;
