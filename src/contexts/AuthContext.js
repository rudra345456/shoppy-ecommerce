import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Configure axios defaults
  axios.defaults.baseURL = 'http://localhost:5000';

  // Always set axios Authorization header if token exists
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('[AuthContext] useEffect: token in localStorage:', token);
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      console.log('[AuthContext] Set axios Authorization header:', axios.defaults.headers.common['Authorization']);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      console.log('[AuthContext] Removed axios Authorization header');
    }
  }, []);

  // Log user state changes
  useEffect(() => {
    console.log('[AuthContext] user state changed:', user);
  }, [user]);

  // Check for token and fetch user on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  // Fetch user data
  const fetchUser = async () => {
    try {
      const response = await axios.get('/api/auth/me');
      const user = response.data;
      setUser({ ...user, isAdmin: user.role === 'admin' });
      setError(null);
    } catch (error) {
      console.error('Error fetching user:', error);
      setError(error.response?.data?.error || 'Failed to fetch user data');
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Register new user
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post('/api/auth/register', userData);
      const { token, ...user } = response.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser({ ...user, isAdmin: user.role === 'admin' });
      return { ...user, isAdmin: user.role === 'admin' };
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.error || 'Registration failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post('/api/auth/login', credentials);
      const { token, ...user } = response.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser({ ...user, isAdmin: user.role === 'admin' });
      return { ...user, isAdmin: user.role === 'admin' };
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.error || 'Login failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setError(null);
  };

  // Add updateUser for profile updates
  const updateUser = (newUser) => setUser(newUser);

  const value = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    fetchUser,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 