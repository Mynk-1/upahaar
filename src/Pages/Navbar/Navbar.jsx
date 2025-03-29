import React, { useState, useEffect } from "react";
import { Menu, X, User, ShoppingCart } from "lucide-react";
import { Instagram, Facebook, Youtube, Twitter, Linkedin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BagSlider from "../CheckoutPages/cartItemSlider";

import { useSelector, useDispatch } from "react-redux";
import { fetchCart } from "../../Store/Slices/cartitemSlice"; // Import the fetchCart action
import { useAuth } from "../../auth/AuthProvider";
import MobileNavBar from "./MobBottomNav";

const NavBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [showDelayedContent, setShowDelayedContent] = useState(false);
  const { user } = useAuth();
  
  const dispatch = useDispatch();
  
  // Get cart from the cart slice
  const { cart } = useSelector((state) => state.cart);
  
  const [cartItemQuantity, setCartItemQuantity] = useState(0);
  
  // Fetch cart on component mount AND when authentication state changes
  useEffect(() => {
    if (user) {
      dispatch(fetchCart());
    }
  }, [dispatch, user]); // Add user as a dependency
  
  // Update cart quantity when cart changes
  useEffect(() => {
    if (cart && cart.items) {
      setCartItemQuantity(cart.items.length);
    } else {
      setCartItemQuantity(0);
    }
  }, [cart]);
  
  useEffect(() => {
    if (isDrawerOpen) {
      const timer = setTimeout(() => setShowDelayedContent(true), 300);
      return () => clearTimeout(timer);
    } else {
      setShowDelayedContent(false);
    }
  }, [isDrawerOpen]);
  
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  
  const handleLogin = () => {
    if (user) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
    setIsDrawerOpen(false);
  };
  
  const handleHome = () => {
    navigate("/");
    setIsDrawerOpen(false);
  };
  
  // Handle bag open - fetch latest cart data
  const handleBagOpen = () => {
    if (user) {
      dispatch(fetchCart()); // Fetch latest cart data before opening
    }
    setIsBagOpen(true);
  };
  
  const navItems = [
    // "NEW ARRIVALS",
    // "BEST SELLING",
    // "SNITCH LUXE",
    // "SNITCH PLUS",
    // { name: "SHOP", hasSubmenu: true },
    "TRACK ORDER",
    // "PLACE A RETURN/EXCHANGE REQUEST",
    "CUSTOMER SUPPORT",
    // "VISIT STORE",
  ];

  const socialIcons = [
    { name: "Instagram", Icon: Instagram },
    { name: "Facebook", Icon: Facebook },
    { name: "YouTube", Icon: Youtube },
    { name: "Twitter", Icon: Twitter },
    { name: "Pinterest", Icon: ShoppingCart },
    { name: "LinkedIn", Icon: Linkedin },
  ];

  return (
    <div className="relative">
      {/* Header */}
      <header className="flex justify-between items-center px-4 py-1 border-b border-gray-300">
        <button onClick={toggleDrawer} className="text-gray-600">
          <Menu size={24} />
        </button>
        <div className="text-center flex-grow" onClick={handleHome}>
          <div className="flex items-center justify-center py-2">
            <img src="https://res.cloudinary.com/dg3ftdduj/image/upload/v1742046840/Logo_tkdsy3.png" height={125} width={125} alt="Logo" className="m-0" />
          </div>
        </div>
        <div className="flex space-x-4">
          <button onClick={handleLogin} className="text-gray-600">
            <User size={24} />
          </button>
          <button
            onClick={handleBagOpen}
            className="text-gray-600 relative"
          >
            <ShoppingCart size={24} />
            <div className="flex absolute text-sm bottom-3 left-3 font-semibold bg-gray-600 w-4 h-4 items-center justify-center text-white rounded-full">
              {cartItemQuantity}
            </div>
          </button>
        </div>
      </header>

      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-gray-200/50 z-40 transition-opacity duration-100"
          onClick={toggleDrawer}
        ></div>
      )}

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 left-0 w-[90%] sm:w-[70%] md:w-[50%] max-w-[400px] bg-white shadow-lg transform ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 overflow-y-auto flex flex-col`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-300">
          <button
            onClick={handleLogin}
            className="flex items-center space-x-2 text-gray-600"
          >
            <User size={24} />
            <span className="text-sm font-semibold">{user ? "PROFILE" : "LOG IN"}</span>
          </button>
          <button onClick={toggleDrawer} className="text-gray-600">
            <X size={24} />
          </button>
        </div>

        <nav className="mt-4 flex-grow font-semibold px-4">
          {navItems.map((item, index) => (
            <div
              key={index}
              className={`py-2 border-b border-gray-200 transition-all duration-300 ease-in-out ${
                showDelayedContent ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {typeof item === "string" ? (
                <a href="/" className="block text-sm hover:bg-gray-100 p-2 rounded">
                  {item}
                </a>
              ) : (
                <div className="flex justify-between items-center hover:bg-gray-100 p-2 rounded">
                  <a href="/" className="block text-sm">
                    {item.name}
                  </a>
                  {item.hasSubmenu && <span>▼</span>}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-300">
          <div className="grid grid-cols-3 gap-4">
            {socialIcons.map(({ name, Icon }, index) => (
              <a
                key={index}
                href="/"
                className={`flex justify-center items-center h-10 bg-gray-100 hover:bg-gray-200 rounded transition-all duration-300 ease-in-out ${
                  showDelayedContent ? "opacity-100" : "opacity-0"
                }`}
                style={{ transitionDelay: `${(navItems.length + index) * 50}ms` }}
              >
                <Icon size={20} className="text-gray-600" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bag Slider */}
      {isBagOpen && <BagSlider isOpen={isBagOpen} setToggle={setIsBagOpen} cartData={cart} />}

      {/* Overlay for bag */}
      {isBagOpen && (
  <div
    className="fixed inset-0 bg-gray-200/50  z-40"
    onClick={() => {
      setIsBagOpen(false);
    }}
  ></div>
)}

      
      {/* Mobile Navigation Bar */}
      <MobileNavBar openBagSlider={handleBagOpen} cartItemQuantity={cartItemQuantity} />
    </div>
  );
};

export default NavBar;