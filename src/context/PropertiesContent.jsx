import { createContext, useContext, useState, useEffect } from 'react';
import { propertyData } from '../context/data/properties';
import { locationData } from '../context/data/locations';
import { amenitiesList } from '../context/data/amenities';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Create properties context
const PropertiesContext = createContext();

// Properties provider component
export const PropertiesProvider = ({ children }) => {
  // State for properties
  const [properties, setProperties] = useState([]);
  const [locations, setLocations] = useState([]);
  const [featuredProperties, setFeaturedProperties] = useState([]);
  // Use local storage for saved properties
  const [savedProperties, setSavedProperties] = useLocalStorage('savedProperties', []);
  
  // Load properties, locations, and amenities on mount
  useEffect(() => {
    // Add timestamps for sorting by newest
    const propertiesWithTimestamps = propertyData.map(property => ({
      ...property,
      createdAt: property.createdAt || Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
    }));
    
    setProperties(propertiesWithTimestamps);
    setLocations(locationData);
    
    // Set featured properties (those with isFeatured = true)
    const featured = propertiesWithTimestamps.filter(property => property.isFeatured);
    setFeaturedProperties(featured);
  }, []);
  
  // Toggle saved property (add/remove from saved list)
  const toggleSavedProperty = (propertyId) => {
    if (savedProperties.includes(propertyId)) {
      setSavedProperties(savedProperties.filter(id => id !== propertyId));
    } else {
      setSavedProperties([...savedProperties, propertyId]);
    }
  };
  
  // Get saved properties details
  const getSavedPropertiesDetails = () => {
    return properties.filter(property => savedProperties.includes(property.id));
  };
  
  // Get property by ID
  const getPropertyById = (id) => {
    return properties.find(property => property.id === parseInt(id, 10));
  };
  
  // Get similar properties
  const getSimilarProperties = (propertyId, limit = 3) => {
    const property = getPropertyById(propertyId);
    
    if (!property) return [];
    
    return properties
      .filter(p => 
        p.id !== property.id && 
        (p.location === property.location || p.propertyType === property.propertyType)
      )
      .sort(() => 0.5 - Math.random()) // Simple shuffle
      .slice(0, limit);
  };
  
  // Get properties by location
  const getPropertiesByLocation = (locationName) => {
    return properties.filter(property => property.location === locationName);
  };
  
  // Context value
  const value = {
    properties,
    locations,
    featuredProperties,
    amenitiesList,
    savedProperties,
    toggleSavedProperty,
    getSavedPropertiesDetails,
    getPropertyById,
    getSimilarProperties,
    getPropertiesByLocation
  };
  
  return (
    <PropertiesContext.Provider value={value}>
      {children}
    </PropertiesContext.Provider>
  );
};

// Custom hook to use properties context
export const useProperties = () => {
  const context = useContext(PropertiesContext);
  
  if (context === undefined) {
    throw new Error('useProperties must be used within a PropertiesProvider');
  }
  
  return context;
};