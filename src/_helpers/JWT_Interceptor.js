import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_KEY,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
(error) => Promise.reject(error)
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
      const originalRequest = error.config;
      // If the error status is 401, It means the token has expired
      if (error.response.status === 401) {
        localStorage.clear();
        return Promise.reject(error);
    }
    // If the error status is 403, It means the user is restricted!
    if (error.response.status === 403) {
      return alert("Restricted Route!!");
    }

    return axios(originalRequest);
  }
);

export default api;
