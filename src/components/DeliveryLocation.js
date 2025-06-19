import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

const DeliveryLocation = () => {
  const [selectedState, setSelectedState] = useState('');
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState({
    street: '',
    city: '',
    pincode: '',
    landmark: '',
    mobile: ''
  });
  const [savedAddress, setSavedAddress] = useState(() => {
    const data = localStorage.getItem('deliveryAddress');
    return data ? JSON.parse(data) : null;
  });
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (savedAddress && savedAddress.state) {
      setSelectedState(savedAddress.state);
    }
  }, [savedAddress]);

  const handleStateSelect = (state) => {
    setSelectedState(state);
    setShowForm(true);
  };

  const handleLocationShare = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    const fullAddress = {
      ...address,
      state: selectedState,
      location
    };
    localStorage.setItem('deliveryAddress', JSON.stringify(fullAddress));
    setSavedAddress(fullAddress);
    setShowForm(false);
  };

  const handleEdit = () => {
    setShowForm(true);
    setSelectedState(savedAddress.state);
    setAddress({
      street: savedAddress.street,
      city: savedAddress.city,
      pincode: savedAddress.pincode,
      landmark: savedAddress.landmark,
      mobile: savedAddress.mobile || ''
    });
    setLocation(savedAddress.location || null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Select Delivery Location</h1>
          
          {/* Show saved address if available */}
          {savedAddress && !showForm ? (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Saved Delivery Address</h2>
              <div className="mb-2"><strong>State:</strong> {savedAddress.state}</div>
              <div className="mb-2"><strong>Street:</strong> {savedAddress.street}</div>
              <div className="mb-2"><strong>City:</strong> {savedAddress.city}</div>
              <div className="mb-2"><strong>Pincode:</strong> {savedAddress.pincode}</div>
              <div className="mb-2"><strong>Landmark:</strong> {savedAddress.landmark}</div>
              <div className="mb-2"><strong>Mobile:</strong> {savedAddress.mobile}</div>
              {savedAddress.location && (
                <div className="mb-2 text-sm text-gray-600">
                  <strong>Location:</strong> {savedAddress.location.latitude}, {savedAddress.location.longitude}
                </div>
              )}
              <button
                onClick={handleEdit}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit Address
              </button>
            </div>
          ) : (
            <>
              {/* State Selection */}
              {!selectedState && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <h2 className="text-xl font-semibold mb-4">Select Your State (Default: India)</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {indianStates.map((state) => (
                      <button
                        key={state}
                        onClick={() => handleStateSelect(state)}
                        className="p-4 border rounded-lg hover:bg-blue-50 hover:border-blue-500 transition-colors text-left"
                      >
                        {state}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Address Form */}
              {selectedState && showForm && (
                <div className="bg-white rounded-lg max-w-2xl w-full p-6 mx-auto">
                  <h2 className="text-2xl font-bold mb-4">Delivery Details for {selectedState}</h2>

                  {/* Location Sharing */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Share Your Location</h3>
                    <button
                      onClick={handleLocationShare}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Use My Current Location
                    </button>
                    {location && (
                      <p className="mt-2 text-sm text-gray-600">
                        Location shared: {location.latitude}, {location.longitude}
                      </p>
                    )}
                  </div>

                  <form onSubmit={handleAddressSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        value={address.mobile}
                        onChange={(e) => setAddress({ ...address, mobile: e.target.value })}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                        pattern="[0-9]{10}"
                        maxLength={10}
                        placeholder="Enter 10-digit mobile number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address
                      </label>
                      <input
                        type="text"
                        value={address.street}
                        onChange={(e) => setAddress({ ...address, street: e.target.value })}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pincode
                      </label>
                      <input
                        type="text"
                        value={address.pincode}
                        onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Landmark (Optional)
                      </label>
                      <input
                        type="text"
                        value={address.landmark}
                        onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex justify-end space-x-4 mt-6">
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Save Address
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryLocation; 