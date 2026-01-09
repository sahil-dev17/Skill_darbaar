import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://192.168.1.27:8000/api",
  headers: {
    Accept: "application/json",
  },
  withCredentials: true,
});

// 🔐 Auto attach token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
