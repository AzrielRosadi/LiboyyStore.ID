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
import axios from 'axios';

interface PaymentConfirmationParams {
  orderId: string;
}

const PaymentConfirmation = () => {
  const { orderId } = useParams<PaymentConfirmationParams>();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isWhatsAppLoading, setIsWhatsAppLoading] = useState(false);
  
  // Get contact info from localStorage
  const contactInfo = localStorage.getItem('userContactInfo') || '';
  
  const { data: order, error, isLoading } = useQuery<Order>({
    queryKey: [`/api/orders/${orderId}`, contactInfo],
    queryFn: async () => {
      if (!contactInfo) {
        throw new Error('Informasi kontak diperlukan');
      }
      
      try {
        const response = await fetch(`/api/orders/${orderId}?contact=${encodeURIComponent(contactInfo)}`);
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error('Pesanan tidak ditemukan atau Anda tidak memiliki akses');
        }
        
        return await response.json();
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error instanceof Error ? error.message : "Pesanan tidak ditemukan",
        });
        throw error;
      }
    },
    enabled: !!contactInfo && !!orderId,
    retry: false,
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
    
    if (contactInfo) {
      formData.append('contact', contactInfo);
    }
    
    confirmPaymentMutation.mutate(formData);
  };

  const handleWhatsAppClick = async () => {
    setIsWhatsAppLoading(true);
    
    try {
      // 1. Simpan status bahwa sudah diklik WhatsApp
      localStorage.setItem(`order-${orderId}-contacted`, 'true');
      
      // 2. Jika ada file, upload ke endpoint khusus
      if (selectedFile) {
        const uploadFormData = new FormData();
        uploadFormData.append('paymentProof', selectedFile);
        uploadFormData.append('contact', contactInfo);
        
        await axios.post(`/api/orders/${orderId}/upload-proof`, uploadFormData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      
      // 3. Buka WhatsApp
      const whatsappUrl = `https://wa.me/6282211944285?text=${encodeURIComponent(
        `Halo Admin LiboyyStore,\n\n` +
        `Saya telah melakukan konfirmasi pembayaran untuk pesanan berikut:\n` +
        `ID Pesanan: ${orderId}\n` +
        `Produk: ${order?.productName}\n` +
        `ID Akun: ${order?.accountId}${order?.accountZone ? ` (${order.accountZone})` : ''}\n` +
        `Total Bayar: Rp ${order?.price.toLocaleString('id-ID')}\n` +
        `Metode Pembayaran: ${order?.paymentMethod}\n\n` +
        `*Bukti pembayaran sudah saya upload di website.* Mohon untuk diperiksa di dashboard admin dan segera diproses ya.\n\n` +
        `Terima kasih.`
      )}`;
      
      window.open(whatsappUrl, '_blank');
      
      // 4. Redirect ke halaman riwayat
      navigate('/order-history');
      
    } catch (error) {
      console.error('Error:', error);
      // Tetap buka WhatsApp meskipun upload gagal
      const whatsappUrl = `https://wa.me/6282211944285?text=${encodeURIComponent(
        `Halo Admin LiboyyStore,\n\n` +
        `Saya telah melakukan konfirmasi pembayaran untuk pesanan ${orderId}`
      )}`;
      window.open(whatsappUrl, '_blank');
    } finally {
      setIsWhatsAppLoading(false);
    }
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
      <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Pesanan tidak ditemukan</h2>
        <p className="mb-6 text-gray-600">Pesanan yang Anda cari tidak dapat ditemukan atau Anda tidak memiliki akses.</p>
        <Button onClick={() => navigate('/')}>
          Kembali ke Beranda
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            className="mr-4 flex items-center text-gray-600 hover:text-primary transition-colors"
            onClick={() => navigate('/')}
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
        
        <div className="text-center space-y-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-medium text-green-800 mb-2">Hubungi Admin</h3>
            <p className="text-sm text-gray-600 mb-3">
              Bukti pembayaran Anda telah tersimpan di sistem kami dan admin dapat melihatnya di dashboard mereka. 
              Untuk mempercepat proses, Anda dapat menghubungi admin dengan klik tombol di bawah.
            </p>
            <button
              onClick={handleWhatsAppClick}
              disabled={isWhatsAppLoading}
              className={`inline-flex items-center gap-2 ${isWhatsAppLoading ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'} text-white py-2 px-4 rounded-lg transition-colors`}
            >
              {isWhatsAppLoading ? (
                'Memproses...'
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                  </svg>
                  Hubungi Admin via WhatsApp
                </>
              )}
            </button>
          </div>

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