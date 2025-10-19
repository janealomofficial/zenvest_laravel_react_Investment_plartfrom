import React, { useEffect, useState } from "react";
import api from "../../api/api";
import DashboardLayout from "../../components/layouts/DashboardLayout";

const Businesses = () => {
    const [businesses, setBusinesses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editBusiness, setEditBusiness] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        status: "",
        funding_amount: "",
    });

    // Fetch all businesses
    useEffect(() => {
        const fetchBusinesses = async () => {
            try {
                const response = await api.get("/businesses");
                setBusinesses(response.data.data || []);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load businesses");
            } finally {
                setLoading(false);
            }
        };
        fetchBusinesses();
    }, []);

    // Handle delete
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this business?")) return;
        try {
            await api.delete(`/businesses/${id}`);
            setBusinesses((prev) => prev.filter((b) => b.id !== id));
        } catch (err) {
            alert(err.response?.data?.message || "Failed to delete business");
        }
    };

    // Open edit modal
    const handleEdit = (business) => {
        setEditBusiness(business);
        setFormData({
            name: business.name,
            status: business.status,
            funding_amount: business.funding_amount,
        });
    };

    // Save edits
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await api.put(`/businesses/${editBusiness.id}`, formData);
            setBusinesses((prev) =>
                prev.map((b) => (b.id === editBusiness.id ? response.data.data : b))
            );
            setEditBusiness(null);
            alert("Business updated successfully!");
        } catch (err) {
            alert(err.response?.data?.message || "Failed to update business");
        }
    };

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // UI states
    if (loading)
        return (
            <DashboardLayout>
                <div>Loading businesses...</div>
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
            <h2 className="text-2xl font-bold mb-4">Manage Businesses</h2>

            {businesses.length === 0 ? (
                <p>No businesses found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Owner</th>
                                <th className="px-4 py-2">Funding Amount</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {businesses.map((b) => (
                                <tr key={b.id} className="border-b">
                                    <td className="px-4 py-2">{b.name}</td>
                                    <td className="px-4 py-2">{b.owner?.name || "N/A"}</td>
                                    <td className="px-4 py-2">${b.funding_amount?.toLocaleString()}</td>
                                    <td className="px-4 py-2 capitalize">{b.status}</td>
                                    <td className="px-4 py-2 space-x-2">
                                        <button
                                            onClick={() => handleEdit(b)}
                                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(b.id)}
                                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Edit modal */}
            {editBusiness && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Edit Business</h3>
                        <form onSubmit={handleUpdate} className="space-y-3">
                            <div>
                                <label className="block mb-1 text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1 text-gray-700">Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-1 text-gray-700">Funding Amount</label>
                                <input
                                    type="number"
                                    name="funding_amount"
                                    value={formData.funding_amount}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded"
                                />
                            </div>
                            <div className="flex justify-end space-x-3 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setEditBusiness(null)}
                                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
};

export default Businesses;
