import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from "./pages/Home";
import Header from "./components/Header";
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Footer from './components/Footer';
import Checkout from './components/Checkout';
import CheckoutSuccess from './components/CheckoutSuccess';
import AdminDashboard from './components/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import UserProfile from './components/UserProfile';
import OrderHistory from './components/OrderHistory';
import SearchResults from './components/SearchResults';
import AdminProductList from './components/admin/ProductList';
import AdminProductForm from './components/admin/ProductForm';
import AdminOrderManagement from './components/admin/OrderManagement';
import AdminUserManagement from './components/admin/UserManagement';
import DeliveryLocation from './components/DeliveryLocation';
import OrderDetail from './components/OrderDetail';
import Wishlist from './components/Wishlist';
import { Link } from 'react-router-dom';

// Create context for country list
export const CountryContext = React.createContext();

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <CountryContext.Provider value={{ countryList: [], setCountryList: () => {} }}>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<ProductList />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/search" element={<SearchResults />} />
                  <Route path="/delivery-location" element={<DeliveryLocation />} />
                  <Route
                    path="/checkout"
                    element={
                      <PrivateRoute>
                        <Checkout />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/checkout/success"
                    element={
                      <PrivateRoute>
                        <CheckoutSuccess />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <PrivateRoute>
                        <UserProfile />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/wishlist"
                    element={
                      <PrivateRoute>
                        <Wishlist />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/orders"
                    element={
                      <PrivateRoute>
                        <OrderHistory />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/orders/:id"
                    element={
                      <PrivateRoute>
                        <OrderDetail />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/admin"
                    element={
                      <AdminRoute>
                        <AdminDashboard />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/products"
                    element={
                      <AdminRoute>
                        <AdminProductList />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/products/new"
                    element={
                      <AdminRoute>
                        <AdminProductForm />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/products/edit/:id"
                    element={
                      <AdminRoute>
                        <AdminProductForm />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/orders"
                    element={
                      <AdminRoute>
                        <AdminOrderManagement />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/users"
                    element={
                      <AdminRoute>
                        <AdminUserManagement />
                      </AdminRoute>
                    }
                  />
                </Routes>
              </main>
              <Footer />
            </div>
          </CountryContext.Provider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
