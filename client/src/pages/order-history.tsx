import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useOrderHistory } from '@/hooks/use-order-history';
import { Order } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const OrderHistory = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { orders, isLoading, error, refreshOrders } = useOrderHistory();
  const [sortedOrders, setSortedOrders] = useState<Order[]>([]);
  const [contactInfo, setContactInfo] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  // Load contact info from localStorage on mount
  useEffect(() => {
    const storedContactInfo = localStorage.getItem('userContactInfo');
    if (storedContactInfo) {
      setContactInfo(storedContactInfo);
    }
  }, []);
  
  useEffect(() => {
    if (orders) {
      // Sort orders by date (newest first)
      const sorted = [...orders].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setSortedOrders(sorted);
    }
  }, [orders]);
  
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactInfo) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Silakan masukkan nomor WhatsApp atau email Anda",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Save contact info to localStorage
      localStorage.setItem('userContactInfo', contactInfo);
      
      // Refresh orders with the new contact info
      refreshOrders();
      
      toast({
        title: "Info",
        description: "Menampilkan pesanan Anda...",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gagal memuat pesanan",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Menunggu Pembayaran</span>;
      case 'processing':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">Diproses</span>;
      case 'completed':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Selesai</span>;
      case 'cancelled':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">Dibatalkan</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const viewOrderDetails = (orderId: string) => {
    navigate(`/payment-confirmation/${orderId}`);
  };
  
  // Show contact form if no orders found
  const renderContactForm = () => (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Masukkan Informasi Kontak</CardTitle>
        <CardDescription>
          Masukkan nomor WhatsApp atau email yang Anda gunakan saat membuat pesanan
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleContactSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contactInfo">WhatsApp / Email</Label>
            <Input
              id="contactInfo"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              placeholder="Contoh: 08123456789 atau email@example.com"
              required
            />
          </div>
          <Button type="submit" disabled={isSubmitting || !contactInfo}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Mencari...</span>
              </>
            ) : (
              'Cari Pesanan Saya'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
  
  // Display loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Riwayat Pesanan</h1>
            <Button onClick={() => navigate('/')}>Kembali ke Beranda</Button>
          </div>
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Memuat riwayat pesanan...</span>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Riwayat Pesanan</h1>
          <Button onClick={() => navigate('/')}>Kembali ke Beranda</Button>
        </div>
        
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>
              Terjadi kesalahan saat memuat pesanan. Silakan coba lagi nanti.
            </AlertDescription>
          </Alert>
        )}
        
        {sortedOrders.length === 0 ? (
          contactInfo ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-gray-500 mb-4">Tidak ada pesanan ditemukan untuk kontak {contactInfo}</p>
                <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 justify-center">
                  <Button onClick={() => navigate('/')}>Mulai Belanja</Button>
                  <Button variant="outline" onClick={() => setContactInfo('')}>Ganti Kontak</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            renderContactForm()
          )
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-500">Menampilkan pesanan untuk: {contactInfo}</p>
              <Button variant="ghost" size="sm" onClick={() => setContactInfo('')}>
                Ganti Kontak
              </Button>
            </div>
            
            <div className="space-y-4">
              {sortedOrders.map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  <CardHeader className="bg-gray-50 py-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                        <CardDescription>{formatDate(order.createdAt.toString())}</CardDescription>
                      </div>
                      {getStatusBadge(order.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Produk:</span>
                        <span className="font-medium">{order.productName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total:</span>
                        <span className="font-medium">Rp {order.price.toLocaleString('id-ID')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Metode Pembayaran:</span>
                        <span className="font-medium">{order.paymentMethod}</span>
                      </div>
                      <div className="border-t pt-3 mt-3 flex justify-end">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => viewOrderDetails(order.id)}
                        >
                          {order.status === 'pending' ? 'Konfirmasi Pembayaran' : 'Lihat Detail'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
