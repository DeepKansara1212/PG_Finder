import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { Button } from './../components/ui/button';
import { Input } from './../components/ui/input';
import { Textarea } from './../components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./../components/ui/form";
import { useAuth } from '../context/AuthContext';

const landlordSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  address: z.string().min(10, { message: "Address must be at least 10 characters" }),
  propertyType: z.string().min(1, { message: "Please select a property type" }),
  propertyDescription: z.string().min(20, { message: "Description must be at least 20 characters" }),
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const LandlordSignup = () => {
  const { user, registerLandlord } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [signupError, setSignupError] = useState('');
  
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);
  
  // Initialize form
  const form = useForm({
    resolver: zodResolver(landlordSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      propertyType: '',
      propertyDescription: '',
      username: '',
      password: '',
    },
  });
  
  const onSubmit = async (data) => {
    setIsLoading(true);
    setSignupError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const success = await registerLandlord({
        ...data,
        role: 'Landlord'
      });
      
      if (success) {
        navigate('/');
      } else {
        setSignupError('Username or email already exists');
      }
    } catch (error) {
      setSignupError('An error occurred during registration');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
      <Helmet>
        <title>Become a Landlord - PG Finder</title>
        <meta name="description" content="Register as a landlord on PG Finder to list your properties and connect with potential tenants." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#484848] mb-2">List Your PG on PG Finder</h1>
            <p className="text-[#767676]">
              Join thousands of landlords who trust PG Finder to connect with quality tenants
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            {signupError && (
              <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">
                {signupError}
              </div>
            )}
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-[#484848]">Personal Information</h2>
                  
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your full name" 
                            {...field} 
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email"
                              placeholder="Your email address" 
                              {...field} 
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input 
                              type="tel"
                              placeholder="Your phone number" 
                              {...field} 
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <div className="space-y-4 pt-4 border-t border-gray-200">
                  <h2 className="text-xl font-semibold text-[#484848]">Property Information</h2>
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Address</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Full address of your property" 
                            {...field} 
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="propertyType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Type</FormLabel>
                        <FormControl>
                          <select 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent"
                            {...field}
                            disabled={isLoading}
                          >
                            <option value="">Select property type</option>
                            <option value="Independent House">Independent House</option>
                            <option value="Apartment">Apartment</option>
                            <option value="Hostel">Hostel</option>
                            <option value="Guest House">Guest House</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="propertyDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your property, amenities, and rules" 
                            rows={5}
                            {...field} 
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="space-y-4 pt-4 border-t border-gray-200">
                  <h2 className="text-xl font-semibold text-[#484848]">Account Information</h2>
                  
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Choose a username" 
                            {...field} 
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="Create a password" 
                            {...field} 
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    className="h-4 w-4 text-[#FF5A5F] rounded border-gray-300 focus:ring-[#FF5A5F]"
                    required
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-[#767676]">
                    I agree to the <a href="#" className="text-[#FF5A5F] hover:underline">Terms of Service</a>, <a href="#" className="text-[#FF5A5F] hover:underline">Privacy Policy</a>, and <a href="#" className="text-[#FF5A5F] hover:underline">Landlord Guidelines</a>
                  </label>
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i> Creating Account...
                    </>
                  ) : (
                    'Register as Landlord'
                  )}
                </Button>
              </form>
            </Form>
            
            <div className="mt-6 pt-4 border-t border-gray-200 text-center">
              <p className="text-[#767676]">
                Already have an account?{' '}
                <Link to="/login" className="text-[#FF5A5F] hover:underline font-medium">
                  Login
                </Link>
              </p>
            </div>
          </div>
          
          <div className="mt-10 bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-[#484848] mb-4">Why Join PG Finder as a Landlord?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#FF5A5F] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-user-plus text-[#FF5A5F] text-xl"></i>
                </div>
                <h3 className="font-semibold mb-2">Wider Reach</h3>
                <p className="text-sm text-[#767676]">Connect with thousands of potential tenants looking for accommodations.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#FF5A5F] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-tasks text-[#FF5A5F] text-xl"></i>
                </div>
                <h3 className="font-semibold mb-2">Easy Management</h3>
                <p className="text-sm text-[#767676]">Manage property listings, bookings, and tenant communication from one dashboard.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#FF5A5F] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-shield-alt text-[#FF5A5F] text-xl"></i>
                </div>
                <h3 className="font-semibold mb-2">Verified Tenants</h3>
                <p className="text-sm text-[#767676]">Connect with verified tenants and reduce the risk of payment issues.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandlordSignup;
