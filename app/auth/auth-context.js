"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import api from "../axios/axiosConfig";
import { toast } from "sonner";
// Create the AuthContext
const AuthContext = createContext();

// Manage accessToken in memory
let accessToken = null;
const getAccessToken = () => accessToken;
const setAccessToken = (token) => { accessToken = token; };

const clearAuthData = () => {
  accessToken = null;
  localStorage.removeItem("accessToken");
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
      console.log("Token validation failed:", error);
      setIsAuthenticated(false);
      clearAuthData();
      router.push("/");
    }
  };

  // Check authentication on initial load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        setAccessToken(token);
        await validateToken(token);
      } else {
        console.log("Access token missing");
        clearAuthData();
        router.push("/");
      }
    };
    checkAuth();
  }, [router]);

  // Login function
  const login = async (email, password) => {
    try {
      const { data } = await api.post("https://bgstudiobackend-1.onrender.com/api/auth/login", { email, password });
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
        toast.success('Logout Successful:')
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
