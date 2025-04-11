import { useNavigate } from 'react-router-dom';
import { useProperties } from '../../context/PropertiesContent';

const PopularLocations = () => {
  const navigate = useNavigate();
  const { locations } = useProperties();
  
  // Handle location click
  const handleLocationClick = (locationName) => {
    navigate(`/properties?location=${encodeURIComponent(locationName)}`);
  };
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Popular Locations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore PG accommodations in these popular locations with great connectivity and amenities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.slice(0, 8).map(location => (
            <div 
              key={location.id}
              className="relative overflow-hidden rounded-xl shadow-md cursor-pointer group"
              onClick={() => handleLocationClick(location.name)}
            >
              <div className="aspect-[4/3]">
                <img 
                  src={location.image} 
                  alt={location.name}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{location.name}</h3>
                  <p className="text-white/80 text-sm">
                    {location.propertyCount} {location.propertyCount === 1 ? 'Property' : 'Properties'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularLocations;