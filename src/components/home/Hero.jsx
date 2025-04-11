import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import { Button } from './../ui/button';
import { useProperties } from '../../context/PropertiesContent';

const Hero = () => {
  const navigate = useNavigate();
  const { locations } = useProperties();
  const [searchLocation, setSearchLocation] = useState('');
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchLocation.trim()) {
      navigate(`/properties?location=${encodeURIComponent(searchLocation)}`);
    } else {
      navigate('/properties');
    }
  };

  return (
    <div className="relative bg-gradient-to-r from-primary/90 to-primary/70 text-white">
      <div className="absolute inset-0 bg-black/40 z-0"></div>
      
      {/* Hero Content */}
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Find Your Perfect PG Accommodation
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Discover verified PG accommodations tailored to your needs with our easy-to-use platform.
          </p>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="bg-white rounded-lg p-2 flex items-center max-w-2xl mx-auto shadow-lg mb-10">
            <div className="flex-grow flex items-center border-r border-gray-300 pr-2">
              <MapPin className="text-primary ml-2 h-5 w-5" />
              <select
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-full p-2 text-gray-800 bg-transparent border-none focus:outline-none focus:ring-0"
              >
                <option value="">Select Location</option>
                {locations.map(location => (
                  <option key={location.id} value={location.name}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>
            <Button 
              type="submit" 
              className="ml-2 bg-primary text-white hover:bg-primary/90 rounded-md"
            >
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
          </form>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition duration-300">
              <div className="bg-primary/30 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Verified Listings</h3>
              <p className="text-white/80">All our PG accommodations are verified to ensure you get exactly what you see</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition duration-300">
              <div className="bg-primary/30 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Instant Booking</h3>
              <p className="text-white/80">Book your PG accommodation instantly without any hassle or delay</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition duration-300">
              <div className="bg-primary/30 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Payments</h3>
              <p className="text-white/80">Make secure payments and get digital receipts for all your transactions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;