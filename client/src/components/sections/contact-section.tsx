import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: ''
  });
  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: (data: typeof formData) => {
      return apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      toast({
        title: "Berhasil!",
        description: "Pesan Anda telah dikirim. Kami akan menghubungi Anda segera!",
      });
      setFormData({ name: '', contact: '', message: '' });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gagal mengirim pesan. Silakan coba lagi.",
      });
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name.trim() || !formData.contact.trim() || !formData.message.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Mohon isi semua kolom",
      });
      return;
    }

    contactMutation.mutate(formData);
  };

  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h2 className="text-3xl font-montserrat font-bold text-gray-800 mb-4">Bantuan & Kontak</h2>
            <p className="text-gray-600 mb-6">Ada pertanyaan atau butuh bantuan? Jangan ragu untuk menghubungi kami.</p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="text-primary text-xl mt-1 mr-3">
                  <i className="fab fa-whatsapp"></i>
                </div>
                <div>
                  <h3 className="font-medium">WhatsApp</h3>
                  <p className="text-gray-600">+62 822-1194-4285</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-primary text-xl mt-1 mr-3">
                  <i className="far fa-envelope"></i>
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-gray-600">punyamalibatubara@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-primary text-xl mt-1 mr-3">
                  <i className="fab fa-instagram"></i>
                </div>
                <div>
                  <h3 className="font-medium">Instagram</h3>
                  <p className="text-gray-600">@liboyy_store26</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-primary text-xl mt-1 mr-3">
                  <i className="far fa-clock"></i>
                </div>
                <div>
                  <h3 className="font-medium">Jam Operasional</h3>
                  <p className="text-gray-600">Setiap hari, 09.00 - 21.00 WIB</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Kirim Pesan</h3>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Nama</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="Nama Anda"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="contact" className="block text-gray-700 font-medium mb-2">Email / WhatsApp</label>
                  <input 
                    type="text" 
                    id="contact" 
                    name="contact" 
                    value={formData.contact}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="Email atau nomor WhatsApp Anda"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Pesan</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={4} 
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="Tulis pesan Anda di sini..."
                  ></textarea>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-secondary text-white py-3 rounded-lg transition-colors font-medium"
                  disabled={contactMutation.isPending}
                >
                  {contactMutation.isPending ? 'Mengirim...' : 'Kirim Pesan'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
