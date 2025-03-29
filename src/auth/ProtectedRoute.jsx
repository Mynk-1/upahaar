import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  // console.log('Protected Route State:', {
  //   user,
  //   loading,
  //   allowedRoles,
  //   userRole: user?.role
  // });


  if (loading) {
    return <div>Loading...</div>;
  }


  if (!user) {
    console.log('No user found, redirecting to login');
    return <Navigate to="/login" replace />;
  }


  if (!allowedRoles.includes(user.role)) {
    console.log('User role not authorized');
    return <Navigate to="/unauthorized" replace />;
  }

 
  return children;
};

export default ProtectedRoute;