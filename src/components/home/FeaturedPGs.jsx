import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProperties } from '../../context/PropertiesContent';
import PropertyCard from '../properties/PropertyCard';
import { Button } from './../ui/button';
import { ArrowRight } from 'lucide-react';

const FeaturedPGs = () => {
  const { properties } = useProperties();
  const [featuredProperties, setFeaturedProperties] = useState([]);
  
  // Get featured properties on component mount
  useEffect(() => {
    const featured = properties.filter(property => property.featured);
    setFeaturedProperties(featured);
  }, [properties]);
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured PG Accommodations</h2>
            <p className="text-gray-600 max-w-2xl">
              Discover our handpicked selection of the best PG accommodations with verified listings and excellent amenities.
            </p>
          </div>
          <Link to="/properties" className="mt-4 md:mt-0">
            <Button variant="outline" className="flex items-center gap-2">
              View All Properties
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        {featuredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-8 text-center">
            <p className="text-gray-600">No featured properties available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedPGs;