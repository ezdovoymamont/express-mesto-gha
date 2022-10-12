import React from "react";
import { Navigate } from "react-router-dom";
import Header from "./Header";

function ProtectedRoute({ loggedIn, children }) {
  return (loggedIn ? children : <Navigate to="/sign-in" />);
}

export default ProtectedRoute;
