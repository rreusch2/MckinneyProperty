import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type AnimatedBackgroundProps = {
  className?: string;
};

export default function AnimatedBackground({ className = "" }: AnimatedBackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
      {/* Base gradient background - strong blue gradient */}
      <div className="absolute inset-0" style={{ 
        background: "linear-gradient(135deg, #dbeafe 0%, #f0f9ff 100%)"
      }}></div>

      {/* Animated pattern background */}
      <motion.div 
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.05) 2px, transparent 2px), 
                            linear-gradient(90deg, rgba(59, 130, 246, 0.05) 2px, transparent 2px)`,
          backgroundSize: '50px 50px',
          opacity: 1
        }}
        animate={{
          backgroundPosition: ['0px 0px', '50px 50px']
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Large animated blue blob - dramatic movement */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "70%",
          height: "70%",
          top: "-20%",
          right: "-20%",
          background: "rgba(59, 130, 246, 0.25)",
          filter: "blur(90px)"
        }}
        animate={{
          x: [0, 30, 0, -30, 0],
          y: [0, -30, 0, 30, 0],
          scale: [1, 1.1, 1, 0.9, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Secondary green blob - more movement */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "60%",
          height: "60%",
          bottom: "-10%",
          left: "-10%",
          background: "rgba(34, 197, 94, 0.3)",
          filter: "blur(90px)"
        }}
        animate={{
          x: [0, -40, 0, 40, 0],
          y: [0, 40, 0, -40, 0],
          rotate: [0, 90, 180, 270, 360]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Prominent pulsing element */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "40%",
          height: "40%",
          top: "30%",
          left: "35%",
          background: "rgba(30, 64, 175, 0.25)",
          boxShadow: "0 0 80px rgba(59, 130, 246, 0.5)",
          filter: "blur(30px)"
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.7, 0.9, 0.7]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Floating circles with more obvious animation */}
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.div 
          key={i}
          className="absolute rounded-full"
          style={{ 
            width: 80 + (i * 15) + "px",
            height: 80 + (i * 15) + "px",
            left: `${15 + (i * 15)}%`, 
            top: `${10 + (i * 10)}%`,
            background: i % 2 === 0 
              ? `rgba(59, 130, 246, ${0.2 + (i * 0.05)})` 
              : `rgba(34, 197, 94, ${0.2 + (i * 0.05)})`,
            boxShadow: i % 2 === 0 
              ? `0 0 25px rgba(59, 130, 246, 0.5)` 
              : `0 0 25px rgba(34, 197, 94, 0.5)`,
            zIndex: 10 - i
          }}
          animate={{
            y: [0, -(20 + i * 5), 0, (20 + i * 5), 0],
            x: [0, (10 + i * 3), 0, -(10 + i * 3), 0],
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{
            duration: 10 + (i * 2),
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Moving diagonal lines */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{
          background: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 40px,
            rgba(59, 130, 246, 0.05) 40px,
            rgba(59, 130, 246, 0.05) 80px
          )`
        }}
        animate={{
          backgroundPosition: ["0px 0px", "-100px -100px"]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Floating particles with dramatic movement */}
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <motion.div 
          key={`particle-${i}`}
          className="absolute rounded-full"
          style={{ 
            width: 3 + (i % 4) + "px",
            height: 3 + (i % 4) + "px",
            left: `${10 + (i * 10)}%`, 
            top: `${5 + (i * 10)}%`,
            background: i % 2 === 0 ? "rgba(59, 130, 246, 0.8)" : "rgba(34, 197, 94, 0.8)",
            boxShadow: i % 2 === 0 ? "0 0 10px rgba(59, 130, 246, 1)" : "0 0 10px rgba(34, 197, 94, 1)"
          }}
          animate={{
            y: [0, 100, -100, 50, 0],
            x: [0, 50, -50, 100, 0],
            opacity: [0, 1, 1, 0.5, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}
