import React, { useEffect, useState } from 'react';
import { wishlistAPI } from '../services/api';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const res = await wishlistAPI.get();
      setWishlist(res.data.products || []);
    } catch (err) {
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemove = async (productId) => {
    await wishlistAPI.remove(productId);
    fetchWishlist();
  };

  if (loading) return <div className="container mx-auto px-4 py-8 text-center">Loading wishlist...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>
      {wishlist.length === 0 ? (
        <div className="text-gray-600">Your wishlist is empty.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow p-4 flex flex-col">
              <Link to={`/product/${product._id}`}>
                <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded mb-2" />
                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
              </Link>
              <div className="flex-1" />
              <div className="flex justify-between items-center mt-2">
                <span className="text-primary font-bold text-lg">₹{Number(product.price).toLocaleString('en-IN')}</span>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleRemove(product._id)}
                  title="Remove from wishlist"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist; 