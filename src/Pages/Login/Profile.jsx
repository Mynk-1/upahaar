import React, { useState, useRef, useEffect } from "react";
import {
  User,
  MapPin,
  ShoppingBag,
  Locate,
  Users,
  Lock,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import UserProfile from "./Profile/UserProfile";
import DeliveryAddress from "./Profile/DeliveryAddress";
import MyOrders from "./Profile/MyOrder";
import ReferFriend from "./Profile/ReferFriend";
import ChangePassword from "./Profile/ChangePasword";

const Profile = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");

  const SCROLL_THRESHOLD = 50;

  const menuGroups = [
    { icon: User, label: "My Profile", id: "profile", count: null },
    { icon: MapPin, label: "Delivery Address", id: "address", count: 0 },
    { icon: ShoppingBag, label: "My Orders", id: "orders", count: 0 },
    // { icon: Locate, label: "Track Order", id: "track", count: 0 },
    // { icon: Heart, label: "My Wishlist", id: "wishlist", count: 0 },
    // { icon: Users, label: "Refer Friend", id: "refer", count: null },
    // { icon: Lock, label: "Change Password", id: "password", count: null },
    { icon: LogOut, label: "Log Out", id: "logout", count: null },
  ];

  const handleScroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 200;
      const targetScroll = container.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount);
      container.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const hasScrolledPastThreshold = container.scrollLeft > SCROLL_THRESHOLD;
      const isAtEnd = Math.abs(
        container.scrollWidth - container.clientWidth - container.scrollLeft
      ) < 1;

      setShowLeftArrow(hasScrolledPastThreshold);
      setShowRightArrow(!isAtEnd && container.scrollWidth > container.clientWidth);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowRightArrow(container.scrollWidth > container.clientWidth);
    }
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return <UserProfile />;
      case "address":
        return <DeliveryAddress />;
      case "orders":
        return <MyOrders />;
      // case "track":
      //   return <ReferFriend />;
      case "password":
        return <ChangePassword/>;
      default:
        return <></>;
    }
  };

  // Function to handle logout
  const handleLogout = async () => {
    try {
      // Make API call to delete cookie
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/get/logout`, {
        method: 'POST',
        credentials: 'include', // Include cookies in request
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        // If successful, redirect to home page
        navigate('/');
        // Optional: refresh the page
        window.location.reload();
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleMenuClick = (id) => {
    if (id === "logout") {
      handleLogout();
    } else {
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row font-titillium">
      {/* Mobile Header */}
      <div className="lg:hidden w-full">
        <div className="bg-white shadow-md mb-4 p-4">
          <div className="relative">
            {showLeftArrow && (
              <button
                onClick={() => handleScroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-1 shadow-md"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            {showRightArrow && (
              <button
                onClick={() => handleScroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-1 shadow-md"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
            <div
              ref={scrollContainerRef}
              onScroll={checkScrollPosition}
              className="flex gap-8 px-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {menuGroups.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col items-center flex-shrink-0 w-20 snap-start cursor-pointer"
                  onClick={() => handleMenuClick(item.id)}
                >
                  <div className={`w-6 h-6 mb-1 ${activeSection === item.id ? 'text-blue-600' : 'text-gray-600'}`}>
                    <item.icon />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className={`text-xs text-center whitespace-nowrap ${activeSection === item.id ? 'text-blue-600' : ''}`}>
                      {item.label}
                    </span>
                    {item.count !== null && (
                      <span className="bg-gray-200 text-xs px-2 rounded-full">
                        {item.count}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block bg-white shadow-lg w-72 h-screen">
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">MK</span>
            </div>
            <div>
              <h2 className="font-medium">Mayank Kataria</h2>
              <p className="text-xs text-gray-500">02:59:04 PM</p>
            </div>
          </div>
        </div>

        <nav className="py-2">
          {menuGroups.map((item) => (
            <div
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer
                ${activeSection === item.id ? 'bg-blue-50 text-blue-600' : ''}`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-5 h-5 ${activeSection === item.id ? 'text-blue-600' : 'text-gray-500'}`} />
                <span className="text-sm">{item.label}</span>
              </div>
              {item.count !== null && (
                <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                  {item.count}
                </span>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {renderContent()}
      </div>
    </div>
  );
};

export default Profile;