import { useEffect } from "react";

export default function FacebookFeedSection() {
  useEffect(() => {
    // Load the Facebook SDK asynchronously
    const loadFacebookSDK = () => {
      // Check if the SDK is already loaded
      if (window.FB) return;
      
      const script = document.createElement("script");
      script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0";
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      document.body.appendChild(script);
    };
    
    // Call the function to load SDK
    loadFacebookSDK();
    
    // Reinitialize Facebook elements if the SDK is loaded after the component
    if (window.FB) {
      window.FB.XFBML.parse();
    }
    
    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <section 
      id="facebook-feed" 
      className="py-16"
      style={{
        background: "linear-gradient(135deg, var(--light-blue) 0%, #f0f7ff 50%, white 100%)",
      }}
    >
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-dark-gray mb-4">
            See Our Latest <span className="text-primary-blue">Projects</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Follow us on Facebook to keep up with our latest work. Check out before and after 
            photos of our projects and see the McKinney difference for yourself.
          </p>
        </div>
        
        <div className="flex justify-center items-center w-full overflow-hidden mx-auto" style={{ padding: '0' }}>
          <div className="w-full flex justify-center" style={{ maxWidth: '500px', margin: '0 auto' }}>
            <div 
              className="fb-page shadow-xl rounded-xl overflow-hidden bg-white" 
              style={{ width: '1600px' }}
              data-href="https://www.facebook.com/profile.php?id=61577748385741"
              data-tabs="timeline"
              data-width="1200"
              data-height="700"
              data-small-header="false"
              data-adapt-container-width="false"
              data-hide-cover="false"
              data-show-facepile="true"
            >
              <blockquote 
                cite="https://www.facebook.com/profile.php?id=61577748385741" 
                className="fb-xfbml-parse-ignore"
              >
                <a href="https://www.facebook.com/profile.php?id=61577748385741">
                  McKinney Total Property Care LLC
                </a>
              </blockquote>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-10">
          <p className="text-gray-600">
            Don't see the feed? <a 
              href="https://www.facebook.com/profile.php?id=61577748385741" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary-blue hover:text-secondary-blue underline"
            >
              Visit our Facebook page directly
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

// Declare the FB namespace for TypeScript
declare global {
  interface Window {
    FB: any;
  }
}
