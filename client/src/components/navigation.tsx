import { useState } from "react";
import { Home, Menu, X, Phone } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer" onClick={() => scrollToSection("home")}>
            <div className="flex-shrink-0 flex items-center">
              <Home className="text-primary-blue text-2xl mr-3" />
              <div>
                <h1 className="text-xl font-bold text-dark-gray">McKinney</h1>
                <p className="text-sm text-gray-600">Total Property Care LLC</p>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button
                onClick={() => scrollToSection("home")}
                className="text-dark-gray hover:text-primary-blue px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-dark-gray hover:text-primary-blue px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-dark-gray hover:text-primary-blue px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-dark-gray hover:text-primary-blue px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Contact
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <a
              href="tel:270-704-2207"
              className="bg-primary-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary-blue transition-colors"
            >
              <Phone className="inline mr-2 h-4 w-4" />
              Call Now
            </a>
            <button
              className="md:hidden text-dark-gray p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <button
                onClick={() => scrollToSection("home")}
                className="block w-full text-left text-dark-gray hover:text-primary-blue px-3 py-2 rounded-md text-base font-medium"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="block w-full text-left text-dark-gray hover:text-primary-blue px-3 py-2 rounded-md text-base font-medium"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="block w-full text-left text-dark-gray hover:text-primary-blue px-3 py-2 rounded-md text-base font-medium"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left text-dark-gray hover:text-primary-blue px-3 py-2 rounded-md text-base font-medium"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
