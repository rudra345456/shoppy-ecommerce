import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { productsAPI, wishlistAPI } from '../services/api';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const ProductList = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    type: searchParams.get('type') || '',
    sort: 'newest',
    minPrice: '',
    maxPrice: '',
  });
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchWishlist();
    // eslint-disable-next-line
  }, [filters, user]);

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: searchParams.get('category') || '',
      type: searchParams.get('type') || '',
    }));
  }, [searchParams]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getAll(filters);
      setProducts(response.data.products || []);
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const fetchWishlist = async () => {
    if (!user) return;
    try {
      const res = await wishlistAPI.get();
      setWishlist(res.data.products || []);
    } catch {
      setWishlist([]);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  const isInWishlist = (productId) => wishlist.some((p) => p._id === productId);

  const handleWishlistToggle = async (productId) => {
    if (!user) return;
    if (isInWishlist(productId)) {
      await wishlistAPI.remove(productId);
    } else {
      await wishlistAPI.add(productId);
    }
    fetchWishlist();
  };

  return (
    <div className="bg-light min-vh-100 py-4">
      <div className="container">
        <div className="row g-4">
          {/* Sidebar Filters */}
          <div className="col-12 col-md-3">
            <div className="bg-white rounded shadow-sm p-4 mb-4 mb-md-0">
              <h5 className="fw-bold mb-3">Filters</h5>
              {/* Search */}
              <div className="mb-3">
                <label className="form-label">Search</label>
                <input
                  type="text"
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  className="form-control"
                  placeholder="Search products..."
                />
              </div>
              {/* Category */}
              <div className="mb-3">
                <label className="form-label">Category</label>
                <select
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="form-select"
                >
                  <option value="">All Categories</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Home & Kitchen">Home & Kitchen</option>
                  <option value="Beauty">Beauty</option>
                  <option value="Sports">Sports</option>
                  <option value="Books">Books</option>
                </select>
              </div>
              {/* Price Range */}
              <div className="mb-3">
                <label className="form-label">Price Range</label>
                <div className="d-flex gap-2">
                  <input
                    type="number"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    placeholder="Min"
                    className="form-control"
                  />
                  <input
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    placeholder="Max"
                    className="form-control"
                  />
                </div>
              </div>
              {/* Sort */}
              <div className="mb-3">
                <label className="form-label">Sort By</label>
                <select
                  name="sort"
                  value={filters.sort}
                  onChange={handleFilterChange}
                  className="form-select"
                >
                  <option value="newest">Newest</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="col-12 col-md-9">
            {error && (
              <div className="alert alert-danger mb-4">{error}</div>
            )}
            {loading ? (
              <div className="text-center py-5">Loading...</div>
            ) : (
              <div className="row g-4">
                {products.map((product) => (
                  <div className="col-12 col-sm-6 col-lg-4" key={product._id}>
                    <div className="card h-100 shadow-sm border-0 position-relative">
                      {user && (
                        <button
                          className="btn btn-link position-absolute top-0 end-0 m-2 p-0"
                          style={{zIndex:2}}
                          onClick={() => handleWishlistToggle(product._id)}
                          title={isInWishlist(product._id) ? 'Remove from wishlist' : 'Add to wishlist'}
                        >
                          {isInWishlist(product._id) ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#e0245e" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#e0245e" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75a5.25 5.25 0 00-4.22 2.11A5.25 5.25 0 003 9.75c0 7.19 8.25 10.5 8.25 10.5s8.25-3.31 8.25-10.5a5.25 5.25 0 00-5.25-6z" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#e0245e" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75a5.25 5.25 0 00-4.22 2.11A5.25 5.25 0 003 9.75c0 7.19 8.25 10.5 8.25 10.5s8.25-3.31 8.25-10.5a5.25 5.25 0 00-5.25-6z" />
                            </svg>
                          )}
                        </button>
                      )}
                      <Link to={`/product/${product._id}`}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#fff', borderRadius: '12px', border: '3px solid orange', padding: '8px', margin: '16px 0', width: '275px', height: '183px', overflow: 'hidden' }}>
                          <img
                            src={product.image}
                            alt={product.name}
                            style={{ width: '275px', height: '183px', objectFit: 'cover', borderRadius: '8px' }}
                          />
                        </div>
                      </Link>
                      <div className="card-body d-flex flex-column">
                        <Link to={`/product/${product._id}`} className="text-decoration-none">
                          <h5 className="card-title text-dark mb-2">{product.name}</h5>
                        </Link>
                        <div className="mb-2">
                          {[...Array(5)].map((_, i) => (
                            <i
                              key={i}
                              className={`fas fa-star ${i < Math.floor(product.rating) ? 'text-warning' : 'text-secondary'}`}
                            ></i>
                          ))}
                          <span className="text-muted small ms-2">({product.numReviews})</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-auto">
                          <span className="h5 text-primary mb-0">
                            ₹{Number(product.price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </span>
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="btn btn-outline-primary btn-sm"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList; 