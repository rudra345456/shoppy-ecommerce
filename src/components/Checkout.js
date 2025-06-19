import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { ordersAPI } from '../services/api';

// Initialize Stripe with a test key
const stripePromise = loadStripe('pk_test_your_test_key');

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('Online');

  const total = Array.isArray(cart) ? cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) : 0;

  if (!user) {
    navigate('/login');
    return null;
  }

  if (!Array.isArray(cart) || cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const handlePaymentSuccess = async (paymentIntent) => {
    try {
      setLoading(true);
      // Create order in backend
      await ordersAPI.create({
        items: cart,
        total,
        paymentIntentId: paymentIntent?.id,
        paymentStatus: paymentIntent?.status,
        paymentMethod,
      });
      clearCart();
      navigate('/order-success');
    } catch (err) {
      setError('Failed to process order');
      console.error('Payment success error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCODOrder = async () => {
    try {
      setLoading(true);
      await ordersAPI.create({
        items: cart,
        total,
        paymentStatus: 'pending',
        paymentMethod: 'COD',
      });
      clearCart();
      navigate('/order-success');
    } catch (err) {
      setError('Failed to process order');
      console.error('COD order error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Processing your order...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Payment Details</h2>
              {/* Payment Method Selection */}
              <div className="mb-4">
                <label className="form-label font-semibold">Select Payment Method:</label>
                <div className="d-flex gap-4 mt-2">
                  <label>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Online"
                      checked={paymentMethod === 'Online'}
                      onChange={() => setPaymentMethod('Online')}
                    />{' '}
                    Online Payment
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="COD"
                      checked={paymentMethod === 'COD'}
                      onChange={() => setPaymentMethod('COD')}
                    />{' '}
                    Cash on Delivery (COD)
                  </label>
                </div>
              </div>
              {/* Show Stripe form if Online, else show COD button */}
              {paymentMethod === 'Online' ? (
                <Elements stripe={stripePromise}>
                  <CheckoutForm
                    total={total}
                    onSuccess={handlePaymentSuccess}
                  />
                </Elements>
              ) : (
                <button
                  className="btn btn-success w-100 mt-3"
                  onClick={handleCODOrder}
                  disabled={loading}
                >
                  Place Order (COD)
                </button>
              )}
            </div>
          </div>
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 lg:sticky lg:top-24">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
              {Array.isArray(cart) && cart.map((item) => (
                <div key={item._id} className="flex justify-between mb-2">
                  <span>{item.name} x {item.quantity}</span>
                  <span>₹{Number(item.price * item.quantity).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
              ))}
              <hr className="my-4" />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>₹{Number(total).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 