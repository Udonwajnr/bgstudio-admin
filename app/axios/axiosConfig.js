import axios from "axios";

const api = axios.create({
  baseURL: "https://bgstudiobackend-1.onrender.com",
  withCredentials: true, // Ensures cookies (refresh token) are sent
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add Authorization header to every request
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

// Handle token refresh on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Request a new access token
        const { data } = await axios.post(
          "https://bgstudiobackend-1.onrender.com/api/auth/refresh-token",
          {},
          { withCredentials: true } // Sends the refresh token cookie
        );

        const newAccessToken = data.accessToken;

        // Store the new token and update the header
        localStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        // Retry the failed request
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError.response?.data || refreshError.message);
        localStorage.removeItem("accessToken");
        // Optionally redirect to login
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
