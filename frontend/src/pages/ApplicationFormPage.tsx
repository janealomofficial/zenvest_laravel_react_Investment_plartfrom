import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import DashboardLayout from '../components/layouts/DashboardLayout';

/**
 * Form for business owners to submit a new investment application.
 */
const ApplicationFormPage = () => {
  const navigate = useNavigate();
  const [businessName, setBusinessName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [revenue, setRevenue] = useState('');
  const [profit, setProfit] = useState('');
  const [fundingAmount, setFundingAmount] = useState('');
  const [pitchDeck, setPitchDeck] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('business_name', businessName);
      formData.append('description', description);
      formData.append('category', category);
      if (revenue) formData.append('revenue', revenue);
      if (profit) formData.append('profit', profit);
      formData.append('funding_amount', fundingAmount);
      if (pitchDeck) formData.append('pitch_deck', pitchDeck);
      await api.post('/applications', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Submit Investment Application</h2>
        {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1" htmlFor="business_name">Business Name *</label>
          <input
            type="text"
            id="business_name"
            className="w-full px-3 py-2 border rounded"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1" htmlFor="description">Description</label>
          <textarea
            id="description"
            className="w-full px-3 py-2 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1" htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            className="w-full px-3 py-2 border rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1" htmlFor="revenue">Revenue ($)</label>
            <input
              type="number"
              id="revenue"
              className="w-full px-3 py-2 border rounded"
              value={revenue}
              onChange={(e) => setRevenue(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label className="block mb-1" htmlFor="profit">Profit ($)</label>
            <input
              type="number"
              id="profit"
              className="w-full px-3 py-2 border rounded"
              value={profit}
              onChange={(e) => setProfit(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>
        </div>
        <div>
          <label className="block mb-1" htmlFor="funding_amount">Funding Amount Requested ($) *</label>
          <input
            type="number"
            id="funding_amount"
            className="w-full px-3 py-2 border rounded"
            value={fundingAmount}
            onChange={(e) => setFundingAmount(e.target.value)}
            required
            min="1"
            step="0.01"
          />
        </div>
        <div>
          <label className="block mb-1" htmlFor="pitch_deck">Pitch Deck (PDF)</label>
          <input
            type="file"
            id="pitch_deck"
            accept="application/pdf"
            onChange={(e) => {
              const file = e.target.files?.[0];
              setPitchDeck(file || null);
            }}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Application'}
        </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default ApplicationFormPage;