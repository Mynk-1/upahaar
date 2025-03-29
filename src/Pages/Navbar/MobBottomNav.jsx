import React, { useState } from 'react';
import { Home, Zap, ShoppingCart, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MobileNavBar = ({ openBagSlider, cartItemQuantity = 0 }) => {
  const [activeItem, setActiveItem] = useState('HOME');
  const navigate = useNavigate();

  const handleNavItemClick = (label) => {
    setActiveItem(label);
    
    switch(label) {
      case 'HOME':
        navigate('/');
        break;
      case 'ABOUT':
        navigate('/about');
        break;
      case 'CART':
        openBagSlider();
        break;
      case 'PROFILE':
        navigate('/profile');
        break;
      default:
        break;
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-1 md:hidden z-30">
      <ul className="flex justify-around items-center relative">
        <NavItem 
          icon={<Home size={20} />} 
          label="HOME" 
          activeItem={activeItem} 
          onClick={() => handleNavItemClick('HOME')} 
        />
        
        <div className="h-8 w-px bg-gray-200 absolute" style={{ left: '25%' }}></div>
        
        <NavItem 
          icon={<Zap size={20} />} 
          label="ABOUT" 
          activeItem={activeItem} 
          onClick={() => handleNavItemClick('ABOUT')} 
        />
        
        <div className="h-8 w-px bg-gray-200 absolute" style={{ left: '50%' }}></div>
        
        <NavItem 
          icon={<ShoppingCart size={20} />} 
          label="CART" 
          badge={cartItemQuantity > 0 ? cartItemQuantity : null}
          activeItem={activeItem} 
          onClick={() => handleNavItemClick('CART')} 
        />
        
        <div className="h-8 w-px bg-gray-200 absolute" style={{ left: '75%' }}></div>
        
        <NavItem 
          icon={<User size={20} />} 
          label="PROFILE" 
          activeItem={activeItem} 
          onClick={() => handleNavItemClick('PROFILE')} 
        />
      </ul>
    </nav>
  );
};

const NavItem = ({ icon, label, badge, activeItem, onClick }) => {
  const isActive = activeItem === label;

  return (
    <li className="flex flex-col items-center w-1/4 py-1">
      <button 
        className={`relative p-1.5 rounded-full ${
          isActive ? 'text-black bg-gray-200' : 'text-gray-500'
        }`}
        onClick={onClick}
      >
        {React.cloneElement(icon, {})}
        {badge && (
          <span className="absolute -top-1 -right-1 bg-gray-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {badge}
          </span>
        )}
      </button>
      <span className="text-xs mt-0.5">{label}</span>
    </li>
  );
};

export default MobileNavBar;