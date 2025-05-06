import { useState, useEffect, useCallback } from 'react';
import { Order } from '@shared/schema';
import { getOrders, addOrder as addOrderToStorage, updateOrder as updateOrderInStorage } from '@/lib/storage';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';

interface UseOrderHistory {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrder: (order: Order) => void;
  refreshOrders: () => void;
  isLoading: boolean;
  error: Error | null;
}

// Legacy version using localStorage - kept for backward compatibility until fully migrated
export const useLocalOrderHistory = (): UseOrderHistory => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

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
    refreshOrders,
    isLoading,
    error
  };
};

// New version using database API
export const useOrderHistory = (): UseOrderHistory => {
  // Fetch orders by contact info (stored in localStorage for this version)
  const contactInfo = localStorage.getItem('userContactInfo') || '';
  
  const { 
    data: orders = [], 
    isLoading,
    error,
    refetch
  } = useQuery<Order[], Error>({
    queryKey: ['/api/orders'],
    queryFn: async () => {
      try {
        // Option 1: If we have an orders API endpoint that returns user's orders
        // This is more secure if we have authentication
        const res = await fetch('/api/orders', { credentials: 'include' });
        
        if (!res.ok) {
          throw new Error('Failed to fetch orders');
        }
        
        return await res.json();
      } catch (err) {
        // Fallback to localStorage for now
        console.error('Error fetching orders from API, using localStorage instead:', err);
        return getOrders();
      }
    }
  });

  // Add order - uses API and falls back to localStorage
  const addOrderMutation = useMutation({
    mutationFn: async (orderData: any) => {
      return await apiRequest('POST', '/api/orders', orderData);
    },
    onSuccess: async (response) => {
      const newOrder = await response.json();
      queryClient.invalidateQueries({ queryKey: ['/api/orders'] });
      
      // Also add to localStorage for backup/offline access
      addOrderToStorage(newOrder);
    }
  });

  const addOrder = useCallback((order: Order) => {
    // For now we still use addOrderToStorage as fallback
    addOrderToStorage(order);
    queryClient.invalidateQueries({ queryKey: ['/api/orders'] });
  }, []);

  const updateOrder = useCallback((updatedOrder: Order) => {
    // Update in localStorage for now
    updateOrderInStorage(updatedOrder);
    queryClient.invalidateQueries({ queryKey: ['/api/orders'] });
  }, []);

  const refreshOrders = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['/api/orders'] });
  }, []);

  return {
    orders,
    addOrder,
    updateOrder,
    refreshOrders,
    isLoading,
    error
  };
};