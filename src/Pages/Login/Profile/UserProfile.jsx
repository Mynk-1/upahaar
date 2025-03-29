import React, { useState, useEffect } from "react";
import { Edit, Save, X } from "lucide-react";
import { useAuth } from "../../../auth/AuthProvider";

const UserProfile = () => {
  const { user } = useAuth(); // Use useAuth inside the component
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthdate: "",
    gender: "",
  });

  // Fetch or initialize user profile
  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`${import.meta.env.REACT_APP_API_URL}/api/user/profile`, {
        method: "GET",
        credentials: "include", // Include cookies for authentication
      });

    
      const data = await response.json();
      // console.log(data)
      setFormData(data);
      
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch profile data on component mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save updated profile data
  const handleSave = async () => {
    try {
        await fetch(`${import.meta.env.REACT_APP_API_URL}/api/user/profile`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      // console.log(response)
       fetchUserProfile(); // Fetch updated data to ensure UI is in sync
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Cancel editing and reset form data
  const handleCancel = () => {
    fetchUserProfile(); // Reset to original data
    setIsEditing(false);
  };

  // Show loading state
  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 lg:p-8 mb-16">
      <div className="bg-white rounded-lg shadow p-6 relative mt-16">
        {/* Profile Header */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center text-white text-2xl">
            {formData.firstName?.[0]}
            {formData.lastName?.[0]}
          </div>
          <h2 className="text-lg font-semibold mt-2">
            {formData.firstName || "Welcome"}
          </h2>
        </div>

        {/* Edit Controls */}
        {isEditing ? (
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={handleCancel}
              className="text-red-500 hover:bg-red-50 p-2 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
            <button
              onClick={handleSave}
              className="text-green-500 hover:bg-green-50 p-2 rounded-full"
            >
              <Save className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="absolute top-4 right-4 text-gray-400 hover:bg-gray-50 p-2 rounded-full"
          >
            <Edit className="w-5 h-5" />
          </button>
        )}

        {/* Form Fields */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-16">
          <div>
            <label className="block text-sm text-gray-600 mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className={`w-full p-2 rounded border ${
                isEditing
                  ? "bg-white border-gray-300"
                  : "bg-gray-50 border-gray-200"
              }`}
              readOnly={!isEditing}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className={`w-full p-2 rounded border ${
                isEditing
                  ? "bg-white border-gray-300"
                  : "bg-gray-50 border-gray-200"
              }`}
              readOnly={!isEditing}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full p-2 rounded border ${
                isEditing
                  ? "bg-white border-gray-300"
                  : "bg-gray-50 border-gray-200"
              }`}
              readOnly={!isEditing}
            />
          </div>

          {/* Phone Number Field (Read-Only) */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Phone Number</label>
            <input
              type="tel"
              value={user.phone || ""}
              className="w-full p-2 rounded border bg-gray-50 border-gray-200"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">Birthdate</label>
            <input
              type="date"
              name="birthdate"
              value={formData.birthdate ? new Date(formData.birthdate).toISOString().split('T')[0] : ''}
              onChange={handleInputChange}
              className={`w-full p-2 rounded border ${
                isEditing
                  ? "bg-white border-gray-300"
                  : "bg-gray-50 border-gray-200"
              }`}
              readOnly={!isEditing}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className={`w-full p-2 rounded border ${
                isEditing
                  ? "bg-white border-gray-300"
                  : "bg-gray-50 border-gray-200"
              }`}
              disabled={!isEditing}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;