import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { usersAPI } from '../services/api';

const UserProfile = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    }
  });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showSellerForm, setShowSellerForm] = useState(false);
  const [sellerForm, setSellerForm] = useState({
    gstNumber: '',
    accountHolder: '',
    accountNumber: '',
    ifsc: '',
    bankName: '',
    branch: ''
  });
  const [sellerMessage, setSellerMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: {
          street: user.address?.street || '',
          city: user.address?.city || '',
          state: user.address?.state || '',
          zipCode: user.address?.zipCode || '',
          country: user.address?.country || ''
        }
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await usersAPI.updateProfile(formData);
      updateUser(response.data || response);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setIsEditing(false);
    } catch (error) {
      let errorMsg = 'Failed to update profile';
      if (error.response && error.response.data && error.response.data.error) {
        errorMsg = error.response.data.error;
      } else if (error.message) {
        errorMsg = error.message;
      }
      setMessage({ type: 'error', text: errorMsg });
      console.error('Profile update error:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">My Profile</h2>
        
        {message.text && (
          <div className={`p-4 mb-4 rounded ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="border-t pt-4">
              <h3 className="text-lg font-medium mb-4">Address</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Street</label>
                  <input
                    type="text"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <input
                      type="text"
                      name="address.city"
                      value={formData.address.city}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">State</label>
                    <input
                      type="text"
                      name="address.state"
                      value={formData.address.state}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                    <input
                      type="text"
                      name="address.zipCode"
                      value={formData.address.zipCode}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Country</label>
                    <input
                      type="text"
                      name="address.country"
                      value={formData.address.country}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>

        {!user?.isAdmin && !user?.pendingAdmin && (
          <div className="mb-6">
            <button
              className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
              onClick={() => setShowSellerForm(!showSellerForm)}
              type="button"
            >
              {showSellerForm ? 'Cancel Seller Application' : 'Become a Seller'}
            </button>
            {showSellerForm && (
              <form
                className="mt-4 space-y-4 bg-yellow-50 p-4 rounded"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setSellerMessage('');
                  try {
                    // Call backend endpoint to apply for seller
                    const res = await fetch('/api/users/apply-seller', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
                      body: JSON.stringify(sellerForm)
                    });
                    const data = await res.json();
                    if (res.ok) {
                      setSellerMessage('Application submitted! Awaiting admin approval.');
                      setShowSellerForm(false);
                    } else {
                      setSellerMessage(data.error || 'Failed to submit application.');
                    }
                  } catch (err) {
                    setSellerMessage('Failed to submit application.');
                  }
                }}
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700">GST Number</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-gray-300" required value={sellerForm.gstNumber} onChange={e => setSellerForm(f => ({ ...f, gstNumber: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Account Holder</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-gray-300" required value={sellerForm.accountHolder} onChange={e => setSellerForm(f => ({ ...f, accountHolder: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Account Number</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-gray-300" required value={sellerForm.accountNumber} onChange={e => setSellerForm(f => ({ ...f, accountNumber: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">IFSC</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-gray-300" required value={sellerForm.ifsc} onChange={e => setSellerForm(f => ({ ...f, ifsc: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bank Name</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-gray-300" required value={sellerForm.bankName} onChange={e => setSellerForm(f => ({ ...f, bankName: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Branch</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-gray-300" required value={sellerForm.branch} onChange={e => setSellerForm(f => ({ ...f, branch: e.target.value }))} />
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Submit Application</button>
                {sellerMessage && <div className="mt-2 text-sm text-green-700">{sellerMessage}</div>}
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile; 