import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transform hover:scale-105 transition-transform duration-300"
      >
        {/* Shopping Bag Base */}
        <path
          d="M32 12H8C6.89543 12 6 12.8954 6 14V32C6 33.1046 6.89543 34 8 34H32C33.1046 34 34 33.1046 34 32V14C34 12.8954 33.1046 12 32 12Z"
          fill="#1E0280"
          stroke="#1E0280"
          strokeWidth="2"
        />
        {/* Bag Handle */}
        <path
          d="M12 12V8C12 5.79086 13.7909 4 16 4H24C26.2091 4 28 5.79086 28 8V12"
          stroke="#1E0280"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Sparkle Elements */}
        <path
          d="M20 18L22 22L26 23L22 24L20 28L18 24L14 23L18 22L20 18Z"
          fill="#FFD700"
        />
        <circle cx="15" cy="15" r="1" fill="#FFD700" />
        <circle cx="25" cy="15" r="1" fill="#FFD700" />
      </svg>
      <div className="flex flex-col">
        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          ShopEase
        </span>
        <span className="text-xs text-gray-500">Your Shopping Paradise</span>
      </div>
    </Link>
  );
};

export default Logo; 