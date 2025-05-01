import { Switch, Route } from "wouter";
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

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
