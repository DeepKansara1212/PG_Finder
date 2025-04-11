import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { useToast } from "../hooks/use-toast";

const Bookings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bookings, setBookings] = useState([]);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: '/bookings' } } });
    } else if (user.bookings) {
      setBookings(user.bookings);
    }
  }, [user, navigate]);
  
  // Group bookings by status
  const confirmedBookings = bookings.filter(booking => booking.status === 'Confirmed');
  const pendingBookings = bookings.filter(booking => booking.status === 'Pending');
  const pastBookings = bookings.filter(booking => booking.status === 'Completed' || booking.status === 'Cancelled');
  
  const handleCancelBooking = (booking) => {
    setSelectedBooking(booking);
    setShowCancelDialog(true);
  };
  
  const confirmCancelBooking = async () => {
    if (!selectedBooking) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update booking status
      const updatedBookings = bookings.map(booking => 
        booking.id === selectedBooking.id 
          ? { ...booking, status: 'Cancelled' } 
          : booking
      );
      
      setBookings(updatedBookings);
      setShowCancelDialog(false);
      
      toast({
        title: "Booking Cancelled",
        description: `Your booking for ${selectedBooking.propertyName} has been cancelled.`,
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Cancellation Failed",
        description: "There was an error cancelling your booking.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Check if user has any bookings
  const hasBookings = bookings.length > 0;
  
  if (!user) {
    return null; // will redirect in useEffect
  }
  
  return (
    <>
      <Helmet>
        <title>Your Bookings - PG Finder</title>
        <meta name="description" content="View and manage your current, pending, and past PG bookings." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#484848] mb-6">Your Bookings</h1>
        
        {hasBookings ? (
          <Tabs defaultValue="confirmed" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="confirmed">
                Confirmed
                {confirmedBookings.length > 0 && (
                  <span className="ml-2 bg-[#00A699] text-white text-xs px-2 py-0.5 rounded-full">
                    {confirmedBookings.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="pending">
                Pending
                {pendingBookings.length > 0 && (
                  <span className="ml-2 bg-[#FFC107] text-white text-xs px-2 py-0.5 rounded-full">
                    {pendingBookings.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="past">Past Bookings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="confirmed">
              {confirmedBookings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {confirmedBookings.map((booking) => (
                    <Card key={booking.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{booking.propertyName}</CardTitle>
                          <span className="inline-flex bg-[#00A699] bg-opacity-10 text-[#00A699] text-xs px-2 py-1 rounded-full">
                            {booking.status}
                          </span>
                        </div>
                        <CardDescription>{booking.roomType} Room</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-[#767676]">Check-in Date:</span>
                            <span className="font-medium text-[#484848]">{formatDate(booking.checkInDate)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#767676]">Duration:</span>
                            <span className="font-medium text-[#484848]">{booking.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#767676]">Monthly Rent:</span>
                            <span className="font-medium text-[#484848]">₹{booking.amount.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#767676]">Landlord:</span>
                            <span className="font-medium text-[#484848]">{booking.landlordName}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleCancelBooking(booking)}
                        >
                          Cancel Booking
                        </Button>
                        <Button 
                          variant="secondary" 
                          size="sm"
                          onClick={() => navigate(`/property/${booking.propertyId}`)}
                        >
                          View Property
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="text-4xl text-gray-300 mb-3">
                    <i className="far fa-calendar-check"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-[#484848] mb-2">No confirmed bookings</h3>
                  <p className="text-[#767676] mb-4">
                    You don't have any confirmed bookings at the moment.
                  </p>
                  <Button onClick={() => navigate('/properties')}>
                    Browse Properties
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="pending">
              {pendingBookings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pendingBookings.map((booking) => (
                    <Card key={booking.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{booking.propertyName}</CardTitle>
                          <span className="inline-flex bg-[#FFC107] bg-opacity-10 text-[#FFC107] text-xs px-2 py-1 rounded-full">
                            {booking.status}
                          </span>
                        </div>
                        <CardDescription>{booking.roomType} Room</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-[#767676]">Check-in Date:</span>
                            <span className="font-medium text-[#484848]">{formatDate(booking.checkInDate)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#767676]">Duration:</span>
                            <span className="font-medium text-[#484848]">{booking.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#767676]">Monthly Rent:</span>
                            <span className="font-medium text-[#484848]">₹{booking.amount.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#767676]">Landlord:</span>
                            <span className="font-medium text-[#484848]">{booking.landlordName}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleCancelBooking(booking)}
                        >
                          Cancel Request
                        </Button>
                        <Button 
                          variant="secondary" 
                          size="sm"
                          onClick={() => navigate(`/property/${booking.propertyId}`)}
                        >
                          View Property
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="text-4xl text-gray-300 mb-3">
                    <i className="far fa-clock"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-[#484848] mb-2">No pending bookings</h3>
                  <p className="text-[#767676] mb-4">
                    You don't have any pending booking requests at the moment.
                  </p>
                  <Button onClick={() => navigate('/properties')}>
                    Browse Properties
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="past">
              {pastBookings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pastBookings.map((booking) => (
                    <Card key={booking.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{booking.propertyName}</CardTitle>
                          <span className={`inline-flex text-xs px-2 py-1 rounded-full ${
                            booking.status === 'Completed'
                              ? 'bg-[#28A745] bg-opacity-10 text-[#28A745]'
                              : 'bg-red-100 text-red-500'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                        <CardDescription>{booking.roomType} Room</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-[#767676]">Check-in Date:</span>
                            <span className="font-medium text-[#484848]">{formatDate(booking.checkInDate)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#767676]">Duration:</span>
                            <span className="font-medium text-[#484848]">{booking.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#767676]">Monthly Rent:</span>
                            <span className="font-medium text-[#484848]">₹{booking.amount.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#767676]">Landlord:</span>
                            <span className="font-medium text-[#484848]">{booking.landlordName}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        {booking.status === 'Completed' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="w-full"
                          >
                            Write a Review
                          </Button>
                        )}
                        {booking.status === 'Cancelled' && (
                          <Button 
                            variant="secondary" 
                            size="sm"
                            className="w-full"
                            onClick={() => navigate(`/property/${booking.propertyId}`)}
                          >
                            Book Again
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="text-4xl text-gray-300 mb-3">
                    <i className="far fa-calendar-alt"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-[#484848] mb-2">No past bookings</h3>
                  <p className="text-[#767676] mb-4">
                    You don't have any completed or cancelled bookings yet.
                  </p>
                  <Button onClick={() => navigate('/properties')}>
                    Browse Properties
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        ) : (
          <Card className="text-center">
            <CardContent className="pt-10 pb-10">
              <div className="text-5xl text-gray-300 mb-4">
                <i className="far fa-calendar-alt"></i>
              </div>
              <h2 className="text-xl font-semibold text-[#484848] mb-2">No Bookings Yet</h2>
              <p className="text-[#767676] max-w-md mx-auto mb-6">
                You haven't made any bookings yet. Browse properties and book your perfect PG accommodation.
              </p>
              <Button onClick={() => navigate('/properties')}>
                Browse Properties
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Cancel Booking Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel your booking for {selectedBooking?.propertyName}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowCancelDialog(false)}
              disabled={isLoading}
            >
              Keep Booking
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmCancelBooking}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i> Cancelling...
                </>
              ) : (
                'Yes, Cancel Booking'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Bookings;
