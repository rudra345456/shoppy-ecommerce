import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, total } = useCart();
  const { user } = useAuth();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <i className="fas fa-shopping-cart text-6xl text-gray-400 mb-4"></i>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              to="/products"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center p-6 border-b border-gray-200 last:border-b-0 cart-item-hover"
                >
                  {/* Product Image */}
                  <Link
                    to={`/product/${item._id}`}
                    className="w-24 h-24 flex-shrink-0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="ml-6 flex-grow">
                    <Link
                      to={`/product/${item._id}`}
                      className="text-lg font-semibold text-gray-800 hover:text-blue-600"
                    >
                      {item.name}
                    </Link>
                    <p className="text-gray-600 text-sm mt-1">
                      Price: ₹{Number(item.price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center mt-4">
                      <button
                        onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md btn"
                      >
                        <i className="fas fa-minus text-gray-600"></i>
                      </button>
                      <span className="w-12 h-8 flex items-center justify-center border-t border-b border-gray-300">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md btn"
                      >
                        <i className="fas fa-plus text-gray-600"></i>
                      </button>
                    </div>
                  </div>

                  {/* Price and Remove */}
                  <div className="ml-6 text-right">
                    <p className="text-lg font-semibold text-gray-800">
                      ₹{Number(item.price * item.quantity).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </p>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="btn text-red-600 hover:text-red-800 mt-2"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 lg:sticky lg:top-24">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{Number(total).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>₹{Number(total * 0.1).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>₹{Number(total + total * 0.1).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300 mt-6"
              >
                {user ? 'Proceed to Checkout' : 'Login to Checkout'}
              </button>

              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">
                  We Accept
                </h3>
                <div className="flex space-x-2">
                  <i className="fab fa-cc-visa text-2xl text-gray-600"></i>
                  <i className="fab fa-cc-mastercard text-2xl text-gray-600"></i>
                  <i className="fab fa-cc-amex text-2xl text-gray-600"></i>
                  <i className="fab fa-cc-paypal text-2xl text-gray-600"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 