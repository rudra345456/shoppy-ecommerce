# E-Commerce Platform

A full-stack e-commerce platform built with React, Node.js, Express, and MongoDB.

## Features

- User authentication and authorization
- Product browsing and searching
- Shopping cart functionality
- Order management
- Payment processing with Stripe
- Admin dashboard
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Stripe account

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ecommerce-platform
```

2. Install dependencies:
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLIC_KEY=your_stripe_public_key
```

4. Start the development servers:
```bash
# Start backend server
cd backend
npm run dev

# Start frontend server (in a new terminal)
cd ..
npm start
```

## Usage

1. Register a new account or login with existing credentials
2. Browse products and add items to cart
3. Proceed to checkout
4. Complete payment using Stripe
5. Track order status

## Admin Features

1. Login with admin credentials
2. Access admin dashboard
3. Manage products (add, edit, delete)
4. Manage orders
5. Manage users

## API Endpoints

### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user
- PUT /api/auth/profile - Update user profile

### Products
- GET /api/products - Get all products
- GET /api/products/:id - Get single product
- POST /api/products - Create product (admin)
- PUT /api/products/:id - Update product (admin)
- DELETE /api/products/:id - Delete product (admin)
- POST /api/products/:id/reviews - Add product review

### Orders
- POST /api/orders - Create new order
- GET /api/orders/myorders - Get user orders
- GET /api/orders/:id - Get single order
- PUT /api/orders/:id/status - Update order status (admin)
- PUT /api/orders/:id/pay - Update order payment status
- GET /api/orders - Get all orders (admin)

### Users
- GET /api/users - Get all users (admin)
- GET /api/users/:id - Get single user (admin)
- PUT /api/users/:id - Update user (admin)
- DELETE /api/users/:id - Delete user (admin)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License.
