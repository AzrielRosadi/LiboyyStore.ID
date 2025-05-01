import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'wouter';
import { 
  getProductCategoryById, 
  ProductOption,
  getCategoryById,
  categories,
  productCategories
} from '@/lib/product-categories';
import { 
  AnimatedContainer, 
  AnimatedText,
  fadeInItemVariants 
} from '@/components/ui/animated-container';
import { RippleButton } from '@/components/ui/ripple-button';
import { formatCurrency } from '@/lib/helpers';
import { motion } from 'framer-motion';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const [selectedOption, setSelectedOption] = useState<ProductOption | null>(null);
  const [accountId, setAccountId] = useState('');
  const [accountZone, setAccountZone] = useState('');
  
  // Get product category directly using improved getProductCategoryById
  const productCategory = getProductCategoryById(id);
  
  // Determine category based on productCategory
  const getCategoryBySub = (sub: string | undefined) => {
    if (!sub) return null;
    return categories.find(cat => cat.subcategory === sub);
  };
  
  const category = productCategory ? getCategoryBySub(productCategory.category) : null;
  
  // Debug logs
  useEffect(() => {
    if (!productCategory) {
      console.error(`Product category not found for ID: ${id}`);
      console.log("Available product categories:", productCategories.map((p: any) => p.id));
    }
    if (!category) {
      console.error(`Category not found for product category: ${productCategory?.category}`);
      console.log("Available categories:", categories.map(c => ({id: c.id, sub: c.subcategory})));
    }
  }, [id, productCategory, category]);
  
  // Efek perubahan halaman untuk reset state
  useEffect(() => {
    setSelectedOption(null);
    setAccountId('');
    setAccountZone('');
  }, [id]);
  
  if (!category || !productCategory) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Produk tidak ditemukan</h2>
          <p className="text-gray-600 mb-6">Maaf, produk yang Anda cari tidak tersedia.</p>
          <RippleButton
            color="primary"
            onClick={() => setLocation('/products')}
          >
            Kembali ke Daftar Produk
          </RippleButton>
        </div>
      </div>
    );
  }
  
  const isGame = category.category === 'games';
  const isMobileLegends = category.subcategory === 'ml';
  
  const handleProceedToCheckout = () => {
    if (!selectedOption) return;
    
    const checkoutData = {
      productCategoryId: id,
      productOptionId: selectedOption.id,
      productName: `${productCategory.name} ${selectedOption.name}`,
      price: selectedOption.price,
      accountId,
      accountZone: isMobileLegends ? accountZone : undefined,
      quantity: 1
    };
    
    // Simpan data checkout ke localStorage untuk konsistensi dengan checkout.tsx
    localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
    
    // Arahkan ke halaman checkout
    setLocation('/checkout');
  };
  
  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
            {/* Header */}
            <div className="h-48 relative overflow-hidden">
              <img 
                src={productCategory.image} 
                alt={productCategory.name} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <AnimatedText 
                  text={productCategory.name} 
                  element="h1" 
                  className="text-4xl text-white font-bold"
                />
              </div>
              <RippleButton
                variant="ghost"
                color="primary"
                className="absolute top-3 left-3"
                onClick={() => setLocation('/products')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </RippleButton>
            </div>
            
            {/* Content */}
            <div className="p-6">
              <AnimatedContainer animation="fadeIn">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Pilih {isGame ? 'Diamond' : (id.includes('followers') ? 'Followers' : 'Likes')}</h2>
                <p className="text-gray-600 mb-6">{productCategory.description}</p>
                
                {/* Input form untuk informasi akun game atau media sosial */}
                <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {isGame ? 'User ID' : 'Username'}
                    </label>
                    <input
                      type="text"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 p-2.5 border"
                      placeholder={isGame ? 'Masukkan User ID' : 'Masukkan Username'}
                      value={accountId}
                      onChange={(e) => setAccountId(e.target.value)}
                    />
                    {isGame && (
                      <p className="text-xs text-gray-500 mt-1">
                        Silakan masukkan User ID {isMobileLegends ? 'Mobile Legends' : 'Free Fire'} Anda
                      </p>
                    )}
                  </div>
                  
                  {/* Zone ID khusus untuk Mobile Legends */}
                  {isMobileLegends && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Zone ID
                      </label>
                      <input
                        type="text"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 p-2.5 border"
                        placeholder="Masukkan Zone ID"
                        value={accountZone}
                        onChange={(e) => setAccountZone(e.target.value)}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Zone ID dapat dilihat di profil game Anda
                      </p>
                    </div>
                  )}
                  
                  {!isGame && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Link Post
                      </label>
                      <input
                        type="text"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 p-2.5 border"
                        placeholder={id.includes('likes') ? 'Masukkan link post untuk likes' : 'Opsional - jika diperlukan'}
                        value={accountZone}
                        onChange={(e) => setAccountZone(e.target.value)}
                      />
                    </div>
                  )}
                </div>
                
                {/* Opsi produk */}
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Pilih Paket
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
                  {productCategory.options.map((option: ProductOption) => (
                    <motion.div
                      key={option.id}
                      className={`border rounded-lg p-3 cursor-pointer transition-all ${
                        selectedOption?.id === option.id
                          ? 'border-primary bg-primary bg-opacity-10'
                          : 'border-gray-200 hover:border-primary'
                      }`}
                      onClick={() => setSelectedOption(option)}
                      variants={fadeInItemVariants}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <p className="font-medium text-gray-900">{option.name}</p>
                      <p className="text-primary font-bold">{formatCurrency(option.price)}</p>
                    </motion.div>
                  ))}
                </div>
                
                {/* Ringkasan Order */}
                {selectedOption && (
                  <div className="border border-gray-200 rounded-lg p-4 mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Ringkasan Order</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Produk</span>
                        <span className="font-medium">{productCategory.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Paket</span>
                        <span className="font-medium">{selectedOption.name}</span>
                      </div>
                      {accountId && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">{isGame ? 'User ID' : 'Username'}</span>
                          <span className="font-medium">{accountId}</span>
                        </div>
                      )}
                      {isMobileLegends && accountZone && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Zone ID</span>
                          <span className="font-medium">{accountZone}</span>
                        </div>
                      )}
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between font-bold">
                          <span>Total</span>
                          <span className="text-primary">{formatCurrency(selectedOption.price)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Tombol order */}
                <RippleButton
                  color="primary"
                  fullWidth
                  className="py-3"
                  onClick={handleProceedToCheckout}
                  disabled={!selectedOption || !accountId || (isMobileLegends && !accountZone)}
                >
                  {!selectedOption 
                    ? 'Pilih Paket untuk Melanjutkan' 
                    : (!accountId || (isMobileLegends && !accountZone)) 
                      ? 'Isi Informasi Akun untuk Melanjutkan' 
                      : 'Lanjutkan ke Pembayaran'}
                </RippleButton>
              </AnimatedContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}