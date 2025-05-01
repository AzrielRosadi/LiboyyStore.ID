import { Switch, Route } from "wouter";
import { useEffect, useState } from "react";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import ProductDetail from "@/pages/product-detail";
import Checkout from "@/pages/checkout";
import PaymentConfirmation from "@/pages/payment-confirmation";
import OrderHistory from "@/pages/order-history";
import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminOrderDetail from "@/pages/admin/order-detail";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Loading } from "@/components/ui/loading";
import { motion, AnimatePresence } from "framer-motion";
import { initAOS, setupAOSListeners } from "@/lib/animation";

function App() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Initialize AOS for scroll animations
    initAOS();
    
    // Set up AOS listeners and get cleanup function
    const cleanupAOSListeners = setupAOSListeners();

    // Simulate initial loading with a nice splash screen
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
      cleanupAOSListeners();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-primary mb-4"
        >
          LiboyyStore.ID
        </motion.div>
        <Loading type="dots" size="lg" text="Memuat halaman..." />
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Header />
        <main className="pt-16">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/product/:category/:id" component={ProductDetail} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/payment-confirmation/:orderId" component={PaymentConfirmation} />
            <Route path="/order-history" component={OrderHistory} />
            <Route path="/admin" component={AdminLogin} />
            <Route path="/admin/dashboard" component={AdminDashboard} />
            <Route path="/admin/order/:id" component={AdminOrderDetail} />
            <Route component={NotFound} />
          </Switch>
        </main>
        <Footer />
        <WhatsAppButton />
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
