import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PropertyList from '../components/properties/PropertyList';
import { Sliders } from 'lucide-react';

const Properties = () => {
  const location = useLocation();
  const [locationFilter, setLocationFilter] = useState('');
  const [title, setTitle] = useState('All Properties');
  
  // Parse query parameters whenever URL changes
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const locationParam = queryParams.get('location');
    
    if (locationParam) {
      setLocationFilter(locationParam);
      setTitle(`Properties in ${locationParam}`);
    } else {
      setLocationFilter('');
      setTitle('All Properties');
    }
  }, [location]);
  
  return (
    <>
      <Helmet>
        <title>{title} | PG Finder</title>
        <meta 
          name="description" 
          content="Browse and filter PG accommodations by location, price, amenities, and more." 
        />
      </Helmet>
      
      {/* Header Banner */}
      <div className="bg-gray-800 py-10 px-4 text-white">
        <div className="container mx-auto">
          <div className="flex items-center">
            <Sliders className="mr-3 h-5 w-5" />
            <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
          </div>
          {locationFilter && (
            <p className="mt-2 text-white/80">
              Showing all properties in {locationFilter}. Clear the filter to see all properties.
            </p>
          )}
        </div>
      </div>
      
      {/* Properties List with Filters */}
      <div className="py-8">
        <PropertyList 
          title="" 
          showFilters={true}
        />
      </div>
    </>
  );
};

export default Properties;