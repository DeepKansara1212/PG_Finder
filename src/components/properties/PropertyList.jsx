import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropertyCard from './PropertyCard';
//import FiltersSidebar from './FiltersSidebar';
import { useProperties } from '../../context/PropertiesContent';
import { filterProperties, sortProperties } from '../../utils/helpers';
import { Grid3x3, List, SlidersHorizontal } from 'lucide-react';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './../ui/select';

const PropertyList = ({ title = 'Featured Properties', showFilters = false, limit = 0 }) => {
  const location = useLocation();
  const { properties } = useProperties();
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    occupancy: '',
    amenities: [],
    availability: ''
  });
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Parse URL parameters on component mount and when URL changes
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const locationParam = queryParams.get('location');
    
    if (locationParam) {
      setFilters(prev => ({ ...prev, location: locationParam }));
    }
  }, [location]);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = filterProperties(properties, filters);
    filtered = sortProperties(filtered, sortBy);
    
    // Apply limit if specified
    if (limit > 0) {
      filtered = filtered.slice(0, limit);
    }
    
    setFilteredProperties(filtered);
  }, [properties, filters, sortBy, limit]);

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Handle sort changes
  const handleSortChange = (value) => {
    setSortBy(value);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      location: '',
      minPrice: '',
      maxPrice: '',
      occupancy: '',
      amenities: [],
      availability: ''
    });
  };

  // Toggle mobile filters visibility
  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  return (
    <div className="container mx-auto px-4">
      {title && (
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
      )}
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar - Desktop */}
        {showFilters && (
          <div className="hidden lg:block w-full lg:w-64 flex-shrink-0">
            <FiltersSidebar 
              filters={filters} 
              onFilterChange={handleFilterChange} 
              onClearFilters={clearFilters}
            />
          </div>
        )}
        
        {/* Mobile Filters Button */}
        {showFilters && (
          <div className="lg:hidden mb-4 flex justify-between items-center">
            <Button 
              variant="outline" 
              className="flex items-center gap-1"
              onClick={toggleMobileFilters}
            >
              <SlidersHorizontal className="h-4 w-4 mr-1" />
              Filters
            </Button>
            
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price_low">Price: Low to High</SelectItem>
                <SelectItem value="price_high">Price: High to Low</SelectItem>
                <SelectItem value="popularity">Popularity</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        
        {/* Mobile Filters Sidebar */}
        {showFilters && showMobileFilters && (
          <div className="lg:hidden fixed inset-0 bg-white z-50 overflow-auto p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Filters</h3>
              <Button variant="ghost" onClick={toggleMobileFilters}>
                Close
              </Button>
            </div>
            <FiltersSidebar 
              filters={filters} 
              onFilterChange={handleFilterChange} 
              onClearFilters={clearFilters} 
              onApply={toggleMobileFilters}
            />
          </div>
        )}
        
        {/* Main Content */}
        <div className="flex-1">
          {/* Controls - Desktop */}
          {showFilters && (
            <div className="hidden lg:flex justify-between items-center mb-6">
              <div className="flex gap-2">
                <Button 
                  variant={viewMode === 'grid' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button 
                  variant={viewMode === 'list' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  Showing {filteredProperties.length} properties
                </span>
                <Select value={sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price_low">Price: Low to High</SelectItem>
                    <SelectItem value="price_high">Price: High to Low</SelectItem>
                    <SelectItem value="popularity">Popularity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          {/* Properties Grid/List */}
          {filteredProperties.length > 0 ? (
            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'} gap-6`}>
              {filteredProperties.map(property => (
                <PropertyCard 
                  key={property.id} 
                  property={property}
                />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <h3 className="text-lg font-semibold mb-2">No properties found</h3>
              <p className="text-gray-600 mb-4">
                We couldn't find any properties matching your filters.
              </p>
              {showFilters && (
                <Button onClick={clearFilters}>Clear All Filters</Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyList;