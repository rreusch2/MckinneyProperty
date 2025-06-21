import { Phone, ArrowDown, CheckCircle } from "lucide-react";

export default function HeroSection() {
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

  return (
    <section 
      id="home" 
      className="relative pt-24 pb-16 overflow-hidden min-h-[80vh] flex items-center" 
      style={{
        background: "linear-gradient(135deg, var(--light-blue) 0%, white 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-dark-gray mb-6">
              Professional Property Care You Can{" "}
              <span className="text-primary-blue">Trust</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              From pressure washing to landscaping, we provide comprehensive property maintenance services that keep your home and business looking their best.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={scrollToContact}
                className="bg-primary-blue text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-secondary-blue transition-colors flex items-center justify-center"
              >
                <Phone className="mr-3 h-5 w-5" />
                Get Free Estimate
              </button>
              <button
                onClick={scrollToServices}
                className="border-2 border-primary-blue text-primary-blue px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-blue hover:text-white transition-colors flex items-center justify-center"
              >
                View Services
                <ArrowDown className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="relative flex justify-center items-center">
            <img 
              src="/logo.jpg" 
              alt="McKinney Total Property Care LLC Logo" 
              className="rounded-xl shadow-lg max-h-[480px] max-w-full object-contain" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
