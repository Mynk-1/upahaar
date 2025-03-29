import React, { useState, useEffect } from "react";
import { X, PlusCircle, MapPin, Edit, Trash2,AlertCircle } from "lucide-react";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { deleteCartItem, fetchCart } from '../../Store/Slices/cartitemSlice';
import { useAuth } from "../../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

// Address Modal Component from DeliveryAddress
const AddressModal = ({ isOpen, onClose, address, onSave }) => {
  const [formData, setFormData] = useState(
    address || {
      type: "Home",
      name: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "India", 
      phone: "",
      isDefault: false,
    }
  );
  

  // Reset form data when modal opens with new address
  React.useEffect(() => {
    setFormData(
      address || {
        type: "Home",
        name: "",
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "India",
        phone: "",
        isDefault: false,
      }
    );
  }, [address]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {address ? "Edit Address" : "Add New Address"}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm text-gray-600">Address Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="Home">Home</option>
              <option value="Office">Office</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-gray-600">Street Address</label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm text-gray-600">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm text-gray-600">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-gray-600">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm text-gray-600">PIN Code</label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                required
                pattern="[0-9]{6}"
                title="Please enter a valid 6-digit PIN code"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm text-gray-600">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                required
                pattern="[0-9]{10}"
                title="Please enter a valid 10-digit phone number"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
              id="isDefault"
            />
            <label htmlFor="isDefault" className="text-sm text-gray-600">
              Set as default address
            </label>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {address ? "Save Changes" : "Add Address"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const BagSlider = ({ isOpen, setToggle, cartData }) => {
  const [showContent, setShowContent] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const dispatch = useDispatch();
  const { user } = useAuth(); // Get user from auth context
  const navigate = useNavigate()
  
  // Enhanced animation control
  useEffect(() => {
    if (isOpen) {
      // Shorter delay for a more responsive feel
      const timer = setTimeout(() => setShowContent(true), 150);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isOpen]);

  // Fetch addresses when component mounts or isOpen changes, only if user is logged in
  useEffect(() => {
    if (isOpen && user) {
      fetchAddresses();
    }
  }, [isOpen, user]);

  // Fetch addresses from API
  const fetchAddresses = async () => {
    if (!user) return; // Only proceed if user is authenticated
    
    try {
      const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/api/address`, { withCredentials: true });
      setAddresses(response.data);
      
      // Set default address as selected
      const defaultAddress = response.data.find(addr => addr.isDefault);
      if (defaultAddress) {
        setSelectedAddressId(defaultAddress._id);
      } else if (response.data.length > 0) {
        setSelectedAddressId(response.data[0]._id);
      }
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
    }
  };

  const calculateSubtotal = () => {
    if (!cartData || !cartData.items) return 0;
    return cartData.items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  // Calculate shipping cost based on subtotal
  const calculateShipping = () => {
    const subtotal = parseFloat(calculateSubtotal());
    return subtotal < 1500 ? 50 : 0;
  };

  // Calculate total with shipping included
  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const shipping = calculateShipping();
    return (subtotal + shipping).toFixed(2);
  };

  const handleAddressChange = (addressId) => {
    setSelectedAddressId(addressId);
  };

  const handleAddNew = () => {
    if (!user) {
      alert("Please log in to add an address");
      return;
    }
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const handleEdit = (address) => {
    if (!user) return;
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!user) return;
    
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        await axios.delete(`${import.meta.env.REACT_APP_API_URL}/api/address/delete/${id}`, { withCredentials: true });
        fetchAddresses(); // Refresh the list after deletion
      } catch (error) {
        console.error("Failed to delete address:", error);
      }
    }
  };

  // Handler for deleting cart items
  const handleDeleteCartItem = (itemId) => {
    if (!user) {
      alert("Please log in to manage your cart");
      return;
    }
    
    if (window.confirm("Are you sure you want to remove this item from your bag?")) {
      dispatch(deleteCartItem(itemId));
    }
  };

  const handleSetDefault = async (id) => {
    if (!user) return;
    
    try {
      await axios.get(`${import.meta.env.REACT_APP_API_URL}/api/address/default/${id}`, { withCredentials: true });
      fetchAddresses(); // Refresh the list after setting default
      setSelectedAddressId(id);
    } catch (error) {
      console.error("Failed to set default address:", error);
    }
  };

  const handleSave = async (formData) => {
    if (!user) {
      alert("Please log in to save addresses");
      return;
    }
    
    try {
      if (editingAddress) {
        // Update existing address
        await axios.post(`${import.meta.env.REACT_APP_API_URL}/api/address/edit/${editingAddress._id}`, formData, { withCredentials: true });
      } else {
        // Add new address
        await axios.post(`${import.meta.env.REACT_APP_API_URL}/api/address/add`, formData, { withCredentials: true });
      }
      fetchAddresses(); // Refresh the list after saving
    } catch (error) {
      console.error("Failed to save address:", error);
    }
  };

  const initiatePayment = async () => {
    if (!user) {
      alert("Please log in to proceed with checkout");
      return;
    }
    
    if (!selectedAddressId) {
      alert("Please select a delivery address");
      return;
    }
  
    try {
      const orderResponse = await axios.post(`${import.meta.env.REACT_APP_API_URL}/api/orders/create`, {
        amount: calculateTotal(), // Use total with shipping
        addressId: selectedAddressId, // Pass the selected address ID
        shipping: calculateShipping(), // Pass the shipping cost
      }, {
        withCredentials: true,
      });
      console.log(orderResponse.data)
      const { id, amount, currency } = orderResponse.data.razorpayOrder;
  
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: amount,
        currency: currency,
        name: "MM Graphics",
        description: "Complete Printing Solution",
        order_id: id,
        handler: async (response) => {
          const paymentVerificationResponse = await axios.post(`${import.meta.env.REACT_APP_API_URL}/api/orders/verify-payment`, {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            addressId: selectedAddressId, // Pass the selected address ID
            shipping: calculateShipping(), // Pass the shipping cost
          },{withCredentials:true});
          console.log(paymentVerificationResponse.data.success)
          if (paymentVerificationResponse.data) {
            alert("Payment verified successfully!");
            dispatch(fetchCart());
          } else {
            alert("Payment verification failed. Please try again.");
          }
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
      };
  
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error in payment process:", error);
      alert("There was an error initiating payment. Please try again.");
    }
  };

  // Determine if user is logged in for UI messaging
  const notLoggedInMessage = !user ? (
    <div className="bg-gray-50 p-6 text-center rounded mb-4">
      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <MapPin className="w-6 h-6 text-gray-400" />
      </div>
      <h3 className="text-sm font-medium mb-2">Please Log In</h3>
      <p className="text-xs text-gray-500 mb-4">
        You need to be logged in to view addresses and checkout
      </p>
      <button
        className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-sm hover:bg-gray-800 transition-colors duration-200 text-sm"
        onClick={() => {setToggle(false);navigate("/profile")}  } // Close the slider
      >
        Go to Login
      </button>
    </div>
  ) : null;

  return (
    <>
      {/* Backdrop overlay with fade effect */}
      {/* {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-200 bg-opacity-0 z-40 transition-opacity duration-100 "
          style={{
            opacity: showContent ? 0.5 : 0,
            visibility: showContent ? 'visible' : 'hidden'
          }}
          onClick={() => setToggle(false)}
        />
      )} */}
      
      <div
        className={`fixed inset-y-0 right-0 w-[90%] max-w-[480px] bg-white z-50 transform transition-all duration-400 ease-out shadow-xl ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-95"
        }`}
        style={{
          boxShadow: isOpen ? "-5px 0 25px rgba(0, 0, 0, 0.1)" : "none"
        }}
      >
        <div className="h-full flex flex-col">
          <div
            className={`px-4 sm:px-6 py-4 flex justify-between items-center border-gray-200 border-b transform transition-all duration-500 ease-out ${
              showContent
                ? "translate-y-0 opacity-100"
                : "-translate-y-4 opacity-0"
            }`}
          >
            <h2 className="text-xl font-medium tracking-wide">BAG</h2>
            <button
              onClick={() => setToggle(false)}
              className="text-black hover:text-gray-700 transition-colors duration-200"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto">
            {/* Display not logged in message if no user */}
            {notLoggedInMessage}

            {/* Only show items section if user is logged in and cart has items */}
            {user && (
              <div className="px-4 sm:px-6 py-4">
                <h3 className="text-base font-medium mb-3">Your Items</h3>
                {cartData && cartData.items && cartData.items.length > 0 ? (
                  cartData.items.map((item, index) => (
                    <div
                      key={index}
                      className={`flex gap-3 sm:gap-5 mb-6 pb-5 border-b border-gray-100 transform transition-all duration-400 ease-out`}
                      style={{
                        opacity: showContent ? 1 : 0,
                        transform: showContent ? 'translateY(0)' : 'translateY(20px)',
                        transitionDelay: `${100 + index * 75}ms`
                      }}
                    >
                      <img
                        src={item.images && item.images.length > 0 ? item.productImage : ''}
                        alt={item.product.name}
                        className="w-20 sm:w-24 h-28 sm:h-32 object-cover rounded-sm"
                      />
                      <div className="flex-grow flex flex-col">
                        <div className="flex justify-between">
                          <h3 className="text-sm sm:text-base font-medium mb-1">{item.product.name}</h3>
                          <button 
                            onClick={() => handleDeleteCartItem(item._id)}
                            className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                            aria-label="Remove item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="space-y-1 mb-auto">
                          {item.selectedTypeName && (
                            <p className="text-xs sm:text-sm text-gray-600">
                              {item.selectedTypeName}
                            </p>
                          )}
                          {item.selectedSizeName && (
                            <p className="text-xs sm:text-sm text-gray-600">
                              Size: {item.selectedSizeName}
                            </p>
                          )}
                          {item.selectedColorName && (
                            <p className="text-xs sm:text-sm text-gray-600">
                              Color: {item.selectedColorName}
                            </p>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between mt-3 pt-2">
                          <span className="text-xs sm:text-sm text-gray-600">
                            Quantity: {item.quantity}
                          </span>
                          <span className="font-semibold text-sm sm:text-base">
                            INR {(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Your bag is empty
                  </div>
                )}
              </div>
            )}

            {/* Address Selection Section - only show if user is logged in */}
            {user && (
              <div className="px-4 sm:px-6 py-4 border-t border-gray-100">
                <div 
                  className={`flex justify-between items-center mb-3 transition-opacity duration-500`}
                  style={{
                    opacity: showContent ? 1 : 0,
                    transitionDelay: '250ms'
                  }}
                >
                  <h3 className="text-base font-medium">Delivery Address</h3>
                  <button 
                    onClick={handleAddNew}
                    className="text-sm flex items-center gap-1 text-black hover:text-gray-700 transition-colors duration-200"
                  >
                    <PlusCircle size={16} />
                    <span>Add New</span>
                  </button>
                </div>

                {addresses.length === 0 ? (
                  <div 
                    className="bg-gray-50 p-6 text-center rounded mb-4 transition-all duration-500"
                    style={{
                      opacity: showContent ? 1 : 0,
                      transform: showContent ? 'translateY(0)' : 'translateY(20px)',
                      transitionDelay: '300ms'
                    }}
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-6 h-6 text-gray-400" />
                    </div>
                    <h3 className="text-sm font-medium mb-2">No Addresses Found</h3>
                    <p className="text-xs text-gray-500 mb-4">
                      You haven't added any delivery addresses yet
                    </p>
                    <button
                      onClick={handleAddNew}
                      className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-sm hover:bg-gray-800 transition-colors duration-200 text-sm"
                    >
                      <PlusCircle size={14} />
                      <span>Add New Address</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 mb-4">
                    {addresses.map((address, index) => (
                      <div 
                        key={address._id}
                        className={`p-3 border rounded relative transition-all duration-400 ease-out ${
                          selectedAddressId === address._id ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-400'
                        }`}
                        style={{
                          opacity: showContent ? 1 : 0,
                          transform: showContent ? 'translateY(0)' : 'translateY(20px)',
                          transitionDelay: `${300 + index * 75}ms`
                        }}
                      >
                        {address.isDefault && (
                          <span className="absolute top-2 right-2 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded">
                            Default
                          </span>
                        )}
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-2">
                            <input
                              type="radio"
                              id={`address-${address._id}`}
                              name="selected-address"
                              className="mt-1"
                              checked={selectedAddressId === address._id}
                              onChange={() => handleAddressChange(address._id)}
                            />
                            <div onClick={() => handleAddressChange(address._id)} className="cursor-pointer">
                              <div className="font-medium text-sm">{address.type}</div>
                              <div className="text-xs text-gray-600 mt-1">{address.name}</div>
                              <div className="text-xs text-gray-600">{address.street}</div>
                              <div className="text-xs text-gray-600">
                                {address.city}, {address.state} - {address.postalCode}
                              </div>
                              <div className="text-xs text-gray-600">{address.country}</div>
                              <div className="text-xs text-gray-600 mt-1">+91 {address.phone}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 mt-3 pt-2 border-t">
                          <button
                            onClick={() => handleEdit(address)}
                            className="flex items-center gap-1 text-xs text-gray-600 hover:text-black transition-colors duration-200"
                          >
                            <Edit size={12} />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDelete(address._id)}
                            className="flex items-center gap-1 text-xs text-red-600 hover:text-red-700 transition-colors duration-200"
                          >
                            <Trash2 size={12} />
                            <span>Delete</span>
                          </button>
                          {!address.isDefault && (
                            <button
                              onClick={() => handleSetDefault(address._id)}
                              className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-700 transition-colors duration-200"
                            >
                              <span>Set as Default</span>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Show checkout section only if user is logged in */}
          {user && (
            <div
              className={`px-4 sm:px-6 py-4 border-t bg-gray-50 transition-all duration-500 ease-out`}
              style={{
                opacity: showContent ? 1 : 0,
                transform: showContent ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: '400ms'
              }}
            >
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Subtotal</span>
                  <span className="text-sm">
                    INR {calculateSubtotal()}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Shipping</span>
                  <span className="text-sm">
                    {calculateShipping() > 0 
                      ? `INR ${calculateShipping().toFixed(2)}` 
                      : "FREE"}
                  </span>
                </div>
                
                {calculateShipping() > 0 && (
                  <div className="text-xs text-gray-500 italic">
                    Free shipping on orders above INR 1,500
                  </div>
                )}
                
                <div className="border-t pt-2 mt-2 flex justify-between items-center">
                  <span className="uppercase text-sm font-medium">Total</span>
                  <span className="font-semibold text-lg">
                    INR {calculateTotal()}
                  </span>
                </div>
              </div>

                 {/* COD Unavailability Note */}
            { (
              <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 p-2 rounded mb-3">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <p className="text-xs text-yellow-800">
                  Cash on Delivery (COD) is not available for customized items.
                </p>
              </div>
            )}
              
              <button 
                className={`w-full py-3 tracking-wide font-medium rounded-sm transition-all duration-300 ${
                  !cartData || !cartData.items || cartData.items.length === 0 || addresses.length === 0 
                    ? 'bg-gray-400 text-white cursor-not-allowed' 
                    : 'bg-black text-white hover:bg-gray-900'
                }`}
                onClick={initiatePayment}
                disabled={!cartData || !cartData.items || cartData.items.length === 0 || addresses.length === 0}
              >
                {addresses.length === 0 ? 'ADD ADDRESS TO PROCEED' : 
                 (!cartData || !cartData.items || cartData.items.length === 0) ? 'YOUR BAG IS EMPTY' : 
                 'PROCEED TO CHECKOUT'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Address Modal */}
      <AddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        address={editingAddress}
        onSave={handleSave}
      />
    </>
  );
};

export default BagSlider;