import { useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Order } from '@shared/schema';

interface OrderDetailParams {
  id: string;
}

const AdminOrderDetail = () => {
  const { id } = useParams<OrderDetailParams>();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  
  // Check if admin is logged in
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await fetch('/api/admin/check', {
          credentials: 'include'
        });
        
        if (!res.ok) {
          throw new Error('Not authenticated');
        }
      } catch (error) {
        navigate('/admin');
      }
    };
    
    checkAdmin();
  }, [navigate]);
  
  // Fetch order details
  const { data: order, error, isLoading, refetch } = useQuery<Order>({
    queryKey: [`/api/admin/orders/${id}`],
  });
  
  // Update order status mutation
  const updateOrderMutation = useMutation({
    mutationFn: ({ status }: { status: string }) => {
      return apiRequest('PATCH', `/api/admin/orders/${id}`, { status });
    },
    onSuccess: () => {
      toast({
        title: "Status pesanan berhasil diperbarui",
      });
      refetch();
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Gagal memperbarui status pesanan",
      });
    }
  });
  
  const handleUpdateStatus = (status: string) => {
    updateOrderMutation.mutate({ status });
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
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  
  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4">Error loading order details.</p>
          <Button onClick={() => navigate('/admin/dashboard')}>Kembali ke Dashboard</Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Detail Pesanan #{id}</h1>
            <Button variant="outline" onClick={() => navigate('/admin/dashboard')}>Kembali</Button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Pesanan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">ID Pesanan</p>
                    <p className="font-medium">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tanggal</p>
                    <p className="font-medium">{formatDate(order.createdAt)}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full 
                      ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        order.status === 'processing' ? 'bg-blue-100 text-blue-800' : 
                        'bg-green-100 text-green-800'}`
                    }>
                      {order.status === 'pending' ? 'Pending' : 
                       order.status === 'processing' ? 'Diproses' : 'Selesai'}
                    </span>
                    
                    <div className="flex space-x-2 ml-4">
                      {order.status === 'pending' && (
                        <Button 
                          size="sm"
                          onClick={() => handleUpdateStatus('processing')}
                          disabled={updateOrderMutation.isPending}
                        >
                          Proses
                        </Button>
                      )}
                      {order.status === 'processing' && (
                        <Button 
                          size="sm"
                          onClick={() => handleUpdateStatus('completed')}
                          disabled={updateOrderMutation.isPending}
                        >
                          Selesai
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Produk</p>
                  <p className="font-medium">{order.productName}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="font-medium">Rp {order.price.toLocaleString('id-ID')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Informasi Customer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">ID Akun Game/Sosmed</p>
                  <p className="font-medium">{order.accountId} {order.accountZone && `(${order.accountZone})`}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Kontak</p>
                  <p className="font-medium">{order.contact}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Metode Pembayaran</p>
                  <p className="font-medium">{order.paymentMethod}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Detail Pembayaran</p>
                  <p className="font-medium">{order.paymentNumber} (a.n. {order.paymentUsername})</p>
                </div>
                
                {order.paymentProof && (
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Bukti Pembayaran</p>
                    <div className="border rounded p-2">
                      <a 
                        href={`/uploads/${order.paymentProof}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Lihat Bukti Pembayaran
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetail;
