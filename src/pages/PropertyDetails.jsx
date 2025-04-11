import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from './../components/ui/button';
import PropertyDetailsComponent from '../components/properties/PropertyDetails';
import { useProperties } from '../context/PropertiesContent';

const PropertyDetails = () => {
  const { id } = useParams();
  const { getPropertyById } = useProperties();
  const navigate = useNavigate();
  
  const property = getPropertyById(parseInt(id));
  
  // If property not found, redirect to properties page
  useEffect(() => {
    if (!property) {
      navigate('/properties');
    }
  }, [property, navigate]);
  
  // Scroll to top on initial load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  if (!property) return null;
  
  return (
    <>
      <Helmet>
        <title>{`${property.name} - PG Finder`}</title>
        <meta name="description" content={`${property.name} - ${property.location}. ${property.description.substring(0, 150)}...`} />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="mb-4"
            onClick={() => navigate(-1)}
          >
            <i className="fas fa-arrow-left mr-2"></i> Back
          </Button>
        </div>
        
        <PropertyDetailsComponent property={property} />
        
        {/* Similar Properties Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-[#484848] mb-6">Similar Properties</h2>
          <p className="text-[#767676]">
            Check out more properties in {property.location}
          </p>
          <Button
            variant="link"
            className="px-0 mt-2"
            onClick={() => navigate(`/properties?location=${encodeURIComponent(property.location)}`)}
          >
            View all properties in {property.location} <i className="fas fa-arrow-right ml-1"></i>
          </Button>
        </div>
      </div>
    </>
  );
};

export default PropertyDetails;
