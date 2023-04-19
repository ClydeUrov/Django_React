import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const authData = localStorage.getItem("auth");
    const { user } = authData ? JSON.parse(authData) : {};

    return user && user.account ? (<>{children}</>) : (<Navigate to="/login/" />);
}

export default ProtectedRoute;