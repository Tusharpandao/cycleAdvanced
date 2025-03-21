import axios from 'axios';
import { isAuthenticated } from './auth';
import { toast } from 'react-hot-toast';

// Add a response interceptor
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle session expiration
    if (error.response?.status === 403) {
      if (!isAuthenticated()) {
        localStorage.removeItem('token');
        window.location.href = '/signIn';
      }
    }

    // Handle cart-related errors
    if (error.response && error.config.url.includes('/cart/')) {
      if (error.response.data) {
        toast.error(error.response.data);
      } else {
        toast.error('An error occurred while accessing the cart');
      }
      error.isHandled = true;
    }

    return Promise.reject(error);
  }
);

export default axios; 