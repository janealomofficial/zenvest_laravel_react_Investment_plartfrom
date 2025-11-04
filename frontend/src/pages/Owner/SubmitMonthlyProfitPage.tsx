import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../components/layouts/DashboardLayout";

/**
 * SubmitMonthlyProfitPage
 * -----------------------
 * Business owners use this page to submit monthly profit reports.
 * Includes a reminder to submit by the 5th of each month,
 * plus a live countdown to the next deadline.
 */

const SubmitMonthlyProfitPage = () => {
  const { user } = useAuth();

  const [businesses, setBusinesses] = useState<any[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState("");
  const [formData, setFormData] = useState({
    month: "",
    year: "",
    profit_amount: "",
    platform_fee_percent: "",
    proof_file: null as File | null,
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [countdown, setCountdown] = useState("");

  // ⏳ Countdown to next 5th of the month
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      const targetMonth = now.getDate() > 5 ? currentMonth + 1 : currentMonth;
      const targetYear = targetMonth > 11 ? currentYear + 1 : currentYear;
      const adjustedMonth = targetMonth % 12;

      const targetDate = new Date(targetYear, adjustedMonth, 5, 23, 59, 59);
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setCountdown("Deadline has passed. Submissions open for next month soon!");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s left`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // 📦 Fetch businesses for this owner
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await api.get("/businesses");
        setBusinesses(response.data.data || response.data);
      } catch (error) {
        console.error("Error loading businesses:", error);
      }
    };
    fetchBusinesses();
  }, []);

  // 📋 Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as any;
    if (files) setFormData({ ...formData, [name]: files[0] });
    else setFormData({ ...formData, [name]: value });
  };

  // 🚀 Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    if (!selectedBusiness) {
      setErrorMessage("Please select a business before submitting.");
      setLoading(false);
      return;
    }

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) payload.append(key, value as any);
      });

      await api.post(`/businesses/${selectedBusiness}/profits`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccessMessage("✅ Monthly profit submitted successfully!");
      setFormData({
        month: "",
        year: "",
        profit_amount: "",
        platform_fee_percent: "",
        proof_file: null,
      });
      setSelectedBusiness("");
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.response?.data?.message || "Failed to submit profit report");
    } finally {
      setLoading(false);
    }
  };

  // 🗓️ Generate year options dynamically (previous, current, next few years)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 6 }, (_, i) => currentYear - 1 + i);

  return (
    <DashboardLayout>
      <div className="flex justify-center items-center min-h-[80vh]">
        <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-2 text-center">Submit Monthly Profit</h2>
          <p className="text-gray-600 text-center mb-6">
            Hello <strong>{user?.name}</strong>, please submit your monthly profit report below.
          </p>

          {/* Notice Banner */}
          <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-3 rounded-md mb-6 text-center">
            <strong>Reminder:</strong> Please submit your monthly profit report by the{" "}
            <strong>5th of every month</strong>. <br />
            <span className="text-sm text-gray-700">Next deadline: {countdown}</span>
          </div>

          {/* 🧾 Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* ✅ Business Selector */}
            <div>
              <label className="block font-medium mb-1">Select Business</label>
              <select
                value={selectedBusiness}
                onChange={(e) => setSelectedBusiness(e.target.value)}
                required
                className="w-full border border-gray-300 rounded p-2"
              >
                <option value="">-- Select Business --</option>
                {businesses.map((biz) => (
                  <option key={biz.id} value={biz.id}>
                    {biz.name}
                  </option>
                ))}
              </select>
            </div>

            {/* ✅ Month and Year Dropdowns */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block font-medium mb-1">Month</label>
                <select
                  name="month"
                  value={formData.month}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded p-2"
                >
                  <option value="">-- Select Month --</option>
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </div>

              <div className="flex-1">
                <label className="block font-medium mb-1">Year</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded p-2"
                >
                  <option value="">-- Select Year --</option>
                  {yearOptions.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-medium mb-1">Profit Amount ($)</label>
              <input
                type="number"
                name="profit_amount"
                value={formData.profit_amount}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Platform Fee (%)</label>
              <input
                type="number"
                name="platform_fee_percent"
                value={formData.platform_fee_percent}
                onChange={handleChange}
                placeholder="Leave empty for default 5%"
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Proof File (PDF, JPG, XLSX)</label>
              <input
                type="file"
                name="proof_file"
                onChange={handleChange}
                accept=".pdf,.jpg,.jpeg,.png,.xlsx"
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>

            {successMessage && <p className="text-green-600">{successMessage}</p>}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Profit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SubmitMonthlyProfitPage;
