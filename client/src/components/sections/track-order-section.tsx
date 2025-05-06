import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Order } from '@shared/schema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const TrackOrderSection = () => {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [showForm, setShowForm] = useState(true);
  const { toast } = useToast();

  const { data: order, error, isLoading, refetch } = useQuery<Order>({
    queryKey: [`/api/orders/${orderId}`, email],
    queryFn: async () => {
      if (!orderId || !email) {
        throw new Error('Order ID and contact information are required');
      }
      
      const res = await fetch(`/api/orders/${orderId}?contact=${encodeURIComponent(email)}`);
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error(`Error fetching order: ${errorText}`);
        throw new Error('Order not found or access denied');
      }
      
      return res.json();
    },
    enabled: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderId.trim() || !email.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Mohon isi semua kolom",
      });
      return;
    }
    
    try {
      await refetch();
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Pesanan tidak ditemukan",
        });
        return;
      }
      
      setShowForm(false);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gagal memeriksa pesanan",
      });
    }
  };

  const formatDate = (dateString: string | Date) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusClass = (status: string) => {
    switch(status) {
      case 'pending': return 'text-yellow-500';
      case 'waiting': return 'text-orange-500';
      case 'processing': return 'text-blue-500';
      case 'completed': return 'text-green-500';
      case 'cancelled': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'pending': return 'Menunggu Pembayaran';
      case 'waiting': return 'Pembayaran Diperiksa';
      case 'processing': return 'Diproses';
      case 'completed': return 'Selesai';
      case 'cancelled': return 'Dibatalkan';
      default: return status;
    }
  };

  return (
    <section id="track-order" className="py-16 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-montserrat font-bold mb-3">Cek Status Pesanan</h2>
            <p className="text-blue-100">Masukkan ID pesanan Anda untuk melihat status pesanan terkini</p>
          </div>
          
          {showForm ? (
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg text-gray-800">
              <div className="mb-4">
                <label htmlFor="orderId" className="block text-gray-700 font-medium mb-2">ID Pesanan</label>
                <Input 
                  type="text" 
                  id="orderId" 
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="w-full px-4 py-3" 
                  placeholder="Masukkan ID pesanan Anda"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email / No. WhatsApp</label>
                <Input 
                  type="text" 
                  id="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3" 
                  placeholder="Email atau nomor WhatsApp Anda"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-secondary text-white py-3 rounded-lg transition-colors font-medium"
                disabled={isLoading}
              >
                {isLoading ? 'Memeriksa...' : 'Cek Status'}
              </Button>
            </form>
          ) : order ? (
            <div className="mt-8 bg-white p-6 rounded-lg shadow-lg text-gray-800 animate-fade-in">
              <div className="text-center mb-4">
                <div className="inline-block rounded-full bg-blue-100 p-3 text-primary text-3xl mb-3">
                  <i className="fas fa-clipboard-check"></i>
                </div>
                <h3 className="text-xl font-bold">Detail Pesanan #{order.id}</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-medium ${getStatusClass(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Produk:</span>
                  <span className="font-medium">{order.productName}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">ID Akun:</span>
                  <span className="font-medium">{order.accountId} {order.accountZone && `(${order.accountZone})`}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Tanggal Order:</span>
                  <span className="font-medium">{formatDate(order.createdAt)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Metode Pembayaran:</span>
                  <span className="font-medium">{order.paymentMethod}</span>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 mb-4">Ada pertanyaan tentang pesanan Anda?</p>
                <a href="https://wa.me/6282211944285" className="inline-block bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors">
                  <i className="fab fa-whatsapp mr-2"></i> Hubungi Admin
                </a>
              </div>
              
              <div className="mt-4 text-center">
                <button 
                  onClick={() => setShowForm(true)}
                  className="text-primary hover:text-secondary transition-colors"
                >
                  Cek pesanan lain
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-lg text-gray-800 text-center">
              <p className="text-red-500">Pesanan tidak ditemukan</p>
              <button 
                onClick={() => setShowForm(true)}
                className="mt-4 text-primary hover:text-secondary transition-colors"
              >
                Kembali
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TrackOrderSection;
