import React, { useState, useEffect } from 'react';
import { usersAPI } from '../../api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const allUsers = await usersAPI.getAllUsers();
      setUsers(allUsers);
    } catch (err) {
      setError('Failed to load users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await usersAPI.updateUserRole(userId, newRole);
      setUsers(users.map(user => 
        user._id === userId ? { ...user, role: newRole } : user
      ));
    } catch (err) {
      setError('Failed to update user role');
      console.error('Error updating user role:', err);
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      await usersAPI.updateUserStatus(userId, newStatus);
      setUsers(users.map(user => 
        user._id === userId ? { ...user, status: newStatus } : user
      ));
    } catch (err) {
      setError('Failed to update user status');
      console.error('Error updating user status:', err);
    }
  };

  const handleApproveSeller = async (userId) => {
    try {
      await usersAPI.approveSeller(userId);
      fetchUsers();
    } catch (err) {
      setError('Failed to approve seller application');
    }
  };

  const handleRejectSeller = async (userId) => {
    try {
      await usersAPI.rejectSeller(userId);
      fetchUsers();
    } catch (err) {
      setError('Failed to reject seller application');
    }
  };

  const getRoleColor = (role) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'user':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesRole = roleFilter === 'all' || user.role.toLowerCase() === roleFilter;
    const matchesSearch = 
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="w-full md:w-48">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="px-3 py-1 rounded-full text-sm font-medium border focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={user.status}
                    onChange={(e) => handleStatusChange(user._id, e.target.value)}
                    className="px-3 py-1 rounded-full text-sm font-medium border focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => setSelectedUser(selectedUser === user._id ? null : user._id)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    {selectedUser === user._id ? 'Hide Details' : 'View Details'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium mb-4">User Details</h3>
          {(() => {
            const user = users.find(u => u._id === selectedUser);
            if (!user) return null;
            return (
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Address</h4>
                  <p className="mt-1 text-sm text-gray-900">
                    {user.address?.street}<br />
                    {user.address?.city}, {user.address?.state} {user.address?.zipCode}<br />
                    {user.address?.country}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Phone</h4>
                  <p className="mt-1 text-sm text-gray-900">{user.phone || 'Not provided'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Joined Date</h4>
                  <p className="mt-1 text-sm text-gray-900">{new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
                {user.pendingAdmin && (
                  <div className="p-4 bg-yellow-50 rounded">
                    <h4 className="text-sm font-medium text-yellow-700 mb-2">Seller Application Pending</h4>
                    <div className="mb-2 text-sm text-gray-700">GST Number: {user.gstNumber}</div>
                    <div className="mb-2 text-sm text-gray-700">Account Holder: {user.bankDetails?.accountHolder}</div>
                    <div className="mb-2 text-sm text-gray-700">Account Number: {user.bankDetails?.accountNumber}</div>
                    <div className="mb-2 text-sm text-gray-700">IFSC: {user.bankDetails?.ifsc}</div>
                    <div className="mb-2 text-sm text-gray-700">Bank Name: {user.bankDetails?.bankName}</div>
                    <div className="mb-2 text-sm text-gray-700">Branch: {user.bankDetails?.branch}</div>
                    <div className="flex gap-4 mt-4">
                      <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" onClick={() => handleApproveSeller(user._id)}>Approve</button>
                      <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700" onClick={() => handleRejectSeller(user._id)}>Reject</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default UserManagement; 