import { useState, useEffect, useCallback } from 'react';
import { Order } from '@shared/schema';
import { getOrders, addOrder as addOrderToStorage, updateOrder as updateOrderInStorage } from '@/lib/storage';

interface UseOrderHistory {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrder: (order: Order) => void;
  refreshOrders: () => void;
}

export const useOrderHistory = (): UseOrderHistory => {
  const [orders, setOrders] = useState<Order[]>([]);

  const refreshOrders = useCallback(() => {
    const storedOrders = getOrders();
    setOrders(storedOrders);
  }, []);

  useEffect(() => {
    // Load orders from localStorage on component mount
    refreshOrders();
  }, [refreshOrders]);

  const addOrder = useCallback((order: Order) => {
    // Add order to localStorage
    addOrderToStorage(order);
    
    // Update state with the new order
    setOrders(prevOrders => [...prevOrders, order]);
  }, []);

  const updateOrder = useCallback((updatedOrder: Order) => {
    // Update order in localStorage
    updateOrderInStorage(updatedOrder);
    
    // Update state with the updated order
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === updatedOrder.id ? updatedOrder : order
      )
    );
  }, []);

  return {
    orders,
    addOrder,
    updateOrder,
    refreshOrders
  };
};
