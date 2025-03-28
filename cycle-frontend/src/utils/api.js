import axios from 'axios';
import DomainName from './config';
import { getAuthHeader } from './auth';

// Authentication API functions
export const authAPI = {
  // Sign in user
  signIn: async (credentials) => {
    try {
      const response = await axios.post(
        `${DomainName}/auth/signIn`,
        credentials
      );
      return response.data;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  },

  // Sign up user
  signUp: async (userData) => {
    try {
      const response = await axios.post(
        `${DomainName}/auth/signUp`,
        userData
      );
      return response.data;
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  },

  // Get cart count
  getCartCount: async () => {
    try {
      const response = await axios.get(
        `${DomainName}/cart/cartItemCount`,
        getAuthHeader()
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching cart count:', error);
      return 0;
    }
  }
};

// Cart API functions
export const cartAPI = {
  // Get all cart items
  getAllCartItems: async () => {
    try {
      const response = await axios.get(
        `${DomainName}/cart/getAll`,
        getAuthHeader()
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching cart items:', error);
      throw error;
    }
  },

  // Update cart item quantity
  updateCartQuantity: async (cartId, quantity) => {
    try {
      const response = await axios.patch(
        `${DomainName}/cart/update-quantity`,
        {
          cartId,
          quantity,
        },
        getAuthHeader()
      );
      return response.data;
    } catch (error) {
      console.error('Error updating cart quantity:', error);
      throw error;
    }
  },

  // Remove single cart item
  removeCartItem: async (cartId) => {
    try {
      const response = await axios.delete(
        `${DomainName}/cart/remove/${cartId}`,
        getAuthHeader()
      );
      return response.data;
    } catch (error) {
      console.error('Error removing cart item:', error);
      throw error;
    }
  },

  // Clear entire cart for a user
  clearCart: async (userName) => {
    try {
      const response = await axios.delete(
        `${DomainName}/cart/clear/${userName}`,
        getAuthHeader()
      );
      return response.data;
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  },

  // Add item to cart
  addToCart: async (cartData) => {
    try {
      const response = await axios.post(
        `${DomainName}/cart/add`,
        cartData,
        getAuthHeader()
      );
      return response.data;
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error;
    }
  }
};

// Calculate API functions
export const calculateAPI = {
  // Get all brands
  getBrands: async () => {
    const response = await axios.get(
      `${DomainName}/cycle/brands`,
      getAuthHeader()
    );
    return response.data;
  },

  // Get items by brand
  getItemsByBrand: async (brandId) => {
    const response = await axios.get(
      `${DomainName}/cycle/byBrand/${brandId}`,
      getAuthHeader()
    );
    return response.data;
  },

  // Calculate price
  calculatePrice: async (requestData) => {
    const response = await axios.post(
      `${DomainName}/cycle/calculate-price`,
      requestData,
      getAuthHeader()
    );
    return response.data;
  }
};

// Item management API functions
export const itemAPI = {
  // Add new item
  addItem: async (itemData) => {
    const response = await axios.post(
      `${DomainName}/item/add`,
      itemData,
      getAuthHeader()
    );
    return response.data;
  },

  // Get items by brand name
  getItemsByBrandName: async (brandName) => {
    const response = await axios.get(
      `${DomainName}/item/brand/${brandName}`,
      getAuthHeader()
    );
    return response.data;
  },

  // Delete item
  deleteItem: async (itemId) => {
    const response = await axios.delete(
      `${DomainName}/item/delete/${itemId}`,
      getAuthHeader()
    );
    return response.data;
  },

  // Delete item with confirmation
  deleteConfirmItem: async (itemId) => {
    const response = await axios.delete(
      `${DomainName}/item/confirm/delete/${itemId}`,
      getAuthHeader()
    );
    return response.data;
  },

  // Update item date and price
  updateDateAndPrice: async (itemId, validTo, price) => {
    const params = new URLSearchParams({
      itemId: itemId,
      validTo: validTo,
      price: price
    });
    const response = await axios.patch(
      `${DomainName}/item/update/date-and-price?${params.toString()}`,
      null,
      getAuthHeader()
    );
    return response.data;
  }
};

// Brand management API functions
export const brandAPI = {
  // Get all brands
  getAllBrands: async () => {
    const response = await axios.get(
      `${DomainName}/brand/brands`,
      getAuthHeader()
    );
    return response.data;
  },

  // Add new brand
  addBrand: async (name) => {
    const response = await axios.post(
      `${DomainName}/brand/add?name=${name}`,
      null,
      getAuthHeader()
    );
    return response.data;
  },

  // Update brand
  updateBrand: async (id, newBrandName) => {
    const response = await axios.patch(
      `${DomainName}/brand/update`,
      {
        id: id,
        newBrandName: newBrandName,
      },
      getAuthHeader()
    );
    return response.data;
  },

  // Delete brand
  deleteBrand: async (id) => {
    const response = await axios.delete(
      `${DomainName}/brand/delete/${id}`,
      getAuthHeader()
    );
    return response.data;
  }
};
