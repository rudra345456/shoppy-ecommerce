import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsAPI } from '../services/api';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [review, setReview] = useState({ rating: 5, comment: '' });

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getById(id);
      setProduct(response.data);
      setActiveImage(0);
    } catch (err) {
      setError('Failed to fetch product details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await productsAPI.createReview(id, review);
      fetchProduct();
      setReview({ rating: 5, comment: '' });
    } catch (err) {
      setError('Failed to submit review');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Product not found</div>
      </div>
    );
  }

  // Support both images array and single image
  const images = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : product.image
      ? [product.image]
      : [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div>
              <div className="relative pb-[100%] mb-4">
                {images[activeImage] && (
                  <img
                    src={images[activeImage]}
                    alt={product.name}
                    style={{ maxWidth: '350px', maxHeight: '350px', width: '100%', height: 'auto', objectFit: 'contain', margin: '0 auto', display: 'block' }}
                    className="absolute inset-0"
                  />
                )}
              </div>
              <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative pb-[100%] border-2 rounded-lg overflow-hidden ${
                      activeImage === index ? 'border-blue-600' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`fas fa-star ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    ></i>
                  ))}
                </div>
                <span className="text-gray-600 text-sm ml-2">
                  ({product.numReviews} reviews)
                </span>
              </div>

              <div className="mb-6">
                <div className="d-flex align-items-center mb-2">
                  <span className="h3 fw-bold text-primary">
                    ₹{Number(product.price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </span>
                  {product.oldPrice && (
                    <span className="h5 text-muted text-decoration-line-through ms-3">
                      ₹{Number(product.oldPrice).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                  )}
                  {product.oldPrice && (
                    <span className="ms-3 text-success fw-semibold">
                      {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% off
                    </span>
                  )}
                </div>
              </div>

              <p className="text-gray-600 mb-6">{product.description}</p>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {[...Array(product.countInStock)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.countInStock}
                className={`w-full py-3 px-6 rounded-full font-semibold text-white ${
                  product.countInStock
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-400 cursor-not-allowed'
                } transition duration-300`}
              >
                {product.countInStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="border-t border-gray-200 p-8">
            <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

            {/* Review Form */}
            {user && (
              <form onSubmit={handleReviewSubmit} className="mb-8">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating
                  </label>
                  <select
                    value={review.rating}
                    onChange={(e) =>
                      setReview({ ...review, rating: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <option key={rating} value={rating}>
                        {rating} Star{rating !== 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Review
                  </label>
                  <textarea
                    value={review.comment}
                    onChange={(e) =>
                      setReview({ ...review, comment: e.target.value })
                    }
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Write your review..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300"
                >
                  Submit Review
                </button>
              </form>
            )}

            {/* Reviews List */}
            <div className="space-y-6">
              {product.reviews.map((review) => (
                <div key={review._id} className="border-b border-gray-200 pb-6">
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`fas fa-star ${
                            i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        ></i>
                      ))}
                    </div>
                    <span className="text-gray-600 text-sm ml-2">
                      by {review.user.name}
                    </span>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 