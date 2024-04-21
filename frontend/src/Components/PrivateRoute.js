import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";


const PrivateRoute = ( {children} ) =>  {
  const { token } = useAuth();
  const location = useLocation();
  console.log("location in private route" , location);
  return token ? children : <Navigate to="/login" state={{ from: location }} replace />
}

export default PrivateRoute;