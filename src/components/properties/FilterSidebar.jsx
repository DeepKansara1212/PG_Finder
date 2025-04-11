import { useProperties } from '../../context/PropertiesContent';
import { Button } from './../ui/button';
import { Input } from './../ui/input';
import { Label } from './../ui/label';
import { Checkbox } from './../ui/checkbox';
import { RadioGroup, RadioGroupItem } from './../ui/radio-group';
import { Slider } from './../ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './../ui/select';

const FiltersSidebar = ({ filters, onFilterChange, onClearFilters, onApply }) => {
  const { locations, amenitiesList } = useProperties();
  
  // Get unique occupancy types from properties for dropdown
  const occupancyTypes = ['Single', 'Double', 'Triple', 'Any'];
  
  // Calculate price range
  const minPossiblePrice = 1000;
  const maxPossiblePrice = 50000;
  
  // Handle location change
  const handleLocationChange = (value) => {
    onFilterChange({ location: value });
  };
  
  // Handle price range changes
  const handlePriceChange = (values) => {
    onFilterChange({
      minPrice: values[0],
      maxPrice: values[1],
    });
  };
  
  // Handle occupancy change
  const handleOccupancyChange = (value) => {
    onFilterChange({ occupancy: value });
  };
  
  // Handle amenity toggle
  const handleAmenityToggle = (amenity) => {
    const currentAmenities = [...filters.amenities];
    
    if (currentAmenities.includes(amenity)) {
      const updated = currentAmenities.filter(item => item !== amenity);
      onFilterChange({ amenities: updated });
    } else {
      onFilterChange({ amenities: [...currentAmenities, amenity] });
    }
  };
  
  // Handle availability change
  const handleAvailabilityChange = (value) => {
    onFilterChange({ availability: value });
  };
  
  // Handle apply (for mobile)
  const handleApply = () => {
    if (onApply) onApply();
  };
  
  return (
    <div className="bg-white p-5 rounded-lg border">
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-bold text-lg">Filters</h3>
        <Button variant="ghost" size="sm" onClick={onClearFilters}>
          Clear All
        </Button>
      </div>
      
      {/* Location Filter */}
      <div className="mb-6">
        <Label className="mb-2 block">Location</Label>
        <Select 
          value={filters.location || ''}
          onValueChange={handleLocationChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Any location</SelectItem>
            {locations.map(location => (
              <SelectItem key={location.id} value={location.name}>
                {location.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Price Range Filter */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <Label>Price Range</Label>
          <span className="text-sm text-gray-500">
            ₹{filters.minPrice || minPossiblePrice} - ₹{filters.maxPrice || maxPossiblePrice}
          </span>
        </div>
        <Slider
          defaultValue={[filters.minPrice || minPossiblePrice, filters.maxPrice || maxPossiblePrice]}
          min={minPossiblePrice}
          max={maxPossiblePrice}
          step={500}
          onValueChange={handlePriceChange}
          className="mb-3"
        />
        <div className="flex gap-2">
          <div>
            <Label className="text-xs text-gray-500">Min</Label>
            <Input 
              type="number" 
              className="mt-1"
              value={filters.minPrice || minPossiblePrice}
              onChange={e => onFilterChange({ minPrice: parseInt(e.target.value) || minPossiblePrice })}
              min={minPossiblePrice}
              max={filters.maxPrice || maxPossiblePrice}
            />
          </div>
          <div>
            <Label className="text-xs text-gray-500">Max</Label>
            <Input 
              type="number" 
              className="mt-1"
              value={filters.maxPrice || maxPossiblePrice}
              onChange={e => onFilterChange({ maxPrice: parseInt(e.target.value) || maxPossiblePrice })}
              min={filters.minPrice || minPossiblePrice}
              max={maxPossiblePrice}
            />
          </div>
        </div>
      </div>
      
      {/* Occupancy Filter */}
      <div className="mb-6">
        <Label className="mb-2 block">Occupancy</Label>
        <Select 
          value={filters.occupancy || ''}
          onValueChange={handleOccupancyChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select occupancy" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Any occupancy</SelectItem>
            {occupancyTypes.map(type => (
              <SelectItem key={type} value={type.toLowerCase()}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Availability Filter */}
      <div className="mb-6">
        <Label className="mb-2 block">Availability</Label>
        <RadioGroup
          value={filters.availability}
          onValueChange={handleAvailabilityChange}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="" id="availability-all" />
            <Label htmlFor="availability-all">All</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="available" id="availability-available" />
            <Label htmlFor="availability-available">Available only</Label>
          </div>
        </RadioGroup>
      </div>
      
      {/* Amenities Filter */}
      <div className="mb-6">
        <Label className="mb-2 block">Amenities</Label>
        <div className="space-y-2">
          {amenitiesList.slice(0, 8).map(amenity => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox
                id={`amenity-${amenity}`}
                checked={filters.amenities.includes(amenity)}
                onCheckedChange={() => handleAmenityToggle(amenity)}
              />
              <Label htmlFor={`amenity-${amenity}`} className="cursor-pointer">
                {amenity}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Mobile Apply Button */}
      {onApply && (
        <Button className="w-full" onClick={handleApply}>
          Apply Filters
        </Button>
      )}
    </div>
  );
};

export default FiltersSidebar;