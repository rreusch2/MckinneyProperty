import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, CalendarClock, X, HelpCircle } from "lucide-react";

type ContactOption = {
  icon: React.ElementType;
  color: string;
  href: string;
  title: string;
  label: string;
  action?: () => void;
};

export default function FloatingContact() {
  const [isExpanded, setIsExpanded] = useState(false);

  const contactOptions: ContactOption[] = [
    {
      icon: Phone,
      color: "bg-success-green",
      href: "tel:270-704-2207",
      title: "Call Now",
      label: "Call"
    },
    {
      icon: MessageCircle,
      color: "bg-primary-blue",
      href: "sms:270-704-2207",
      title: "Send Text Message",
      label: "Text"
    },
    {
      icon: CalendarClock,
      color: "bg-secondary-blue",
      href: "#contact",
      title: "Get Free Estimate",
      label: "Estimate",
      action: () => {
        const element = document.getElementById("contact");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  ];

  // Animation variants for the container
  const containerVariants = {
    collapsed: {},
    expanded: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Animation variants for individual button items
  const itemVariants = {
    collapsed: { 
      opacity: 0, 
      y: 20,
      scale: 0.8,
      transition: { 
        duration: 0.2 
      } 
    },
    expanded: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      } 
    }
  };

  // Animation for main toggle button
  const mainButtonVariants = {
    closed: { rotate: 0 },
    open: { rotate: 225 }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            variants={containerVariants}
            className="flex flex-col space-y-3 mb-4 items-end"
          >
            {contactOptions.map((option, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-center space-x-2"
              >
                <motion.span 
                  className="bg-white py-1 px-3 rounded-full shadow-md text-sm font-medium text-gray-700 elevation-1"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + (index * 0.1) }}
                >
                  {option.label}
                </motion.span>
                <motion.a
                  href={option.href}
                  onClick={(e) => {
                    if (option.action) {
                      e.preventDefault();
                      option.action();
                      setIsExpanded(false);
                    }
                  }}
                  className={`${option.color} text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform elevation-2 flex items-center justify-center`}
                  title={option.title}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <option.icon className="h-5 w-5" />
                </motion.a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`${isExpanded ? 'bg-gray-700' : 'bg-primary-blue'} text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all elevation-3 flex items-center justify-center`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        variants={mainButtonVariants}
        animate={isExpanded ? "open" : "closed"}
      >
        {isExpanded ? (
          <X className="h-6 w-6" />
        ) : (
          <HelpCircle className="h-6 w-6" />
        )}
      </motion.button>
    </div>
  );
}
