import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ordersAPI } from '../services/api';
import { format } from 'date-fns';

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await ordersAPI.getById(id);
        setOrder(response.data || response);
      } catch (err) {
        setError('Failed to load order');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading order...</div>;
  }
  if (error || !order) {
    return <div className="container mx-auto px-4 py-8 text-center text-red-600">{error || 'Order not found'}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-4">Order #{order._id.slice(-6)}</h2>
        <p className="text-gray-600 mb-2">Placed on {format(new Date(order.createdAt), 'MMM dd, yyyy')}</p>
        <span className={`px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block ${order.status === 'completed' ? 'bg-green-100 text-green-800' : order.status === 'processing' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>{order.status}</span>

        <div className="border-t border-b py-4 my-4">
          <h3 className="text-lg font-semibold mb-2">Items</h3>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item._id} className="flex items-center space-x-4">
                <img src={item.product?.image} alt={item.product?.name} className="w-16 h-16 object-cover rounded" />
                <div className="flex-1">
                  <h4 className="font-medium">{item.product?.name}</h4>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-sm text-gray-600">Price: ₹{Number(item.price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <h4 className="font-medium mb-2">Shipping Address</h4>
            <p className="text-sm text-gray-600">
              {order.shippingAddress?.street || '-'}<br />
              {order.shippingAddress?.city || ''}{order.shippingAddress?.state ? ', ' + order.shippingAddress.state : ''} {order.shippingAddress?.zipCode || ''}<br />
              {order.shippingAddress?.country || ''}
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Payment</h4>
            <p className="text-sm text-gray-600">
              Method: {order.paymentMethod || 'N/A'}<br />
              {order.payment?.transactionId ? `Transaction ID: ${order.payment.transactionId}` : 'N/A'}<br />
              Status: {order.payment?.status || 'N/A'}
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div className="text-lg font-semibold">Total: ₹{Number(order.totalAmount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
          <Link to="/orders" className="btn btn-primary">Back to Orders</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail; 