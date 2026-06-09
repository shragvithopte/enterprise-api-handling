import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response.data,

  (error) => {
    const status = error.response?.status;

    switch (status) {
      case 401:
        localStorage.removeItem("authToken");
        alert("Session expired");
        window.location.href = "/session-expired";
        break;

      case 403:
        alert("Access Denied");
        break;

      case 500:
        alert("Server Error");
        break;

      default:
        break;
    }

    return Promise.reject(error);
  }
);

export default apiClient;