import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ordersAPI } from '../services/api';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await ordersAPI.getAll();
        setOrders(response.data || response);
      } catch (err) {
        setError('Failed to load orders');
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Order History</h2>
      
      {orders.length === 0 ? (
        <div className="text-center text-gray-600">No orders found</div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <Link to={`/orders/${order._id}`} className="text-lg font-semibold text-blue-600 hover:underline">
                      Order #{order._id.slice(-6)}
                    </Link>
                    <p className="text-sm text-gray-600">
                      {format(new Date(order.createdAt), 'MMM dd, yyyy')}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="border-t border-b py-4 my-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-600">Total Amount</h4>
                      <p className="text-lg font-semibold">
                        ₹{Number(order.totalAmount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-600">Items</h4>
                      <p className="text-lg font-semibold">{order.items.length}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item._id} className="flex items-center space-x-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.product.name}</h4>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-sm text-gray-600">
                          Price: ₹{Number(item.price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <button
                    onClick={() => setSelectedOrder(selectedOrder === order._id ? null : order._id)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    {selectedOrder === order._id ? 'Hide Details' : 'View Details'}
                  </button>

                  {selectedOrder === order._id && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-2">Shipping Address</h4>
                      <p className="text-sm text-gray-600">
                        {order.shippingAddress?.street || '-'}<br />
                        {order.shippingAddress?.city || ''}{order.shippingAddress?.state ? ', ' + order.shippingAddress.state : ''} {order.shippingAddress?.zipCode || ''}<br />
                        {order.shippingAddress?.country || ''}
                      </p>

                      <h4 className="font-medium mt-4 mb-2">Payment Method</h4>
                      <p className="text-sm text-gray-600">
                        Method: {order.paymentMethod || 'N/A'}<br />
                        {order.payment?.transactionId
                          ? `Transaction ID: ${order.payment.transactionId}`
                          : 'N/A'}<br />
                        Status: {order.payment?.status || 'N/A'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory; 