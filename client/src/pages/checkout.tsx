import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { PaymentMethodCard } from '@/components/ui/payment-method-card';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useOrderHistory } from '@/hooks/use-order-history';

interface CheckoutData {
  productId: string;
  productName: string;
  price: number;
  accountId: string;
  accountZone?: string;
  quantity: number;
}

const paymentMethods = [
  { id: 'dana', name: 'DANA', number: '082211944285', username: 'Muhamad Ali batubara', iconClass: 'text-blue-500 fas fa-wallet' },
  { id: 'gopay', name: 'GoPay', number: '082211944285', username: 'LiboyyStore', iconClass: 'text-green-500 fas fa-wallet' },
  { id: 'shopeepay', name: 'ShopeePay', number: '082211944285', username: 'liboyy_store', iconClass: 'text-red-500 fas fa-wallet' }
];

const Checkout = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { addOrder } = useOrderHistory();
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  
  useEffect(() => {
    // Get checkout data from localStorage
    const data = localStorage.getItem('checkoutData');
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        setCheckoutData(parsedData);
        console.log("Checkout data loaded:", parsedData);
      } catch (error) {
        console.error("Failed to parse checkout data:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Terjadi kesalahan saat memuat data checkout. Silakan coba lagi.",
        });
        navigate('/products');
      }
    } else {
      console.log("No checkout data found");
      navigate('/products');
    }
  }, [navigate, toast]);
  
  const createOrderMutation = useMutation({
    mutationFn: (data: any) => {
      console.log("Submitting order data:", data);
      return apiRequest('POST', '/api/orders', data);
    },
    onSuccess: async (response) => {
      try {
        const order = await response.json();
        console.log("Order created successfully:", order);
        
        // Add to order history in localStorage
        addOrder(order);
        
        // Clear checkout data
        localStorage.removeItem('checkoutData');
        
        // Show success toast
        toast({
          variant: "default",
          title: "Pesanan Berhasil",
          description: "Pesanan Anda sedang diproses. Silakan lakukan pembayaran.",
        });
        
        // Navigate to payment confirmation
        navigate(`/payment-confirmation/${order.id}`);
      } catch (error) {
        console.error("Error processing order response:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Terjadi kesalahan saat memproses respon order.",
        });
      }
    },
    onError: (error) => {
      console.error("Order creation error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gagal membuat pesanan. Silakan coba lagi.",
      });
    }
  });
  
  const handleCheckout = () => {
    if (!checkoutData) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Data pesanan tidak valid",
      });
      return;
    }
    
    if (!paymentMethod) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Pilih metode pembayaran",
      });
      return;
    }
    
    if (!contact) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Masukkan nomor WhatsApp atau email Anda",
      });
      return;
    }
    
    const selectedPayment = paymentMethods.find(m => m.id === paymentMethod);
    
    if (!selectedPayment) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Metode pembayaran tidak valid",
      });
      return;
    }
    
    const orderData = {
      productId: checkoutData.productId,
      productName: checkoutData.productName,
      price: checkoutData.price,
      accountId: checkoutData.accountId,
      accountZone: checkoutData.accountZone || null,
      quantity: checkoutData.quantity,
      paymentMethod: selectedPayment.name,
      paymentNumber: selectedPayment.number,
      paymentUsername: selectedPayment.username,
      contact,
      status: 'pending'
    };
    
    createOrderMutation.mutate(orderData);
  };
  
  if (!checkoutData) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Detail Pesanan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-b pb-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Produk:</span>
                    <span>{checkoutData.productName}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Harga:</span>
                    <span>Rp {checkoutData.price.toLocaleString('id-ID')}</span>
                  </div>
                  {checkoutData.quantity > 1 && (
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Jumlah:</span>
                      <span>{checkoutData.quantity}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="font-medium">ID Akun:</span>
                    <span>{checkoutData.accountId} {checkoutData.accountZone && `(${checkoutData.accountZone})`}</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Kontak (WhatsApp/Email)</h3>
                  <input 
                    type="text" 
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="Masukkan nomor WhatsApp atau email Anda"
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pilih Metode Pembayaran</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {paymentMethods.map((method) => (
                    <PaymentMethodCard 
                      key={method.id}
                      name={method.name}
                      iconClass={method.iconClass}
                      selected={paymentMethod === method.id}
                      onClick={() => setPaymentMethod(method.id)}
                    />
                  ))}
                </div>
                
                {paymentMethod && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium mb-2">{paymentMethods.find(m => m.id === paymentMethod)?.name}</h3>
                    <p className="text-sm text-gray-600 mb-1">
                      No: {paymentMethods.find(m => m.id === paymentMethod)?.number}
                    </p>
                    <p className="text-sm text-gray-600">
                      A.n: {paymentMethods.find(m => m.id === paymentMethod)?.username}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Ringkasan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>Rp {(checkoutData.price * checkoutData.quantity).toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Biaya Admin</span>
                    <span>Rp 0</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t">
                    <span>Total</span>
                    <span>Rp {(checkoutData.price * checkoutData.quantity).toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={handleCheckout}
                  disabled={createOrderMutation.isPending}
                >
                  {createOrderMutation.isPending ? 'Memproses...' : 'Bayar Sekarang'}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
