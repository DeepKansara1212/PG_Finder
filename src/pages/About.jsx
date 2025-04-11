import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from './../components/ui/button';

const About = () => {
  // Scroll to top on initial load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      <Helmet>
        <title>About PG Finder - Our Mission and Story</title>
        <meta name="description" content="Learn about PG Finder's mission to connect paying guests and landlords with the perfect accommodations." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-[#484848] mb-6">About PG Finder</h1>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-10">
            <div className="h-64 bg-gradient-to-r from-[#FF5A5F] to-[#00A699] flex items-center justify-center">
              <div className="text-center text-white p-6">
                <div className="text-5xl mb-4">
                  <i className="fas fa-home"></i>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Connecting People with Places</h2>
              </div>
            </div>
            
            <div className="p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
              <p className="text-[#484848] mb-6">
                The PG Finder System is an innovative platform designed to connect paying guests (PGs)
                and landlords with potential tenants. It streamlines the process of finding suitable
                accommodations by providing a centralized platform for listing, searching, and booking PG
                facilities. By offering detailed property listings, advanced search filters, and secure booking
                options, the system aims to simplify the rental process for tenants while improving visibility
                for landlords.
              </p>
              
              <p className="text-[#484848] mb-6">
                This project seeks to address the challenges of inefficient and time-consuming manual
                searches for PG accommodations by providing a modern, user-friendly, and efficient
                solution.
              </p>
              
              <h3 className="text-xl font-semibold mb-4">Our Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-[#FF5A5F] text-xl mb-2">
                    <i className="fas fa-search"></i>
                  </div>
                  <h4 className="font-semibold mb-1">Advanced Search</h4>
                  <p className="text-sm text-[#767676]">
                    Find PGs using filters like location, price, amenities, and room type.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-[#FF5A5F] text-xl mb-2">
                    <i className="fas fa-user-check"></i>
                  </div>
                  <h4 className="font-semibold mb-1">Verified Listings</h4>
                  <p className="text-sm text-[#767676]">
                    All properties are verified for authenticity and quality.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-[#FF5A5F] text-xl mb-2">
                    <i className="fas fa-calendar-check"></i>
                  </div>
                  <h4 className="font-semibold mb-1">Easy Booking</h4>
                  <p className="text-sm text-[#767676]">
                    Book accommodations directly through our secure platform.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-[#FF5A5F] text-xl mb-2">
                    <i className="fas fa-comments"></i>
                  </div>
                  <h4 className="font-semibold mb-1">Direct Communication</h4>
                  <p className="text-sm text-[#767676]">
                    Message landlords directly to ask questions or negotiate.
                  </p>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-4">Future Enhancements</h3>
              <ul className="list-disc pl-5 mb-6 text-[#484848]">
                <li className="mb-2">Integration with map services for live navigation and neighborhood exploration.</li>
                <li className="mb-2">AI-based recommendations for personalized property suggestions.</li>
                <li className="mb-2">Dynamic pricing models based on demand and seasonality.</li>
                <li className="mb-2">Mobile app support for on-the-go accessibility.</li>
                <li>Advanced security features, including identity verification for users.</li>
              </ul>
              
              <div className="border-t border-gray-200 pt-6 mt-6 text-center">
                <h3 className="text-xl font-semibold mb-4">Ready to Get Started?</h3>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link to="/properties">
                    <Button size="lg">
                      Find a PG
                    </Button>
                  </Link>
                  <Link to="/landlord-signup">
                    <Button variant="outline" size="lg">
                      List Your Property
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
