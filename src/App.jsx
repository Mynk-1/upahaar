import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from 'react-redux';
import React, { Suspense, useState, useEffect } from 'react';
import store from '../src/Store/Store';
import HomePage from "../src/Pages/HomePage/HomePage/HomePage";
import ProductCatalog from "./Pages/ProductCatalog/ProductCatalog";
import Profile from "./Pages/Login/Profile";
import Login from "./Pages/Login/Login";
import Navigation from "./Pages/Navbar/Navbar";
// import MobileNavBar from "./Pages/Navbar/MobBottomNav";
import Footer from "./Pages/Footer/Footer";
import CustomProductDetail from "./Pages/ProductDetail/CustumProductDetail/ProductDetail.jsx";
import ProductDetail from "./Pages/ProductDetail/ProductDetail/ProductDetail.jsx";
import { AuthProvider } from "./auth/AuthProvider.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import MyOrders from "./Pages/Login/Profile/MyOrder.jsx";
import { XCircle } from "lucide-react";
import UpcomingEvents from "./Pages/About/UpcomingEvent.jsx";

import OrdersTable from "./Pages/Dashboard/OrderTable.jsx";
import AddProduct from "./Pages/Dashboard/AddProduct.jsx";




// Error Page Component
const ErrorPage = ({ error }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <XCircle className="w-8 h-8 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h1>
        <p className="text-gray-600 mb-6">
          {error || "We encountered an error while loading this page. Please try again later."}
        </p>
        <div className="space-y-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Reload Page
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="w-full bg-white text-gray-900 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

// Not Found (404) Component
const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl font-bold text-blue-500">404</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => window.location.href = '/'}
          className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

// Loading Component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin"></div>
  </div>
);

// Minimal Class Error Boundary (required for React's error boundary functionality)
class MinimalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    // Call the onError function if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback(this.state.error);
    }
    return this.props.children;
  }
}

// Functional wrapper for ErrorBoundary
const FunctionalErrorBoundary = ({ children, onError }) => {
  return (
    <MinimalErrorBoundary
      fallback={(error) => <ErrorPage error={error?.message} />}
      onError={onError}
    >
      {children}
    </MinimalErrorBoundary>
  );
};

function App() {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Global error handler
  useEffect(() => {
    const handleError = (event) => {
      console.error("Global error caught:", event.error);
      setHasError(true);
      setErrorMessage(event.error?.message || "An unexpected error occurred");
      event.preventDefault();
    };

    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);

  if (hasError) {
    return <ErrorPage error={errorMessage} />;
  }

  return (
    <>
      <Provider store={store}>

        <Navigation />

        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute allowedRoles={["user","admin"]}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute allowedRoles={["user","admin"]}>
                  <MyOrders />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<UpcomingEvents />} />
            <Route path="/:category/:id" element={<ProductDetail />} />
            <Route path="/productcatalog/:category" element={<ProductCatalog />} />
            <Route path="/customize/:category" element={<CustomProductDetail />} />
           
            <Route path="/dashboard" element={<ProtectedRoute allowedRoles={["admin"]}><OrdersTable /></ProtectedRoute>} />
            <Route path="/addproduct" element={<ProtectedRoute><AddProduct/></ProtectedRoute>}/>

            {/* Error Routes */}
            <Route path="/error" element={<ErrorPage />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Suspense>

        <Footer />

      </Provider>
    </>
  );
}

// Handle errors inside the error boundary
const handleErrors = (error, errorInfo) => {
  console.error("Error caught by boundary:", error, errorInfo);
};

const AppWithRouter = () => (
  <AuthProvider>
    <Router>
      <FunctionalErrorBoundary onError={handleErrors}>
        <App />
      </FunctionalErrorBoundary>
    </Router>
  </AuthProvider>
);

export default AppWithRouter; 