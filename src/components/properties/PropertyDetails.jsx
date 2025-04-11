import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "../../components/ui/tabs";
import { Button } from '../../components/ui/button';
import { useAuth } from '../../context/AuthContext';
import { useProperties } from '../../context/PropertiesContent';

const PropertyDetails = ({ property }) => {
  const { 
    id, name, description, location, price, rating, reviewCount, verified,
    images, roomTypes, amenities, landlord, reviews
  } = property;
  
  const { user } = useAuth();
  const { toggleSavedProperty, isPropertySaved } = useProperties();
  const [isSaved, setIsSaved] = useState(isPropertySaved(id));
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [message, setMessage] = useState('');
  
  const handleSaveClick = () => {
    toggleSavedProperty(id);
    setIsSaved(!isSaved);
  };
  
  const handleContactSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send the message to the backend
    alert(`Message sent to ${landlord.name}: ${message}`);
    setMessage('');
    setShowContactForm(false);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Property Images */}
      <div className="relative">
        <div className="h-72 md:h-96 overflow-hidden">
          <img 
            src={images[activeImageIndex]} 
            alt={`${name} view ${activeImageIndex + 1}`} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Image Navigation */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {images.map((_, index) => (
            <button 
              key={index}
              className={`w-2.5 h-2.5 rounded-full ${index === activeImageIndex ? 'bg-white' : 'bg-white/50'}`}
              onClick={() => setActiveImageIndex(index)}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Save Button */}
        <button 
          className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md text-xl"
          onClick={handleSaveClick}
          aria-label={isSaved ? 'Unsave property' : 'Save property'}
        >
          <i className={`${isSaved ? 'fas text-[#FF5A5F]' : 'far'} fa-heart`}></i>
        </button>
      </div>
      
      {/* Property Information */}
      <div className="p-4 md:p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#484848] mb-1">{name}</h1>
            <p className="text-[#767676]">{location}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-[#484848]">₹{price.toLocaleString()}<span className="text-[#767676] text-sm font-normal">/month</span></div>
            {verified && (
              <span className="bg-[#00A699] bg-opacity-10 text-[#00A699] text-xs px-2 py-1 rounded-full">Verified</span>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {roomTypes.map((type, idx) => (
            <span key={`room-${idx}`} className="bg-gray-100 text-[#767676] px-3 py-1 rounded-full text-sm">
              {type}
            </span>
          ))}
        </div>
        
        <div className="flex items-center mb-6">
          <div className="flex items-center space-x-1 text-[#FFC107]">
            <i className="fas fa-star"></i>
            <span className="font-medium">{rating.toFixed(1)}</span>
          </div>
          <span className="mx-2 text-[#767676]">•</span>
          <span className="text-[#484848]">{reviewCount} reviews</span>
        </div>
        
        {/* Tabs for Details */}
        <Tabs defaultValue="overview" className="mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="amenities">Amenities</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="text-[#484848]">
              <h3 className="text-xl font-semibold mb-2">Description</h3>
              <p className="whitespace-pre-line">{description}</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Room Types</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roomTypes.map((type, idx) => (
                  <div key={`room-detail-${idx}`} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-1">{type} Room</h4>
                    <p className="text-[#767676] text-sm mb-2">Suitable for {type === 'single' ? '1 person' : type === 'double' ? '2 persons' : '3 persons'}</p>
                    <p className="font-semibold text-[#484848]">₹{(price * (type === 'single' ? 1 : type === 'double' ? 1.5 : 1.8)).toLocaleString()}/month</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="amenities">
            <h3 className="text-xl font-semibold mb-4">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4">
              {amenities.map((amenity, idx) => (
                <div key={`amenity-${idx}`} className="flex items-center">
                  <i className="fas fa-check text-[#00A699] mr-2"></i>
                  <span className="text-[#484848]">{amenity}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="reviews">
            <h3 className="text-xl font-semibold mb-4">Reviews</h3>
            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review, idx) => (
                  <div key={`review-${idx}`} className="border-b border-gray-100 pb-4 last:border-b-0">
                    <div className="flex items-center mb-2">
                      <img 
                        src={review.userAvatar} 
                        alt={review.userName} 
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <h4 className="font-semibold">{review.userName}</h4>
                        <div className="flex items-center">
                          <div className="flex text-[#FFC107]">
                            {[...Array(5)].map((_, i) => (
                              <i 
                                key={i} 
                                className={`text-xs ${i < review.rating ? 'fas fa-star' : 'far fa-star'}`}
                              ></i>
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-[#767676]">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-[#484848]">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[#767676]">No reviews yet.</p>
            )}
          </TabsContent>
        </Tabs>
        
        {/* Landlord Information */}
        <div className="border-t border-gray-200 pt-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Hosted by {landlord.name}</h3>
          <div className="flex items-center">
            <img 
              src={landlord.avatar} 
              alt={landlord.name} 
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <p className="text-[#484848]">{landlord.properties} properties</p>
              <p className="text-[#767676] text-sm">Member since {landlord.memberSince}</p>
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        {showContactForm ? (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-3">Contact {landlord.name}</h3>
            <form onSubmit={handleContactSubmit}>
              <textarea
                className="w-full border border-gray-300 rounded-md p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent"
                rows="4"
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowContactForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Send Message</Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            {user ? (
              <>
                <Button className="flex-1" onClick={() => setShowContactForm(true)}>
                  <i className="far fa-comment-alt mr-2"></i> Contact Host
                </Button>
                <Button variant="secondary" className="flex-1">
                  <i className="far fa-calendar-check mr-2"></i> Book Now
                </Button>
              </>
            ) : (
              <Link to="/login" className="w-full">
                <Button className="w-full">
                  Login to Book or Contact
                </Button>
              </Link>
            )}
          </div>
        )}
        
        {/* Map */}
        <div className="rounded-lg overflow-hidden h-60 bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <i className="fas fa-map-marker-alt text-3xl text-[#FF5A5F] mb-2"></i>
            <p className="text-[#484848]">Map view available after login</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
