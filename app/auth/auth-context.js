"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

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
        const { data } = await axios.post(
          "https://bgstudiobackend-1.onrender.com/api/auth/refresh-token",
          {},
          { withCredentials: true }
        );
        console.log(data)
        const newAccessToken = data.accessToken;
        localStorage.setItem("accessToken", newAccessToken); // Save the new token
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest); // Retry the original request
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError.response?.data || refreshError.message);
        localStorage.removeItem("accessToken");
        // window.location.href = "/"; // Redirect to login
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Check authentication on initial load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");

      if (token) {
        try {
          // Validate the token
          const response = await api.get("https://bgstudiobackend-1.onrender.com/api/protected-route", {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.status === 200) {
            setIsAuthenticated(true);
            setUser(response.data.user); // Save user data if returned
          }
        } catch (error) {
          console.error("Authentication check failed:", error);
          setIsAuthenticated(false);
          localStorage.removeItem("accessToken");
          router.push("/"); // Redirect to login
        }
      } else {
        setIsAuthenticated(false);
        router.push("/"); // Redirect to login
      }
    };

    checkAuth();
  }, [router]);

  // Login function
  const login = async (email, password) => {
    try {
      const { data } = await api.post("https://bgstudiobackend-1.onrender.com/api/auth/login", { email, password });

      localStorage.setItem("accessToken", data.accessToken);
      setIsAuthenticated(true);
      setUser(data.user); // Save user data
      console.log(document.cookie);
      router.push('/dashboard');
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await api.post("/api/auth/logout", {}, { withCredentials: true });
      localStorage.removeItem("accessToken");
      setIsAuthenticated(false);
      setUser(null);
      router.push("/"); // Redirect to login
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, api }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
