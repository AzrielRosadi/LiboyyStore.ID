import HeroSection from '@/components/sections/hero-section';
import ServicesSection from '@/components/sections/services-section';
import HowItWorksSection from '@/components/sections/how-it-works-section';
import TestimonialsSection from '@/components/sections/testimonials-section';
import TrackOrderSection from '@/components/sections/track-order-section';
import FaqSection from '@/components/sections/faq-section';
import ContactSection from '@/components/sections/contact-section';
import PaymentMethodsSection from '@/components/sections/payment-methods-section';

const Home = () => {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <TrackOrderSection />
      <FaqSection />
      <ContactSection />
      <PaymentMethodsSection />
    </>
  );
};

export default Home;
