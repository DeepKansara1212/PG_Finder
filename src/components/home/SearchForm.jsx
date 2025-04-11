import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

const SearchForm = () => {
  const [location, setLocation] = useState('');
  const [roomType, setRoomType] = useState('any');
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Generate query parameters
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (roomType !== 'any') params.append('roomType', roomType);
    
    // Navigate to properties page with query parameters
    navigate(`/properties?${params.toString()}`);
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <div className="flex-grow">
            <label htmlFor="location" className="block text-sm font-medium text-[#484848] mb-1">Location</label>
            <div className="relative">
              <i className="fas fa-map-marker-alt absolute left-3 top-1/2 transform -translate-y-1/2 text-[#767676]"></i>
              <input 
                type="text" 
                id="location" 
                placeholder="Enter area or locality" 
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <label htmlFor="roomType" className="block text-sm font-medium text-[#484848] mb-1">Room Type</label>
            <div className="relative">
              <i className="fas fa-bed absolute left-3 top-1/2 transform -translate-y-1/2 text-[#767676]"></i>
              <select 
                id="roomType" 
                className="w-full pl-10 pr-8 py-2 border border-gray-300 appearance-none rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent"
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
              >
                <option value="any">Any Type</option>
                <option value="single">Single</option>
                <option value="double">Double</option>
                <option value="triple">Triple</option>
              </select>
              <i className="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-[#767676] pointer-events-none"></i>
            </div>
          </div>
        </div>
        <div className="flex">
          <Button type="submit" className="w-full">
            Search
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
