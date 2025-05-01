import { Order } from '@shared/schema';

/**
 * LocalStorage keys
 */
const STORAGE_KEYS = {
  ORDERS: 'liboyystore.orders',
  AUTH: 'liboyystore.auth'
};

/**
 * Get all orders from localStorage
 * @returns Array of orders
 */
export const getOrders = (): Order[] => {
  try {
    const ordersJson = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (!ordersJson) return [];
    return JSON.parse(ordersJson);
  } catch (error) {
    console.error('Error getting orders from localStorage:', error);
    return [];
  }
};

/**
 * Add a new order to localStorage
 * @param order - Order to add
 */
export const addOrder = (order: Order): void => {
  try {
    const orders = getOrders();
    orders.push(order);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  } catch (error) {
    console.error('Error adding order to localStorage:', error);
  }
};

/**
 * Update an order in localStorage
 * @param updatedOrder - Order with updated fields
 */
export const updateOrder = (updatedOrder: Order): void => {
  try {
    const orders = getOrders();
    const index = orders.findIndex(order => order.id === updatedOrder.id);
    
    if (index !== -1) {
      orders[index] = updatedOrder;
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    }
  } catch (error) {
    console.error('Error updating order in localStorage:', error);
  }
};

/**
 * Get a specific order by ID
 * @param orderId - The ID of the order to retrieve
 * @returns The order if found, undefined otherwise
 */
export const getOrderById = (orderId: string): Order | undefined => {
  try {
    const orders = getOrders();
    return orders.find(order => order.id === orderId);
  } catch (error) {
    console.error('Error getting order by ID from localStorage:', error);
    return undefined;
  }
};

/**
 * Clear all order data from localStorage
 */
export const clearOrders = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
  } catch (error) {
    console.error('Error clearing orders from localStorage:', error);
  }
};

/**
 * Save admin auth token to localStorage
 * @param token - Auth token
 */
export const saveAuthToken = (token: string): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.AUTH, token);
  } catch (error) {
    console.error('Error saving auth token to localStorage:', error);
  }
};

/**
 * Get admin auth token from localStorage
 * @returns Auth token if exists, null otherwise
 */
export const getAuthToken = (): string | null => {
  try {
    return localStorage.getItem(STORAGE_KEYS.AUTH);
  } catch (error) {
    console.error('Error getting auth token from localStorage:', error);
    return null;
  }
};

/**
 * Clear admin auth token from localStorage
 */
export const clearAuthToken = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  } catch (error) {
    console.error('Error clearing auth token from localStorage:', error);
  }
};
