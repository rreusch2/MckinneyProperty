import { Phone, ArrowDown, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn, fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from "@/lib/animations";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Intersection observer to detect when section comes into view
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const scrollToServices = () => {
    const element = document.getElementById("services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Features list for highlight section
  const features = [
    "Professional & Reliable Service",
    "Fully Licensed & Insured",
    "Satisfaction Guaranteed"
  ];

  return (
    <section 
      id="home" 
      ref={ref}
      className="relative pt-32 pb-20 overflow-hidden min-h-[90vh] flex items-center" 
      style={{
        background: "linear-gradient(135deg, var(--light-blue) 0%, white 100%)",
        backgroundSize: "400% 400%",
        animation: "gradient 15s ease infinite",
      }}
    >
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary-blue rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-secondary-blue rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-40 left-40 w-80 h-80 bg-success-green rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={fadeInLeft}>
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-dark-gray mb-6 leading-tight"
              variants={fadeInUp}
            >
              Professional Property Care You Can{" "}
              <span className="text-primary-blue relative">
                Trust
                <span className="absolute bottom-2 left-0 w-full h-2 bg-primary-blue/20 rounded-full"></span>
              </span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 mb-8 leading-relaxed"
              variants={fadeInUp}
            >
              From pressure washing to landscaping, we provide comprehensive property maintenance services that keep your home and business looking their best.
            </motion.p>
            
            {/* Feature highlights */}
            <motion.ul className="mb-8 space-y-2" variants={staggerContainer}>
              {features.map((feature, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-center"
                  variants={fadeInUp}
                  custom={index}
                  transition={{ delay: index * 0.1 }}
                >
                  <CheckCircle className="h-5 w-5 text-success-green mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </motion.li>
              ))}
            </motion.ul>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={staggerContainer}
            >
              <motion.button
                onClick={scrollToContact}
                className="bg-primary-blue text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-secondary-blue hover:scale-105 hover:shadow-lg transition-all duration-300 ease-out flex items-center justify-center group"
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Get Free Estimate
              </motion.button>
              <motion.button
                onClick={scrollToServices}
                className="border-2 border-primary-blue text-primary-blue px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-blue hover:text-white hover:scale-105 hover:shadow-md transition-all duration-300 ease-out flex items-center justify-center group"
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                View Services
                <ArrowDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
              </motion.button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="relative flex justify-center items-center"
            variants={fadeInRight}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-blue/20 to-success-green/20 rounded-2xl transform -rotate-3 scale-105"></div>
            <motion.img 
              src="/before-after-collage.jpg" 
              alt="Property Transformation" 
              className="rounded-xl shadow-xl max-h-[500px] max-w-full object-cover relative z-10 border-4 border-white"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ 
                opacity: isLoaded ? 1 : 0, 
                y: isLoaded ? 0 : 20, 
                scale: isLoaded ? 1 : 0.95 
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              onError={(e) => {
                // Fallback to logo if image doesn't exist
                const target = e.target as HTMLImageElement;
                target.src = "/logo.jpg";
              }}
            />
            
            {/* Decorative elements */}
            <motion.div 
              className="absolute -bottom-6 -right-6 bg-success-green text-white px-4 py-2 rounded-lg shadow-lg z-20 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Stunning Results
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      >
        <ArrowDown className="h-6 w-6 text-primary-blue" />
      </motion.div>
    </section>
  );
}
