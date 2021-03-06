import axios from 'axios';
import { STATIC_HOST } from 'constants';

const axiosClient = axios.create({
  baseURL: `${STATIC_HOST}/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors
// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    const { config, status, data } = error?.response;
    const URLS = ['/auth/local/register', '/auth/local'];

    // If register/ login failed
    if (URLS.includes(config?.url) && status === 400) {
      const errorList = data.data || [];
      const firstError = errorList[0] || {};
      const messageList = firstError.messages || [];
      const firstMessage = messageList[0] || {};

      throw new Error(firstMessage.message);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
