import { nanoid } from 'nanoid';

/**
 * Generate a unique ID for orders
 * @returns string - Order ID format: 'ORD' + 6 digit random string
 */
export const generateOrderId = (): string => {
  return `ORD${nanoid(6).toUpperCase()}`;
};

/**
 * Format a timestamp to a readable date string in Indonesian locale
 * @param timestamp - ISO timestamp string
 * @returns Formatted date string
 */
export const formatDate = (timestamp: string): string => {
  const date = new Date(timestamp);
  
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

/**
 * Format a number as Indonesian Rupiah
 * @param amount - Number to format
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number): string => {
  return `Rp ${amount.toLocaleString('id-ID')}`;
};

/**
 * Get a user-friendly status label from status code
 * @param status - Status code ('pending', 'processing', 'completed')
 * @returns User-friendly status label
 */
export const getStatusLabel = (status: string): string => {
  switch(status) {
    case 'pending':
      return 'Menunggu Pembayaran';
    case 'processing':
      return 'Diproses';
    case 'completed':
      return 'Selesai';
    default:
      return status;
  }
};

/**
 * Get a color class for a status code
 * @param status - Status code ('pending', 'processing', 'completed')
 * @returns Tailwind CSS color class
 */
export const getStatusColorClass = (status: string): string => {
  switch(status) {
    case 'pending':
      return 'text-yellow-500';
    case 'processing':
      return 'text-blue-500';
    case 'completed':
      return 'text-green-500';
    default:
      return 'text-gray-500';
  }
};

/**
 * Get a badge color class for a status code
 * @param status - Status code ('pending', 'processing', 'completed')
 * @returns Tailwind CSS badge color class
 */
export const getStatusBadgeClass = (status: string): string => {
  switch(status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'processing':
      return 'bg-blue-100 text-blue-800';
    case 'completed':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
