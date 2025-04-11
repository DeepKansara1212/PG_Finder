import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useProperties } from '../context/PropertiesContent';
import { useAuth } from '../context/AuthContext';
import PropertyCard from '../components/properties/PropertyCard';
import { Button } from './../components/ui/button';

const SavedProperties = () => {
  const { savedProperties, getSavedPropertiesList } = useProperties();
  const { user } = useAuth();
  const properties = getSavedPropertiesList();
  
  // Scroll to top on initial load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      <Helmet>
        <title>Saved Properties - PG Finder</title>
        <meta name="description" content="View and manage your saved PG accommodations." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#484848] mb-6">Saved Properties</h1>
        
        {!user ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <i className="fas fa-user-lock text-5xl text-gray-300 mb-4"></i>
            <h2 className="text-xl font-semibold text-[#484848] mb-2">Login Required</h2>
            <p className="text-[#767676] mb-4">Please login to view your saved properties.</p>
            <Link to="/login">
              <Button>Login Now</Button>
            </Link>
          </div>
        ) : savedProperties.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <i className="far fa-heart text-5xl text-gray-300 mb-4"></i>
            <h2 className="text-xl font-semibold text-[#484848] mb-2">No Saved Properties</h2>
            <p className="text-[#767676] mb-4">You haven't saved any properties yet.</p>
            <Link to="/properties">
              <Button>Browse Properties</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SavedProperties;
