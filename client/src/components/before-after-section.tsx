import { ShieldCheck, Timer, ThumbsUp, Award, BarChart } from "lucide-react";
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { fadeIn, fadeInUp, staggerContainer } from "@/lib/animations";

const values = [
  {
    icon: ShieldCheck,
    title: "Reliability",
    description: "We arrive on time, deliver on our promises, and stand behind our work with a satisfaction guarantee."
  },
  {
    icon: Award,
    title: "Quality",
    description: "From the equipment we use to the people we hire, quality is at the core of everything we do."
  },
  {
    icon: Timer,
    title: "Efficiency",
    description: "We respect your time and property by working efficiently while never compromising our high standards."
  },
  {
    icon: ThumbsUp,
    title: "Customer Satisfaction",
    description: "Your complete satisfaction is our ultimate goal. We work closely with you to exceed your expectations."
  }
];



// Before/after image pairs using local images (2 pairs, 4 images total)
const transformations = [
  {
    before: "/images/transformations/before1.png",
    after: "/images/transformations/after1.png"
  },
  {
    before: "/images/transformations/before2.png",
    after: "/images/transformations/after2.png"
  }
];

export default function BeforeAfterSection() {
  // Intersection observer hooks for scroll animations
  const [valuesRef, valuesInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [sliderRef, sliderInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [missionRef, missionInView] = useInView({ threshold: 0.3, triggerOnce: true });
  
  return (
    <section className="py-24" style={{
      background: "linear-gradient(135deg, var(--light-blue) 0%, #f0f7ff 50%, white 100%)",
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Values Section */}
        <motion.div 
          ref={valuesRef}
          initial="hidden"
          animate={valuesInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="mb-24"
        >
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <motion.span className="inline-block px-3 py-1 bg-primary-blue/10 text-primary-blue rounded-full text-sm font-medium mb-4">
              OUR VALUES
            </motion.span>
            <motion.h2 className="text-4xl font-bold text-dark-gray mb-4">
              Our Client-Focused Values
            </motion.h2>
            <motion.p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
            variants={staggerContainer}
          >
            {values.map((value, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center group hover:-translate-y-1 overflow-hidden relative elevation-2"
                variants={fadeInUp}
                custom={index}
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-blue to-secondary-blue transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                
                <motion.div 
                  className="bg-primary-blue p-4 rounded-full text-white mb-6 group-hover:bg-secondary-blue transition-colors duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <value.icon className="h-8 w-8" />
                </motion.div>
                <h3 className="text-xl font-semibold text-dark-gray mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Before/After Transformations */}
        <motion.div
          ref={sliderRef}
          initial="hidden"
          animate={sliderInView ? "visible" : "hidden"}
          variants={fadeIn}
          className="mb-24"
        >
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <motion.span className="inline-block px-3 py-1 bg-success-green/10 text-success-green rounded-full text-sm font-medium mb-4">
              TRANSFORMATIONS
            </motion.span>
            <motion.h2 className="text-4xl font-bold text-dark-gray mb-4">
              See The Difference
            </motion.h2>
            <motion.p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Drag the slider to reveal the transformation
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {transformations.map((item, index) => (
              <motion.div 
                key={index}
                className="rounded-xl overflow-hidden shadow-xl elevation-3 bg-white"
                initial={{ opacity: 0, y: 20 }}
                animate={sliderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <div className="relative">
                  <ReactCompareSlider
                    itemOne={<ReactCompareSliderImage 
                      src={item.before} 
                      alt="Before" 
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://placehold.co/600x400/e2e8f0/64748b?text=Before+Image";
                        console.log('Error loading before image:', item.before);
                      }} 
                      style={{ 
                        objectFit: 'cover',
                        objectPosition: 'center',
                        width: '100%',
                        height: '100%',
                        imageRendering: "auto", // Standard rendering
                        filter: "contrast(1.05) brightness(1.02) saturate(1.05)", // Enhance contrast, brightness and saturation
                      }}
                    />}
                    itemTwo={<ReactCompareSliderImage 
                      src={item.after} 
                      alt="After" 
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://placehold.co/600x400/dcfce7/166534?text=After+Image";
                        console.log('Error loading after image:', item.after);
                      }} 
                      style={{ 
                        objectFit: 'cover',
                        objectPosition: 'center',
                        width: '100%',
                        height: '100%',
                        imageRendering: "auto", // Standard rendering
                        filter: "contrast(1.05) brightness(1.02) saturate(1.05)", // Enhance contrast, brightness and saturation
                      }}
                    />}
                    className="aspect-video w-full h-full shadow-lg"
                    position={50}
                    style={{ 
                      borderRadius: '0.5rem', 
                      overflow: 'hidden',
                      height: '500px',  // Taller fixed height for better image display
                      maxWidth: '1000px', // Wider max-width for higher resolution display
                      margin: '0 auto',   // Center the slider
                      boxShadow: '0 8px 24px rgba(0,0,0,0.12)', // Enhanced shadow for depth
                      backfaceVisibility: 'hidden', // Helps with image quality
                      willChange: 'transform', // Optimization for animations
                    }}
                    // Better slider settings
                    handle={<div className="bg-white rounded-full p-1 shadow-md flex items-center justify-center w-10 h-10 border-2 border-primary-blue">
                      <div className="w-1 h-5 bg-primary-blue rounded-full"></div>
                    </div>}
                  />
                  <div className="absolute top-0 left-0 bg-primary-blue text-white text-sm font-medium px-3 py-1 m-3 rounded-md">
                    Before
                  </div>
                  <div className="absolute top-0 right-0 bg-success-green text-white text-sm font-medium px-3 py-1 m-3 rounded-md">
                    After
                  </div>
                </div>
                

              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mission Statement */}
        <motion.div 
          ref={missionRef}
          className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-primary-blue elevation-3"
          initial={{ opacity: 0, y: 20 }}
          animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center mb-4">
            <BarChart className="h-8 w-8 text-primary-blue mr-3" />
            <h3 className="text-2xl font-bold text-dark-gray">Our Mission</h3>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed">
            At McKinney Total Property Care LLC, our mission is to exceed client expectations by delivering exceptional property maintenance services with integrity, professionalism, and attention to detail. We are committed to enhancing the beauty, functionality, and value of your property while providing an outstanding customer experience from start to finish.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
