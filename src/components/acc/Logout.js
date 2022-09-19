import React from "react";
import { Navigate } from "react-router-dom";

const Logout = () => {
  localStorage.removeItem("user");
  return <Navigate to="/"></Navigate>;
};

export default Logout;
