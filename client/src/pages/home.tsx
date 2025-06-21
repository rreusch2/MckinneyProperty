import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import CoreValuesSection from "@/components/before-after-section";
import AboutSection from "@/components/about-section";
import FacebookFeedSection from "@/components/facebook-feed-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import FloatingContact from "@/components/floating-contact";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <CoreValuesSection />
      <AboutSection />
      <FacebookFeedSection />
      <ContactSection />
      <Footer />
      <FloatingContact />
    </div>
  );
}
