import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const categories = [
  { name: 'All', path: '/products', icon: 'fas fa-th-large' },
  { name: 'Electronics', path: '/products?category=Electronics', icon: 'fas fa-laptop' },
  { name: 'Fashion', path: '/products?category=Fashion', icon: 'fas fa-tshirt' },
  { name: 'Home & Kitchen', path: '/products?category=Home%20%26%20Kitchen', icon: 'fas fa-home' },
  { name: 'Beauty', path: '/products?category=Beauty', icon: 'fas fa-spa' },
  { name: 'Sports', path: '/products?category=Sports', icon: 'fas fa-running' },
  { name: 'Books', path: '/products?category=Books', icon: 'fas fa-book' },
  { name: 'Kids', path: '/products?category=Kids', icon: 'fas fa-child' },
  { name: 'Jewellery', path: '/products?category=Jewellery', icon: 'fas fa-gem' },
  { name: 'Toys', path: '/products?category=Toys', icon: 'fas fa-puzzle-piece' },
  { name: 'Men', path: '/products?category=Men', icon: 'fas fa-male' },
  { name: 'Women', path: '/products?category=Women', icon: 'fas fa-female' },
];

const beautySubcategories = [
  {
    title: 'Makeup',
    items: [
      'Face', 'Eyes', 'Lips', 'Makeup Removers', 'Tools & Accessories'
    ]
  },
  {
    title: 'Skin',
    items: [
      'Cleansers & Exfoliators', 'Toners & Mists', 'Moisturizers', 'Eye Care', 'Masks & Treatments', 'Kits & Combos'
    ]
  },
  {
    title: 'Hair',
    items: [
      'Shampoo & Conditioners', 'Hair Treatments', 'Hair Styling', 'Tools & Accessories'
    ]
  },
  {
    title: 'Fragrance',
    items: [
      'Women', 'Men', 'Unisex'
    ]
  },
  {
    title: 'Personal Care',
    items: [
      'Bath & Shower', 'Body Care', 'Hands & Feet', 'Sun Care', 'Feminine Hygiene'
    ]
  },
  {
    title: 'Mens Grooming',
    items: [
      'Shaving', 'Beard Care', 'Skin Care', 'Hair Care', 'Body Care', 'Fragrance'
    ]
  },
];

// Subcategories for all categories
const megaMenuData = {
  'Electronics': [
    { title: 'Mobiles & Tablets', items: ['Smartphones', 'Tablets', 'Mobile Accessories'] },
    { title: 'Computers', items: ['Laptops', 'Desktops', 'Monitors', 'Computer Accessories'] },
    { title: 'Audio', items: ['Headphones', 'Speakers', 'Soundbars'] },
    { title: 'Wearables', items: ['Smart Watches', 'Fitness Bands'] },
    { title: 'Cameras', items: ['DSLR', 'Mirrorless', 'Camera Accessories'] },
  ],
  'Fashion': [
    { title: 'Men', items: ['T-Shirts', 'Shirts', 'Jeans', 'Trousers', 'Jackets', 'Ethnic Wear'] },
    { title: 'Women', items: ['Tops', 'Dresses', 'Jeans', 'Kurtas', 'Sarees', 'Ethnic Wear'] },
    { title: 'Kids', items: ['T-Shirts', 'Dresses', 'Shorts', 'Ethnic Wear'] },
    { title: 'Footwear', items: ['Casual Shoes', 'Sports Shoes', 'Sandals', 'Heels'] },
    { title: 'Accessories', items: ['Bags', 'Belts', 'Wallets', 'Sunglasses'] },
  ],
  'Home & Kitchen': [
    { title: 'Home Furnishing', items: ['Bedsheets', 'Curtains', 'Cushions', 'Blankets'] },
    { title: 'Kitchenware', items: ['Cookware', 'Dinner Sets', 'Storage', 'Kitchen Tools'] },
    { title: 'Home Decor', items: ['Wall Art', 'Clocks', 'Vases', 'Candles'] },
    { title: 'Appliances', items: ['Mixer Grinders', 'Toasters', 'Irons', 'Fans'] },
  ],
  'Beauty': beautySubcategories,
  'Sports': [
    { title: 'Sportswear', items: ['T-Shirts', 'Shorts', 'Tracksuits', 'Jackets'] },
    { title: 'Footwear', items: ['Running Shoes', 'Sneakers', 'Sandals'] },
    { title: 'Fitness', items: ['Yoga Mats', 'Dumbbells', 'Resistance Bands'] },
    { title: 'Outdoor', items: ['Bicycles', 'Backpacks', 'Tents'] },
  ],
  'Books': [
    { title: 'Genres', items: ['Fiction', 'Non-Fiction', 'Children', 'Comics', 'Academic'] },
    { title: 'Languages', items: ['English', 'Hindi', 'Regional'] },
    { title: 'Authors', items: ['Bestsellers', 'Award Winners'] },
  ],
  'Kids': [
    { title: 'Clothing', items: ['T-Shirts', 'Dresses', 'Shorts', 'Ethnic Wear'] },
    { title: 'Toys', items: ['Educational Toys', 'Soft Toys', 'Action Figures'] },
    { title: 'Footwear', items: ['Sandals', 'Sneakers', 'Boots'] },
    { title: 'Accessories', items: ['Bags', 'Caps', 'Watches'] },
  ],
  'Jewellery': [
    { title: 'Women', items: ['Necklaces', 'Earrings', 'Bracelets', 'Rings'] },
    { title: 'Men', items: ['Chains', 'Bracelets', 'Rings'] },
    { title: 'Kids', items: ['Pendants', 'Bracelets'] },
    { title: 'Types', items: ['Gold', 'Silver', 'Diamond', 'Fashion'] },
  ],
  'Toys': [
    { title: 'By Age', items: ['0-2 Years', '3-5 Years', '6-8 Years', '9+ Years'] },
    { title: 'Types', items: ['Educational', 'Soft Toys', 'Action Figures', 'Puzzles'] },
    { title: 'Outdoor', items: ['Ride-ons', 'Sports Toys'] },
  ],
  'Men': [
    { title: 'Clothing', items: ['T-Shirts', 'Shirts', 'Jeans', 'Trousers', 'Jackets', 'Ethnic Wear'] },
    { title: 'Footwear', items: ['Casual Shoes', 'Sports Shoes', 'Sandals'] },
    { title: 'Accessories', items: ['Belts', 'Wallets', 'Sunglasses', 'Watches'] },
    { title: 'Grooming', items: ['Shaving', 'Beard Care', 'Skin Care', 'Fragrance'] },
  ],
  'Women': [
    { title: 'Clothing', items: ['Tops', 'Dresses', 'Jeans', 'Kurtas', 'Sarees', 'Ethnic Wear'] },
    { title: 'Footwear', items: ['Heels', 'Flats', 'Sandals', 'Sneakers'] },
    { title: 'Accessories', items: ['Bags', 'Jewellery', 'Watches', 'Sunglasses'] },
    { title: 'Beauty', items: ['Makeup', 'Skin Care', 'Hair Care', 'Fragrance'] },
  ],
};

const Navigation = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const handleDropdown = (cat) => setOpenDropdown(cat);
  const closeDropdown = () => setOpenDropdown(null);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-1 sticky-top shadow-sm" style={{zIndex: 100}}>
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#categoryNavbar" aria-controls="categoryNavbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="categoryNavbar">
          <ul className="navbar-nav ms-0 mb-2 mb-lg-0">
            {categories.map((cat) => (
              <li
                className="nav-item position-relative"
                key={cat.name}
                onMouseEnter={() => megaMenuData[cat.name] && handleDropdown(cat.name)}
                onMouseLeave={() => megaMenuData[cat.name] && closeDropdown()}
              >
                <Link
                  className="nav-link text-white px-3 d-flex align-items-center"
                  to={cat.path}
                  title={cat.name}
                  onClick={e => {
                    if (megaMenuData[cat.name]) {
                      e.preventDefault();
                      setOpenDropdown(openDropdown === cat.name ? null : cat.name);
                    }
                  }}
                >
                  <i className={`${cat.icon} fs-5`} aria-hidden="true"></i>
                  <span className="ms-2">{cat.name}</span>
                </Link>
                {/* Mega menu for this category */}
                {megaMenuData[cat.name] && openDropdown === cat.name && (
                  <div className="position-absolute bg-white shadow rounded p-4 mega-menu" style={{top: '100%', left: 0, minWidth: 700, zIndex: 2000, display: 'flex', gap: '2rem'}}>
                    {megaMenuData[cat.name].map((sub, idx) => (
                      <div key={sub.title} style={{minWidth: 150}}>
                        <h6 className="fw-bold mb-2">{sub.title}</h6>
                        <ul className="list-unstyled mb-0">
                          {sub.items.map(item => (
                            <li key={item}>
                              <Link
                                to={`/products?category=${encodeURIComponent(cat.name)}&type=${encodeURIComponent(item)}`}
                                className="text-dark text-decoration-none small d-block py-1"
                              >
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
