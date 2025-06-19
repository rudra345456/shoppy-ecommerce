import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsAPI } from '../services/api';
import Slider from "react-slick";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);

  // Example deals (replace with dynamic deals if available)
  const deals = [
    {
      _id: 'deal1',
      name: 'Wireless Headphones',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
      price: 49.99,
      oldPrice: 89.99,
    },
    {
      _id: 'deal2',
      name: 'Smart Watch',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
      price: 79.99,
      oldPrice: 129.99,
    },
    {
      _id: 'deal3',
      name: 'Bluetooth Speaker',
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
      price: 29.99,
      oldPrice: 59.99,
    },
  ];

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await productsAPI.getAll({ featured: true });
        setFeaturedProducts(response.data);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };
    const fetchAllProducts = async () => {
      try {
        const response = await productsAPI.getAll({ limit: 100 }); // Increased limit to 100
        setAllProducts(response.data.products || []);
      } catch (error) {
        setAllProducts([]);
      }
    };
    fetchFeaturedProducts();
    fetchAllProducts();
  }, []);

  const categories = [
    { id: 1, name: 'Electronics', icon: 'fas fa-laptop', color: 'primary' },
    { id: 2, name: 'Fashion', icon: 'fas fa-tshirt', color: 'danger' },
    { id: 3, name: 'Home & Kitchen', icon: 'fas fa-home', color: 'success' },
    { id: 4, name: 'Beauty', icon: 'fas fa-spa', color: 'info' },
    { id: 5, name: 'Sports', icon: 'fas fa-running', color: 'warning' },
    { id: 6, name: 'Books', icon: 'fas fa-book', color: 'secondary' },
    { id: 7, name: 'Kids', icon: 'fas fa-child', color: 'info' },
    { id: 8, name: 'Jewellery', icon: 'fas fa-gem', color: 'warning' },
    { id: 9, name: 'Toys', icon: 'fas fa-puzzle-piece', color: 'primary' },
    { id: 10, name: 'Men', icon: 'fas fa-male', color: 'secondary' },
    { id: 11, name: 'Women', icon: 'fas fa-female', color: 'danger' },
  ];

  // Compute best sellers (top 10 by numReviews)
  const bestSellers = Array.isArray(featuredProducts.products ? featuredProducts.products : featuredProducts)
    ? [...(featuredProducts.products ? featuredProducts.products : featuredProducts)]
        .sort((a, b) => b.numReviews - a.numReviews)
        .slice(0, 10)
        .map(p => p._id)
    : [];

  return (
    <div className="bg-light min-vh-100">
      {/* Offer Banner Slider (like Ajio) */}
      <div className="container py-4">
        <Slider
          dots={true}
          infinite={true}
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          autoplay={true}
          autoplaySpeed={3500}
          arrows={false}
        >
          <a href="/products?category=Fashion" target="_self" rel="noopener noreferrer">
            <img src="https://cmsimages.shoppersstop.com/Entry_Banner_web_90704e9cc4/Entry_Banner_web_90704e9cc4.png" alt="Shoppers Stop Entry Banner" style={{width:'100%', borderRadius:'12px', objectFit:'cover', maxHeight:'320px'}} />
          </a>
          <a href="/products?category=Fashion" target="_self" rel="noopener noreferrer">
            <img src="https://cmsimages.shoppersstop.com/CC_web_aa47d111a4/CC_web_aa47d111a4.png" alt="Shoppers Stop CC Banner" style={{width:'100%', borderRadius:'12px', objectFit:'cover', maxHeight:'320px'}} />
          </a>
          <a href="/products?category=Beauty" target="_self" rel="noopener noreferrer">
            <img src="https://cmsimages.shoppersstop.com/YSL_30th_May_25_web_1f30f016db/YSL_30th_May_25_web_1f30f016db.jpg" alt="YSL Banner" style={{width:'100%', borderRadius:'12px', objectFit:'cover', maxHeight:'320px'}} />
          </a>
          <a href="/products?category=Men" target="_self" rel="noopener noreferrer">
            <img src="https://cmsimages.shoppersstop.com/LP_web_1_2e445acdac/LP_web_1_2e445acdac.png" alt="LP Banner" style={{width:'100%', borderRadius:'12px', objectFit:'cover', maxHeight:'320px'}} />
          </a>
          <a href="/products?category=Fashion" target="_self" rel="noopener noreferrer">
            <img src="https://cmsimages.shoppersstop.com/UCB_web_923055c3db/UCB_web_923055c3db.png" alt="UCB Banner" style={{width:'100%', borderRadius:'12px', objectFit:'cover', maxHeight:'320px'}} />
          </a>
          <a href="/products?category=Fashion" target="_self" rel="noopener noreferrer">
            <img src="https://cmsimages.shoppersstop.com/Narisco_and_Lacoste_web_4add15f498/Narisco_and_Lacoste_web_4add15f498.png" alt="Narisco and Lacoste Banner" style={{width:'100%', borderRadius:'12px', objectFit:'cover', maxHeight:'320px'}} />
          </a>
        </Slider>
      </div>

      {/* Categories Section */}
      <div className="container py-5">
        <h2 className="h3 font-weight-bold mb-4">Shop by Category</h2>
        <div className="row g-4">
          {categories.map((category) => (
            <div className="col-6 col-md-4 col-lg-2" key={category.id}>
              <Link to={`/products?category=${category.name}`} className="text-decoration-none">
                <div className="card text-center shadow-sm h-100 border-0 hover-shadow">
                  <div className={`mx-auto mt-4 mb-2 rounded-circle bg-${category.color} d-flex align-items-center justify-content-center`} style={{width: '56px', height: '56px'}}>
                    <i className={`${category.icon} text-white`} style={{fontSize: '1.5rem'}}></i>
                  </div>
                  <div className="card-body p-2">
                    <h6 className="card-title text-dark mb-0">{category.name}</h6>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* All Products Slider */}
      <div className="container py-5">
        <h2 className="h3 font-weight-bold mb-4">All Products</h2>
        <Slider
          dots={false}
          infinite={false}
          speed={500}
          slidesToShow={4}
          slidesToScroll={4}
          responsive={[
            { breakpoint: 1200, settings: { slidesToShow: 3, slidesToScroll: 3 } },
            { breakpoint: 900, settings: { slidesToShow: 2, slidesToScroll: 2 } },
            { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
          ]}
        >
          {allProducts.map((product) => (
            <div key={product._id} style={{ padding: '0 8px' }}>
              <Link to={`/product/${product._id}`} className="text-decoration-none">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#fff', borderRadius: '12px', border: '3px solid orange', padding: '8px', margin: '16px 0', width: '275px', height: '183px', overflow: 'hidden' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '275px', height: '183px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                </div>
                <div className="text-center mt-2">
                  <h5 className="mb-1" style={{ fontSize: '1rem', color: '#222' }}>{product.name}</h5>
                  <span className="h6 text-primary">₹{Number(product.price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>

      {/* Featured Products Section */}
      <div className="container py-5">
        <h2 className="h3 font-weight-bold mb-4">Featured Products</h2>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="row g-4">
            {Array.isArray(featuredProducts.products ? featuredProducts.products : featuredProducts) && (featuredProducts.products ? featuredProducts.products : featuredProducts).map((product, idx) => (
              <div className="col-12 col-md-6 col-lg-3" key={product._id} style={{position: 'relative'}}>
                <Link to={`/product/${product._id}`} className="text-decoration-none">
                  {/* Badges */}
                  {idx < 10 && <span className="product-badge">New</span>}
                  {bestSellers.includes(product._id) && <span className="product-badge best" style={{top: 40}}>Best Seller</span>}
                  <div className="card h-100 shadow-sm border-0 product-card">
                    <img src={product.image} alt={product.name} className="card-img-top" style={{height: '200px', objectFit: 'cover'}} />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title text-dark">{product.name}</h5>
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
                        <button className="btn btn-outline-primary btn-sm">Add to Cart</button>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-white py-5 border-top">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-12 col-md-3">
              <i className="fas fa-truck fa-2x text-primary mb-3"></i>
              <h6 className="font-weight-bold mb-1">Free Shipping</h6>
              <p className="text-muted small mb-0">On orders over $50</p>
            </div>
            <div className="col-12 col-md-3">
              <i className="fas fa-undo fa-2x text-primary mb-3"></i>
              <h6 className="font-weight-bold mb-1">Easy Returns</h6>
              <p className="text-muted small mb-0">30 days return policy</p>
            </div>
            <div className="col-12 col-md-3">
              <i className="fas fa-lock fa-2x text-primary mb-3"></i>
              <h6 className="font-weight-bold mb-1">Secure Payment</h6>
              <p className="text-muted small mb-0">100% secure checkout</p>
            </div>
            <div className="col-12 col-md-3">
              <i className="fas fa-headset fa-2x text-primary mb-3"></i>
              <h6 className="font-weight-bold mb-1">24/7 Support</h6>
              <p className="text-muted small mb-0">Dedicated support team</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 