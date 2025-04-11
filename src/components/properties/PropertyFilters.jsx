import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProperties } from '../../context/PropertiesContent';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "../../components/ui/accordion";
import { Slider } from "../../components/ui/slider";
import { Checkbox } from "../../components/ui/checkbox";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";

const PropertyFilters = () => {
  const { amenitiesList, priceRange } = useProperties();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Initialize filter states from URL params
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [roomType, setRoomType] = useState(searchParams.get('roomType') || '');
  const [priceValues, setPriceValues] = useState([
    searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')) : priceRange.min,
    searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')) : priceRange.max
  ]);
  const [selectedAmenities, setSelectedAmenities] = useState(
    searchParams.getAll('amenities') || []
  );
  
  // Function to apply filters
  const applyFilters = () => {
    const params = new URLSearchParams();
    
    if (location) params.append('location', location);
    if (roomType) params.append('roomType', roomType);
    
    params.append('minPrice', priceValues[0].toString());
    params.append('maxPrice', priceValues[1].toString());
    
    // Clear existing amenities and add selected ones
    selectedAmenities.forEach(amenity => {
      params.append('amenities', amenity);
    });
    
    setSearchParams(params);
  };
  
  // Function to reset filters
  const resetFilters = () => {
    setLocation('');
    setRoomType('');
    setPriceValues([priceRange.min, priceRange.max]);
    setSelectedAmenities([]);
    setSearchParams({});
  };
  
  // Handle amenity checkbox changes
  const handleAmenityChange = (amenity) => {
    setSelectedAmenities(prev => {
      if (prev.includes(amenity)) {
        return prev.filter(a => a !== amenity);
      } else {
        return [...prev, amenity];
      }
    });
  };
  
  // Update filters when URL params change
  useEffect(() => {
    setLocation(searchParams.get('location') || '');
    setRoomType(searchParams.get('roomType') || '');
    setPriceValues([
      searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')) : priceRange.min,
      searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')) : priceRange.max
    ]);
    setSelectedAmenities(searchParams.getAll('amenities') || []);
  }, [searchParams, priceRange]);
  
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-[#484848]">Filters</h3>
        <button 
          onClick={resetFilters}
          className="text-sm text-[#FF5A5F] hover:underline"
        >
          Reset all
        </button>
      </div>
      
      <Accordion type="multiple" defaultValue={["location", "roomType", "price", "amenities"]} className="space-y-2">
        {/* Location Filter */}
        <AccordionItem value="location">
          <AccordionTrigger className="text-[#484848] py-2">Location</AccordionTrigger>
          <AccordionContent>
            <div className="pt-2 pb-3">
              <div className="relative">
                <i className="fas fa-map-marker-alt absolute left-3 top-1/2 transform -translate-y-1/2 text-[#767676]"></i>
                <Input
                  type="text"
                  placeholder="Enter area or locality"
                  className="w-full pl-10"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Room Type Filter */}
        <AccordionItem value="roomType">
          <AccordionTrigger className="text-[#484848] py-2">Room Type</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2 pb-3">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="any-room"
                  name="roomType"
                  value=""
                  checked={roomType === ''}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="mr-2"
                />
                <Label htmlFor="any-room">Any Type</Label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="single-room"
                  name="roomType"
                  value="single"
                  checked={roomType === 'single'}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="mr-2"
                />
                <Label htmlFor="single-room">Single</Label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="double-room"
                  name="roomType"
                  value="double"
                  checked={roomType === 'double'}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="mr-2"
                />
                <Label htmlFor="double-room">Double</Label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="triple-room"
                  name="roomType"
                  value="triple"
                  checked={roomType === 'triple'}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="mr-2"
                />
                <Label htmlFor="triple-room">Triple</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Price Range Filter */}
        <AccordionItem value="price">
          <AccordionTrigger className="text-[#484848] py-2">Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="pt-2 pb-3 space-y-4">
              <Slider
                defaultValue={[priceRange.min, priceRange.max]}
                value={priceValues}
                min={priceRange.min}
                max={priceRange.max}
                step={500}
                onValueChange={setPriceValues}
                className="my-6"
              />
              <div className="flex justify-between items-center">
                <p className="text-sm text-[#767676]">₹{priceValues[0].toLocaleString()}</p>
                <p className="text-sm text-[#767676]">₹{priceValues[1].toLocaleString()}</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Amenities Filter */}
        <AccordionItem value="amenities">
          <AccordionTrigger className="text-[#484848] py-2">Amenities</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2 pt-2 pb-3">
              {amenitiesList.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={`amenity-${amenity}`}
                    checked={selectedAmenities.includes(amenity)}
                    onCheckedChange={() => handleAmenityChange(amenity)}
                  />
                  <Label htmlFor={`amenity-${amenity}`} className="text-sm">
                    {amenity}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <Button className="w-full mt-4" onClick={applyFilters}>Apply Filters</Button>
    </div>
  );
};

export default PropertyFilters;
