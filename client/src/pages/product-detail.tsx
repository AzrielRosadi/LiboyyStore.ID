import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { products } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

interface ProductParams {
  category: string;
  id: string;
}

const ProductDetail = () => {
  const { category, id } = useParams<ProductParams>();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [accountId, setAccountId] = useState('');
  const [accountZone, setAccountZone] = useState('');
  const [quantity, setQuantity] = useState(1);
  
  // Find the product in our data
  const product = products.find(p => p.category === category && p.id === id);
  
  useEffect(() => {
    // If product doesn't exist, redirect to home
    if (!product) {
      navigate('/');
    }
  }, [product, navigate]);
  
  if (!product) {
    return null;
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!accountId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "ID Akun harus diisi",
      });
      return;
    }
    
    // For game categories, we need zone/server
    if ((category === 'ml' || category === 'ff') && !accountZone) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Server/Zone harus diisi",
      });
      return;
    }
    
    const checkoutData = {
      productId: id,
      productName: product.name,
      price: product.price,
      accountId,
      accountZone: accountZone || undefined,
      quantity: quantity || 1
    };
    
    // Save to localStorage for checkout page
    localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
    
    // Redirect to checkout
    navigate('/checkout');
  };
  
  const needsZone = category === 'ml' || category === 'ff';
  const isSocialMedia = category === 'instagram' || category === 'tiktok';
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Card className="overflow-hidden">
          <div className="md:flex">
            <div className="md:w-2/5">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-3/5">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{product.name}</CardTitle>
                    <CardDescription className="mt-2">{product.description}</CardDescription>
                  </div>
                  <span className={`
                    ${category === 'ml' || category === 'ff' ? 'bg-blue-100 text-primary' : 'bg-purple-100 text-purple-600'} 
                    rounded-full px-3 py-1 text-xs font-medium
                  `}>
                    {category === 'ml' || category === 'ff' ? 'Game' : 'Social Media'}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <p className="text-lg font-semibold text-primary">Rp {product.price.toLocaleString('id-ID')}</p>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="accountId">
                        {isSocialMedia ? 'Username' : 'ID Game'}
                      </Label>
                      <Input 
                        id="accountId"
                        value={accountId}
                        onChange={(e) => setAccountId(e.target.value)}
                        placeholder={isSocialMedia ? "Masukkan username akun" : "Masukkan ID game anda"}
                        className="mt-1"
                      />
                    </div>
                    
                    {needsZone && (
                      <div>
                        <Label htmlFor="accountZone">
                          {category === 'ml' ? 'Server/Zone' : 'Nickname'}
                        </Label>
                        <Input 
                          id="accountZone"
                          value={accountZone}
                          onChange={(e) => setAccountZone(e.target.value)}
                          placeholder={category === 'ml' ? "contoh: 1234" : "Masukkan nickname"}
                          className="mt-1"
                        />
                      </div>
                    )}
                    
                    {isSocialMedia && (
                      <div>
                        <Label htmlFor="quantity">Jumlah {category === 'instagram' ? 'Followers/Likes' : 'Followers/Likes'}</Label>
                        <Input 
                          id="quantity"
                          type="number"
                          min="1"
                          value={quantity}
                          onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                          className="mt-1"
                        />
                      </div>
                    )}
                  </div>
                  
                  <CardFooter className="px-0 pt-6">
                    <Button type="submit" className="w-full">
                      Lanjut ke Pembayaran
                    </Button>
                  </CardFooter>
                </form>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetail;
