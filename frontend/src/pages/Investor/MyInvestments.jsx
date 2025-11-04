import React, { useEffect, useState } from "react";
import axios from "axios";

const MyInvestments = () => {
  const [investments, setInvestments] = useState([]);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8000/api/investments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInvestments(res.data.data || []);
      } catch (error) {
        console.error("Error fetching investments:", error);
      }
    };
    fetchInvestments();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Your Investments</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700 uppercase text-sm">
              <th className="py-3 px-4">Business</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Status</th>
              {/* Removed Profit column */}
            </tr>
          </thead>
          <tbody>
            {investments.length > 0 ? (
              investments.map((inv) => (
                <tr key={inv.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{inv.business_name || "N/A"}</td>
                  <td className="py-3 px-4">
                    ${Number(inv.amount).toLocaleString()}
                  </td>
                  <td className="py-3 px-4">{inv.investment_date}</td>
                  <td className="py-3 px-4 capitalize">{inv.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-3 px-4 text-center text-gray-500">
                  No investments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyInvestments;
