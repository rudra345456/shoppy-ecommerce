import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    icon: '📱',
    subcategories: [
      'Smartphones',
      'Laptops',
      'Tablets',
      'Accessories',
      'Audio',
      'Cameras'
    ]
  },
  {
    id: 'clothing',
    name: 'Clothing',
    icon: '👕',
    subcategories: [
      'Men',
      'Women',
      'Kids',
      'Accessories',
      'Footwear',
      'Sportswear'
    ]
  },
  {
    id: 'books',
    name: 'Books',
    icon: '📚',
    subcategories: [
      'Fiction',
      'Non-Fiction',
      'Educational',
      'Children',
      'Comics',
      'Magazines'
    ]
  },
  {
    id: 'home',
    name: 'Home & Garden',
    icon: '🏠',
    subcategories: [
      'Furniture',
      'Decor',
      'Kitchen',
      'Garden',
      'Lighting',
      'Storage'
    ]
  }
];

const CategoryFilter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedCategory, setExpandedCategory] = React.useState(null);

  const handleCategoryClick = (categoryId) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);
    }
  };

  const handleSubcategoryClick = (categoryId, subcategory) => {
    navigate(`/category/${categoryId}/${subcategory.toLowerCase()}`);
  };

  const isActiveCategory = (categoryId) => {
    return location.pathname.includes(`/category/${categoryId}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category.id}>
            <button
              onClick={() => handleCategoryClick(category.id)}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors duration-200 ${
                isActiveCategory(category.id)
                  ? 'bg-blue-50 text-blue-700'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </div>
              <svg
                className={`w-5 h-5 transform transition-transform duration-200 ${
                  expandedCategory === category.id ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {expandedCategory === category.id && (
              <div className="mt-2 ml-8 space-y-1">
                {category.subcategories.map((subcategory) => (
                  <button
                    key={subcategory}
                    onClick={() => handleSubcategoryClick(category.id, subcategory)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                  >
                    {subcategory}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Featured Categories */}
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Featured Categories</h3>
        <div className="grid grid-cols-2 gap-4">
          {categories.slice(0, 4).map((category) => (
            <button
              key={category.id}
              onClick={() => navigate(`/category/${category.id}`)}
              className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <span className="text-3xl mb-2">{category.icon}</span>
              <span className="text-sm font-medium text-gray-700">
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Special Offers */}
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Special Offers</h3>
        <div className="space-y-3">
          <button
            onClick={() => navigate('/deals/new-arrivals')}
            className="w-full p-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors duration-200"
          >
            New Arrivals
          </button>
          <button
            onClick={() => navigate('/deals/best-sellers')}
            className="w-full p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors duration-200"
          >
            Best Sellers
          </button>
          <button
            onClick={() => navigate('/deals/clearance')}
            className="w-full p-3 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors duration-200"
          >
            Clearance Sale
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter; 