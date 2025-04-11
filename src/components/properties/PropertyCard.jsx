import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Users, Phone, Bath, BedSingle, ChevronDown, ChevronUp } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';
import { useAuth } from '../../context/AuthContext';
import { useProperties } from '../../context/PropertiesContent';
import { Button } from './../ui/button';
import { Badge } from './../ui/badge';

const PropertyCard = ({ property }) => {
  const { user } = useAuth();
  const { toggleSavedProperty, savedProperties } = useProperties();
  const [showMore, setShowMore] = useState(false);
  
  // Check if property is saved
  const isSaved = savedProperties.some(id => id === property.id);

  const handleSaveToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      // Redirect to login if not logged in
      window.location.href = '/login';
      return;
    }
    
    toggleSavedProperty(property.id);
  };
  
  return (
    <div className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Top section with image and quick actions */}
      <div className="relative">
        <img 
          src={property.images[0]} 
          alt={property.title}
          className="w-full h-52 object-cover" 
        />
        <div className="absolute top-3 right-3">
          <button 
            className={`p-2 rounded-full ${isSaved ? 'bg-primary text-white' : 'bg-white/80 text-gray-700'} 
                        hover:bg-primary hover:text-white transition-colors`}
            onClick={handleSaveToggle}
            aria-label={isSaved ? "Remove from saved" : "Save property"}
          >
            <Heart className={`h-5 w-5 ${isSaved ? 'fill-white' : ''}`} />
          </button>
        </div>
        
        {property.isAvailable ? (
          <Badge className="absolute top-3 left-3 bg-green-500">Available</Badge>
        ) : (
          <Badge className="absolute top-3 left-3 bg-red-500">Unavailable</Badge>
        )}
        
        {property.isNew && (
          <Badge className="absolute top-12 left-3 bg-blue-500">New</Badge>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold line-clamp-1">{property.title}</h3>
          <div className="text-lg font-bold text-primary">
            {formatCurrency(property.rent)}<span className="text-gray-600 text-sm font-normal">/month</span>
          </div>
        </div>
        
        <div className="flex items-center text-gray-500 text-sm mt-1 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="line-clamp-1">{property.location}</span>
        </div>
        
        {/* Features */}
        <div className="flex flex-wrap gap-4 mb-3 text-sm">
          <div className="flex items-center text-gray-700">
            <Users className="h-4 w-4 mr-1 text-gray-500" />
            <span>{property.occupancy}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <BedSingle className="h-4 w-4 mr-1 text-gray-500" />
            <span>{property.beds} {property.beds === 1 ? 'Bed' : 'Beds'}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Bath className="h-4 w-4 mr-1 text-gray-500" />
            <span>{property.baths} {property.baths === 1 ? 'Bath' : 'Baths'}</span>
          </div>
        </div>
        
        {/* Description */}
        <p className={`text-sm text-gray-600 mt-2 ${!showMore ? 'line-clamp-2' : ''}`}>
          {property.description}
        </p>
        
        {property.description.length > 100 && (
          <button 
            className="text-primary text-xs mt-1 flex items-center font-medium"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? (
              <>
                Show less <ChevronUp className="h-3 w-3 ml-1" />
              </>
            ) : (
              <>
                Show more <ChevronDown className="h-3 w-3 ml-1" />
              </>
            )}
          </button>
        )}
        
        {/* Amenities */}
        <div className="mt-3">
          <div className="flex flex-wrap gap-1">
            {property.amenities.slice(0, 3).map((amenity, index) => (
              <Badge key={index} variant="outline" className="bg-gray-50">
                {amenity}
              </Badge>
            ))}
            {property.amenities.length > 3 && (
              <Badge variant="outline" className="bg-gray-50">
                +{property.amenities.length - 3} more
              </Badge>
            )}
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <Link to={`/properties/${property.id}`} className="flex-1">
            <Button className="w-full">View Details</Button>
          </Link>
          <a href={`tel:${property.contactPhone}`} className="block">
            <Button variant="outline" size="icon">
              <Phone className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;