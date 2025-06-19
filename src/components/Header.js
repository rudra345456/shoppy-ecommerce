import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaMapMarkerAlt, FaUserCircle } from 'react-icons/fa';
import { Modal, Button, List, ListItem } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import Navigation from './Header/Navigation';
import DeliveryLocation from './DeliveryLocation';

const Header = () => {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    name: 'United States',
    code: 'US'
  });
  const [showAccount, setShowAccount] = useState(false);
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsLocationModalOpen(false);
  };

  return (
    <header className="sticky-top shadow-sm bg-white">
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-2">
        <div className="container-fluid">
          {/* Logo */}
          <Link to="/" className="navbar-brand d-flex flex-column align-items-center" style={{lineHeight: 1}}>
            <img src="https://imgs.search.brave.com/gmHfl0Obab35RUhQ3QREif_PGpgg_2QfJkA9kou1_D4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bG9nb2Rlc2lnbnRl/YW0uY29tL2ltYWdl/cy9wb3J0Zm9saW8t/aW1hZ2VzL2Vjb21t/ZXJjZS13ZWJzaXRl/cy1sb2dvLWRlc2ln/bi9lY29tbWVyY2Ut/d2Vic2l0ZXMtbG9n/by1kZXNpZ24tbmV3/MTEuanBn" alt="Shoppy Logo" style={{height: '72px', width: 'auto', objectFit: 'contain', marginBottom: '2px'}} />
          </Link>

          {/* Location Selector */}
          <Button
            className="d-flex align-items-center ms-3 text-dark bg-light border-0"
            onClick={() => setIsLocationModalOpen(true)}
            style={{ minWidth: 0 }}
          >
            <FaMapMarkerAlt className="me-1 text-warning" />
            <div className="d-none d-md-block text-start">
              <div className="small text-muted">Deliver to</div>
              <div className="fw-bold">Change Delivery Location</div>
            </div>
          </Button>

          {/* Search Bar */}
          <form className="d-flex flex-grow-1 mx-3" style={{ maxWidth: 600 }}
            onSubmit={e => {
              e.preventDefault();
              if (searchTerm.trim()) {
                navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
              }
            }}
          >
            <input
              className="form-control rounded-0 rounded-start border-end-0"
              type="search"
              placeholder="Search products, brands and more..."
              aria-label="Search"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-warning rounded-0 rounded-end px-3" type="submit">
              <i className="fas fa-search"></i>
            </button>
          </form>

          {/* Account Dropdown */}
          <div className="dropdown me-3">
            <Button
              className="d-flex align-items-center bg-white border-0 text-dark"
              onClick={() => setShowAccount(!showAccount)}
              style={{ minWidth: 0 }}
            >
              <FaUserCircle className="me-1 fs-4" />
              <div className="d-none d-md-block text-start">
                <div className="small text-muted">Hello, Sign in</div>
                <div className="fw-bold">Account & Lists</div>
              </div>
            </Button>
            <div className={`dropdown-menu dropdown-menu-end mt-2${showAccount ? ' show' : ''}`} style={{ minWidth: 200 }}>
              <Link className="dropdown-item" to="/login">Sign In</Link>
              <Link className="dropdown-item" to="/register">Register</Link>
              <div className="dropdown-divider"></div>
              <Link className="dropdown-item" to="/orders">Your Orders</Link>
              <Link className="dropdown-item" to="/profile">Your Account</Link>
              {user && user.isAdmin && (
                <Link className="dropdown-item" to="/admin">Admin Panel</Link>
              )}
              {user && (
                <button className="dropdown-item" onClick={() => { logout(); window.location.href = '/'; }}>
                  Logout
                </button>
              )}
            </div>
          </div>

          {/* Orders Link */}
          <Link to="/orders" className="d-none d-lg-flex flex-column align-items-center me-3 text-dark text-decoration-none">
            <span className="small text-muted">Returns</span>
            <span className="fw-bold">& Orders</span>
          </Link>

          {/* Cart Icon */}
          <Link to="/cart" className="d-flex align-items-center position-relative text-dark text-decoration-none">
            <FaShoppingCart className="fs-3" />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark" style={{ fontSize: '0.8rem' }}>
              {cart.length}
            </span>
            <span className="d-none d-md-inline ms-2 fw-bold">Cart</span>
          </Link>
        </div>
      </nav>

      <Navigation />

      {/* Delivery Location Modal */}
      <Modal
        open={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        className="LocationModal"
        style={{overflowY: 'auto'}}
      >
        <div className="MuiPaper-elevation p-4 bg-white rounded shadow" style={{ maxWidth: 700, margin: '5vh auto' }}>
          <Button
            className="close_ d-flex align-items-center justify-content-center ms-auto mb-2"
            onClick={() => setIsLocationModalOpen(false)}
          >
            <span aria-hidden="true">&times;</span>
          </Button>
          <DeliveryLocation />
        </div>
      </Modal>
    </header>
  );
};

export default Header; 