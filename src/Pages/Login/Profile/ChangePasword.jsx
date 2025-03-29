import React, { useState } from "react";
import { Mail, Phone, ArrowRight, Check, KeyRound } from "lucide-react";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Simulated user profile data - in real app, this would come from your backend
  const userProfile = {
    email: "j***@example.com",
    phone: "+1 ***-***-4567"
  };

  const handleSelectMethod = async (selectedMethod) => {
    setMethod(selectedMethod);
    setLoading(true);
    // Simulate API call to send OTP
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setStep(2);
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    // Check for fixed OTP - 000000
    if (code === "000000") {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoading(false);
      setStep(3);
    } else {
      setLoading(false);
      setError("Invalid code. For testing, use: 000000");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setSuccess(true);
  };

  const StepIndicator = ({ currentStep }) => (
    <div className="flex items-center justify-center space-x-4 mb-6">
      {[1, 2, 3].map((num) => (
        <div
          key={num}
          className={`w-2 h-2 rounded-full ${
            num === currentStep
              ? "bg-blue-600"
              : num < currentStep
              ? "bg-green-500"
              : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  );

  if (success) {
    return (
      <div className="mt-8 md:mt-16">
        <div className="max-w-md mx-auto p-4">
          <div className="bg-white rounded-lg border p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Password Reset Successfully</h2>
            <p className="text-sm text-gray-500 mb-4">You can now login with your new password</p>
            <button 
              onClick={() => window.location.href = '/login'}
              className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              Go to Login
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 md:mt-16">
      <div className="max-w-md mx-auto p-4">
        <div className="bg-white rounded-lg border p-6">
          <StepIndicator currentStep={step} />
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          {step === 1 && (
            <>
              <div className="text-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Verify Your Identity</h2>
                <p className="text-sm text-gray-500 mt-1">Choose how you want to receive the verification code</p>
              </div>
              <div className="space-y-4">
                <button
                  onClick={() => handleSelectMethod("email")}
                  disabled={loading}
                  className="w-full px-4 py-3 border rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Email</div>
                    <div className="text-sm text-gray-500">{userProfile.email}</div>
                  </div>
                </button>

                <button
                  onClick={() => handleSelectMethod("phone")}
                  disabled={loading}
                  className="w-full px-4 py-3 border rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">SMS</div>
                    <div className="text-sm text-gray-500">{userProfile.phone}</div>
                  </div>
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <KeyRound className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Enter Verification Code</h2>
                <p className="text-sm text-gray-500 mt-1">
                  We sent a code to {method === "email" ? userProfile.email : userProfile.phone}
                </p>
                <p className="text-xs text-blue-600 mt-2">For testing, use code: 000000</p>
              </div>
              <form onSubmit={handleVerifyCode}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Verification Code</label>
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                      placeholder="Enter 6-digit code"
                      maxLength={6}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading || code.length !== 6}
                    className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-300"
                  >
                    {loading ? "Verifying..." : "Verify Code"}
                  </button>
                </div>
              </form>
            </>
          )}

          {step === 3 && (
            <>
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <KeyRound className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Set New Password</h2>
                <p className="text-sm text-gray-500 mt-1">Create a strong password</p>
              </div>
              <form onSubmit={handleResetPassword}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                      placeholder="Enter new password"
                      required
                      minLength={8}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                      placeholder="Confirm new password"
                      required
                      minLength={8}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading || !password || !confirmPassword || password !== confirmPassword}
                    className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-300"
                  >
                    {loading ? "Resetting..." : "Reset Password"}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;