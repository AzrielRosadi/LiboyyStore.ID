import { useState, useRef } from 'react';
import { useParams, useLocation } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Order } from '@shared/schema';

interface PaymentConfirmationParams {
  orderId: string;
}

const PaymentConfirmation = () => {
  const { orderId } = useParams<PaymentConfirmationParams>();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const { data: order, error, isLoading } = useQuery<Order>({
    queryKey: [`/api/orders/${orderId}`],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/orders/${orderId}`);
        if (!response.ok) {
          throw new Error('Pesanan tidak ditemukan');
        }
        return response.json() as Order;
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Pesanan tidak ditemukan",
        });
        navigate('/');
        throw error;
      }
    }
  });
  
  const confirmPaymentMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch(`/api/orders/${orderId}/confirm`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to confirm payment');
      }
      
      return response;
    },
    onSuccess: () => {
      toast({
        title: "Berhasil!",
        description: "Konfirmasi pembayaran berhasil dikirim. Admin akan segera memproses pesanan Anda.",
      });
      navigate('/order-history');
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gagal mengonfirmasi pembayaran. Silakan coba lagi.",
      });
    }
  });
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const handleConfirmPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Harap upload bukti pembayaran",
      });
      return;
    }
    
    const formData = new FormData();
    formData.append('paymentProof', selectedFile);
    
    confirmPaymentMutation.mutate(formData);
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  
  if (error || !order) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <p>Pesanan tidak ditemukan</p>
      </div>
    );
  }
  
  const handleGoBack = () => {
    // Kembali ke halaman beranda
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            className="mr-4 flex items-center text-gray-600 hover:text-primary transition-colors"
            onClick={handleGoBack}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali
          </Button>
          <h1 className="text-2xl font-bold">Konfirmasi Pembayaran</h1>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Detail Pesanan #{order.id}</CardTitle>
            <CardDescription>Silakan selesaikan pembayaran dan upload bukti transfer</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-b pb-4">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Produk:</span>
                <span>{order.productName}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Total Bayar:</span>
                <span className="font-bold text-primary">Rp {order.price.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">ID Akun:</span>
                <span>{order.accountId} {order.accountZone && `(${order.accountZone})`}</span>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Instruksi Pembayaran</h3>
              <p className="text-sm text-gray-600 mb-4">
                Silakan transfer ke rekening berikut:
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>{order.paymentMethod}:</span>
                  <span className="font-medium">{order.paymentNumber}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>A.n:</span>
                  <span className="font-medium">{order.paymentUsername}</span>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleConfirmPayment}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="paymentProof">Upload Bukti Transfer</Label>
                  <div className="mt-1 flex items-center">
                    <input
                      id="paymentProof"
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="mr-2"
                    >
                      Pilih File
                    </Button>
                    <span className="text-sm text-gray-500">
                      {selectedFile ? selectedFile.name : 'Belum ada file dipilih'}
                    </span>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={confirmPaymentMutation.isPending || !selectedFile}
                >
                  {confirmPaymentMutation.isPending ? 'Mengirim...' : 'Konfirmasi Pembayaran'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        
        <div className="text-center">
          <Button 
            variant="link" 
            onClick={() => navigate('/order-history')}
          >
            Lihat Riwayat Pesanan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
