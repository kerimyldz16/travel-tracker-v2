import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 10000,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    console.log("Request Interceptor:", config);
    return config;
  },
  (error) => {
    // Do something with request error
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // If the request succesfull
    console.log("Response Interceptor:", response);
    return response;
  },
  (error) => {
    // If the request isn't succesfull
    console.error("Response Error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
