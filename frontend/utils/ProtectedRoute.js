// ✨ implement axiosWithAuth
import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const { children, ...rest } = props;
  return (
    <Route
      {...rest}
      render={() => {
        if (localStorage.getItem("token")) return children;
        else return <Navigate to='/' />;
      }}
    />
  );
};

export default ProtectedRoute;
