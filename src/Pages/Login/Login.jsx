import React, { useEffect, useState } from "react";
import { ChevronDown, Phone, MessageSquare, Gift, Cake, Heart, PartyPopper, Package, ShoppingBag, Star } from "lucide-react";
import { useAuth } from "../../auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import "./Logincss.css"; // Import the CSS file

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const {login, user} = useAuth();
  const navigate = useNavigate();
  
  const requestOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (phoneNumber.length !== 10) {
        throw new Error("Please enter a valid 10-digit phone number");
      }

      const response = await fetch(`${import.meta.env.REACT_APP_API_URL}/api/auth/send-otp`, {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({phone: String(phoneNumber)})  
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      setIsOtpSent(true);
      setResendTimer(30); // Start 30 second timer for resend button
      startResendTimer();
      setLoading(false);
     
    } catch (err) {
      setError(err.message || "Error sending OTP. Please try again.");
      setLoading(false);
    }
  };

  const startResendTimer = () => {
    const interval = setInterval(() => {
      setResendTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const verifyOTP = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.REACT_APP_API_URL}/api/auth/verify-otp`, {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ phone: String(phoneNumber), otp: String(otp) })    
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      
      // Update context with user data
      if (data.user) {
        login(data.user);
        // Navigation will happen automatically through the useEffect
      } else {
        throw new Error("No user data received");
      }
    } catch (err) {
      setError(err.message || "Error verifying OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    
    if (/^\d*$/.test(value) || value === "") {
      setPhoneNumber(value);
    }
  };

  // Gifting-themed background icons
  const GiftBackgroundIcons = () => {
    const giftIcons = [
      { Icon: Gift, color: "text-blue-600", size: "w-12 h-12", animation: "animate-float-1" },
      { Icon: Cake, color: "text-yellow-600", size: "w-10 h-10", animation: "animate-float-2" },
      { Icon: Heart, color: "text-red-600", size: "w-8 h-8", animation: "animate-float-3" },
      { Icon: PartyPopper, color: "text-pink-600", size: "w-14 h-14", animation: "animate-float-4" },
      { Icon: Package, color: "text-purple-600", size: "w-12 h-12", animation: "animate-float-2" },
      { Icon: ShoppingBag, color: "text-black-600", size: "w-10 h-10", animation: "animate-float-3" },
      { Icon: Star, color: "text-brown-600", size: "w-6 h-6", animation: "animate-float-1" }
    ];

    return (
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(25)].map((_, index) => {
          const iconData = giftIcons[index % giftIcons.length];
          const { Icon, color, size, animation } = iconData;
          const randomLeft = `${Math.random() * 100}%`;
          const randomTop = `${Math.random() * 100}%`;
          const randomDelay = `${Math.random() * 8}s`;
          const randomRotate = `rotate-${Math.floor(Math.random() * 12) * 30}`;
          const opacity = "opacity-15";

          return (
            <div 
              key={index}
              className={`absolute ${size} ${color} ${opacity} ${animation} ${randomRotate}`}
              style={{ 
                left: randomLeft, 
                top: randomTop,
                animationDelay: randomDelay
              }}
            >
              <Icon />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="relative flex flex-col items-center pt-20 md:pt-0 md:justify-center p-4 min-h-screen bg-gray-100">
      {/* Animated background with gift icons */}
      <GiftBackgroundIcons />

      <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-6 sm:p-8 space-y-6 mx-auto z-10 border-t-4 border-black mt-0">
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">GIFTING MADE SIMPLE</h1>
          <p className="text-sm text-gray-600">Login with your phone to continue</p>
        </div>

        <form onSubmit={requestOTP} className="space-y-6">
          <div className="relative">
            <div className="flex rounded-lg border border-gray-300 overflow-hidden focus-within:border-black focus-within:ring-1 focus-within:ring-black transition-all bg-white">
              <div className="flex items-center px-3 sm:px-4 bg-transparent border-r border-gray-300">
                <div className="flex items-center gap-1 sm:gap-2">
                  <Phone className="w-5 h-5 text-black" />
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </div>
              </div>
              <input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                placeholder="Phone Number"
                className="flex-1 px-3 sm:px-4 py-3 focus:outline-none text-sm sm:text-base"
                maxLength={10}
                required
                disabled={loading}
              />
            </div>
          </div>

          {!isOtpSent ? (
            <button
              type="submit"
              className="w-full bg-black text-white rounded-lg py-3 font-medium hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || !phoneNumber || phoneNumber.length < 10}
            >
              {loading ? "Sending..." : "Request OTP"}
            </button>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <MessageSquare className="w-5 h-5 text-green-500" />
                </div>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter OTP"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-sm sm:text-base bg-white"
                  maxLength={6}
                  required
                  disabled={loading}
                />
              </div>
              <button
                type="button"
                onClick={verifyOTP}
                className="w-full bg-black text-white rounded-lg py-3 font-medium hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading || otp.length !== 6}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
              
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={requestOTP}
                  className="text-black hover:text-gray-700 text-sm font-medium focus:outline-none disabled:opacity-50 disabled:text-gray-400"
                  disabled={resendTimer > 0}
                >
                  {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-500 text-center">
            <MessageSquare className="w-4 h-4 text-green-600 animate-pulse" />
            {isOtpSent ? "A 6-digit OTP has been sent to your WhatsApp" : "A 6-digit OTP will be sent to your WhatsApp"}
          </div>
        </form>

        {/* Gifting element at bottom */}
        <div className="flex justify-center items-center gap-3 pt-2">
          <PartyPopper className="w-5 h-5 text-gray-500 animate-spin-slow" />
          <span className="text-sm text-gray-600">Bring joy with perfect gifts</span>
          <Heart className="w-5 h-5 text-gray-500 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default Login;