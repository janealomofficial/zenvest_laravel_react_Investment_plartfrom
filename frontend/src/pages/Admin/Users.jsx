import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import DashboardLayout from '../../components/layouts/DashboardLayout';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [updatedRole, setUpdatedRole] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        setUsers(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await api.delete(`/users/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete user');
    }
  };

  const handleEdit = (user) => {
    setEditUser(user.id);
    setUpdatedRole(user.role);
  };

  const handleUpdate = async (id) => {
    try {
      await api.put(`/users/${id}`, { role: updatedRole });
      setUsers((prev) =>
        prev.map((u) =>
          u.id === id ? { ...u, role: updatedRole } : u
        )
      );
      setEditUser(null);
      alert('User updated successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update user');
    }
  };

  if (loading)
    return (
      <DashboardLayout>
        <div>Loading users...</div>
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
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b">
                  <td className="px-4 py-2">{u.name}</td>
                  <td className="px-4 py-2">{u.email}</td>
                  <td className="px-4 py-2">
                    {editUser === u.id ? (
                      <select
                        value={updatedRole}
                        onChange={(e) => setUpdatedRole(e.target.value)}
                        className="border rounded px-2 py-1"
                      >
                        <option value="admin">Admin</option>
                        <option value="investor">Investor</option>
                        <option value="business_owner">Business Owner</option>
                      </select>
                    ) : (
                      u.role.charAt(0).toUpperCase() + u.role.slice(1)
                    )}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {editUser === u.id ? (
                      <button
                        onClick={() => handleUpdate(u.id)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 mr-2"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(u)}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 mr-2"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(u.id)}
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
    </DashboardLayout>
  );
};

export default Users;
