const PaymentMethodsSection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-montserrat font-bold text-gray-800 mb-3">Metode Pembayaran</h2>
          <p className="text-gray-600">Kami menerima berbagai metode pembayaran untuk kemudahan Anda</p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-6">
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex flex-col items-center">
            <div className="h-10 flex items-center justify-center mb-2">
              <span className="text-blue-500 text-2xl font-bold">DANA</span>
            </div>
            <span className="text-sm font-medium">DANA</span>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex flex-col items-center">
            <div className="h-10 flex items-center justify-center mb-2">
              <span className="text-green-500 text-2xl font-bold">GoPay</span>
            </div>
            <span className="text-sm font-medium">GoPay</span>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex flex-col items-center">
            <div className="h-10 flex items-center justify-center mb-2">
              <span className="text-red-500 text-2xl font-bold">ShopeePay</span>
            </div>
            <span className="text-sm font-medium">ShopeePay</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentMethodsSection;