import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Frontend from "./Frontend";
import Auth from "./Auth";
import { useAuthContext } from "../context/AuthContext";
export default function index() {
  const { isAuthenticated } = useAuthContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Frontend />} />
        <Route
          path="/auth/*"
          element={!isAuthenticated ? <Auth /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
