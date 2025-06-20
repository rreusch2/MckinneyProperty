import { Home, Facebook } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Home className="text-primary-blue text-2xl mr-3" />
              <div>
                <h3 className="text-xl font-bold">McKinney</h3>
                <p className="text-sm text-gray-400">Total Property Care LLC</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Professional property maintenance services you can trust. Licensed, insured, and committed to excellence.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Pressure Washing</li>
              <li>Landscaping</li>
              <li>Concrete Sealing</li>
              <li>Junk Removal</li>
              <li>Painting & More</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-gray-400">
              <p className="flex items-center">
                <span className="w-4 h-4 mr-2">📞</span>
                <a href="tel:270-704-2207" className="hover:text-white">270-704-2207</a>
              </p>
              <p className="flex items-center">
                <Facebook className="w-4 h-4 mr-2" />
                McKinney Total Property Care LLC
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} McKinney Total Property Care LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
