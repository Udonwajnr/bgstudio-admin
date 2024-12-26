"use client";

import React, { createContext, useState, useEffect, useContext, useMemo } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {jwtDecode }from "jwt-decode";

// Create the AuthContext
const AuthContext = createContext();

// Axios instance
const api = axios.create({
  baseURL: "https://bgstudiobackend-1.onrender.com",
  withCredentials: true, // Send cookies with requests
});

// Axios interceptor for handling token refresh
api.interceptors.response.use(
  (response) => response, // Pass successful responses through
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite retry loops
      try {
        // Call refresh token endpoint
        const refreshResponse = await axios.post(
          "https://bgstudiobackend-1.onrender.com/api/auth/refresh-token",
          {},
          { withCredentials: true }
        );

        console.log(refreshResponse)
        const newAccessToken = refreshResponse.data.accessToken;
        setAccessToken(newAccessToken); // Save the new token in memory
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest); // Retry the original request
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError.response?.data || refreshError.message);
        clearAuthData();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Manage accessToken in memory
let accessToken = null;
const getAccessToken = () => accessToken;
const setAccessToken = (token) => { accessToken = token; };
const clearAuthData = () => {
  accessToken = null;
  localStorage.removeItem("accessToken");
};

// Check if token is expired
const isTokenExpired = (token) => {
  const decoded = jwtDecode(token);
  return decoded.exp * 1000 < Date.now();
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Validate the token
  const validateToken = async (token) => {
    try {
      const response = await api.get("https://bgstudiobackend-1.onrender.com/api/protected-route", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsAuthenticated(true);
      setUser(response.data.user);
    } catch (error) {
      console.error("Token validation failed:", error);
      setIsAuthenticated(false);
      clearAuthData();
      router.push("/");
    }
  };

  // Check authentication on initial load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");
      if (token && !isTokenExpired(token)) {
        setAccessToken(token);
        await validateToken(token);
      } else {
        setIsAuthenticated(false);
        clearAuthData();
        router.push("/");
      }
    };
  console.log(document.cookie)
    checkAuth();
  }, [router]);

  // Login function
  const login = async (email, password) => {
    try {
      const { data } = await api.post("http://localhost:8000/api/auth/login", { email, password });
      setAccessToken(data.accessToken);
      localStorage.setItem("accessToken", data.accessToken);
      setIsAuthenticated(true);
      router.push("/dashboard");
    } catch (error) {
      const message = error.response?.data?.message || "Login failed. Please try again.";
      alert(message);
      throw new Error(message);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await api.post("https://bgstudiobackend-1.onrender.com/api/auth/logout", {}, { withCredentials: true });
      clearAuthData();
      setIsAuthenticated(false);
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };

  const value = useMemo(
    () => ({ isAuthenticated, user, login, logout, api }),
    [isAuthenticated, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for using AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
