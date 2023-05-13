import React from "react";
import { Navigate } from "react-router-dom";
import { getUser } from "../hooks/user.actions";

function ProtectedRoute({ children }) {
    const user = getUser();
    console.log("I'm in router")

    return user ? <>{children}</> : <Navigate to="/login/" />;
}

export default ProtectedRoute;