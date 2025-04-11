// Format currency (₹)
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format date
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-IN', options);
};

// Format time from timestamp
export const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Format relative time (e.g., "5 minutes ago")
export const formatRelativeTime = (timestamp) => {
  const now = new Date();
  const date = new Date(timestamp);
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) {
    return 'just now';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
  }
  
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
};

// Truncate text with ellipsis
export const truncateText = (text, maxLength) => {
  if (!text) return '';
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

// Filter properties based on filter criteria
export const filterProperties = (properties, filters) => {
  return properties.filter(property => {
    // Filter by location
    if (filters.location && property.location !== filters.location) {
      return false;
    }
    
    // Filter by price range
    if (filters.minPrice && property.rent < filters.minPrice) {
      return false;
    }
    
    if (filters.maxPrice && property.rent > filters.maxPrice) {
      return false;
    }
    
    // Filter by occupancy
    if (filters.occupancy && property.occupancy.toLowerCase() !== filters.occupancy) {
      return false;
    }
    
    // Filter by amenities (all selected amenities must be present)
    if (filters.amenities && filters.amenities.length > 0) {
      const hasAllAmenities = filters.amenities.every(amenity => 
        property.amenities.includes(amenity)
      );
      
      if (!hasAllAmenities) {
        return false;
      }
    }
    
    // Filter by availability
    if (filters.availability === 'available' && !property.isAvailable) {
      return false;
    }
    
    return true;
  });
};

// Sort properties based on sort criteria
export const sortProperties = (properties, sortBy) => {
  const sortedProperties = [...properties];
  
  switch (sortBy) {
    case 'price_low':
      return sortedProperties.sort((a, b) => a.rent - b.rent);
    case 'price_high':
      return sortedProperties.sort((a, b) => b.rent - a.rent);
    case 'popularity':
      return sortedProperties.sort((a, b) => b.rating - a.rating);
    case 'newest':
    default:
      return sortedProperties.sort((a, b) => b.createdAt - a.createdAt);
  }
};

// Generate a random ID
export const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// Check if an object is empty
export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

// Parse URL query parameters
export const parseQueryParams = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const params = {};
  
  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }
  
  return params;
};

// Build URL query string from params object
export const buildQueryString = (params) => {
  const searchParams = new URLSearchParams();
  
  for (const [key, value] of Object.entries(params)) {
    if (value) {
      searchParams.append(key, value);
    }
  }
  
  return searchParams.toString();
};