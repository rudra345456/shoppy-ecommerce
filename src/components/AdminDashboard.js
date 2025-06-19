import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsAPI, ordersAPI, usersAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    recentOrders: []
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [products, orders, users] = await Promise.all([
          productsAPI.getAll(),
          ordersAPI.getAll(),
          usersAPI.getAll()
        ]);

        setStats({
          totalProducts: products.length,
          totalOrders: orders.length,
          totalUsers: users.length,
          recentOrders: orders.slice(0, 5)
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  if (!user?.isAdmin) {
    return (
      <div className="container mt-5">
        <h1>Access Denied</h1>
        <p>You do not have permission to access this page.</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1>Admin Dashboard</h1>
      <div className="mb-4 d-flex gap-3">
        <Link to="/admin/products" className="btn btn-primary">
          Manage Products
        </Link>
        <Link to="/admin/products/new" className="btn btn-success">
          Add Product
        </Link>
      </div>
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Products</h5>
              <p className="card-text">{stats.totalProducts}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Orders</h5>
              <p className="card-text">{stats.totalOrders}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              <p className="card-text">{stats.totalUsers}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h2>Recent Orders</h2>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user.name}</td>
                  <td>${order.total.toFixed(2)}</td>
                  <td>{order.status}</td>
                  <td>
                    <Link to={`/admin/orders/${order._id}`} className="btn btn-sm btn-primary">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 