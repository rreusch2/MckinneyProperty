import { Phone, ArrowDown, CheckCircle } from "lucide-react";

export default function HeroSection() {
  const scrollToServices = () => {
    const element = document.getElementById("services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="bg-gradient-to-br from-light-blue to-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <a
                href="tel:270-704-2207"
                className="bg-primary-blue text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-secondary-blue transition-colors flex items-center justify-center"
              >
                <Phone className="mr-3 h-5 w-5" />
                Call For Estimate: 270-704-2207
              </a>
              <button
                onClick={scrollToServices}
                className="border-2 border-primary-blue text-primary-blue px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-blue hover:text-white transition-colors flex items-center justify-center"
              >
                View Services
                <ArrowDown className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
              alt="Professional property maintenance services"
              className="rounded-2xl shadow-2xl w-full"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="bg-success-green text-white p-2 rounded-full">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-dark-gray">Fully Licensed & Insured</p>
                  <p className="text-sm text-gray-600">Professional Service Guaranteed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
