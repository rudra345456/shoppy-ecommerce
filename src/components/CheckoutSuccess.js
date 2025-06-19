import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSuccess = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-check text-4xl text-green-600"></i>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Order Placed Successfully!
          </h1>
          
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. Your order has been received and is being processed.
            You will receive an email confirmation shortly.
          </p>

          <div className="space-y-4">
            <Link
              to="/orders"
              className="inline-block w-full bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
            >
              View Order Status
            </Link>
            
            <Link
              to="/products"
              className="inline-block w-full bg-gray-100 text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition duration-300"
            >
              Continue Shopping
            </Link>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              What's Next?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              <div className="p-4 bg-gray-50 rounded-lg">
                <i className="fas fa-envelope text-blue-600 text-xl mb-2"></i>
                <h3 className="font-medium text-gray-800 mb-1">Order Confirmation</h3>
                <p className="text-sm text-gray-600">
                  You'll receive an email with your order details and tracking information.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <i className="fas fa-box text-blue-600 text-xl mb-2"></i>
                <h3 className="font-medium text-gray-800 mb-1">Order Processing</h3>
                <p className="text-sm text-gray-600">
                  Your order will be processed and prepared for shipping within 24 hours.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <i className="fas fa-truck text-blue-600 text-xl mb-2"></i>
                <h3 className="font-medium text-gray-800 mb-1">Shipping Updates</h3>
                <p className="text-sm text-gray-600">
                  Track your order status and receive shipping updates via email.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess; 