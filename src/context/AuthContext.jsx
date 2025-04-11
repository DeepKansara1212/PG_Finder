import { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { defaultUser, defaultLandlord } from '../context/data/users';

// Create authentication context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  // State for user
  const [user, setUser] = useLocalStorage('user', null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Check for user authentication on mount
  useEffect(() => {
    // Simulate checking authentication
    const checkAuth = () => {
      setIsLoading(true);
      
      try {
        // If we have a user in localStorage, use it
        // In a real app, we would validate the token with the server
        setIsLoading(false);
      } catch (err) {
        console.error('Authentication check failed:', err);
        setUser(null);
        setError('Authentication failed. Please log in again.');
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [setUser]);
  
  // Login function
  const login = (credentials) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      // In a real app, we would validate credentials with the server
      if (credentials.email === defaultUser.email && credentials.password === 'password') {
        setUser(defaultUser);
        setIsLoading(false);
        return { success: true };
      } else if (credentials.email === defaultLandlord.email && credentials.password === 'password') {
        setUser(defaultLandlord);
        setIsLoading(false);
        return { success: true };
      } else {
        setError('Invalid email or password');
        setIsLoading(false);
        return { success: false, error: 'Invalid email or password' };
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError('Login failed. Please try again.');
      setIsLoading(false);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };
  
  // Register function
  const register = (userData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      // In a real app, we would send the user data to the server for registration
      const newUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        role: userData.isLandlord ? 'landlord' : 'tenant',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=random`,
        createdAt: new Date().toISOString()
      };
      
      // Set the newly registered user
      setUser(newUser);
      setIsLoading(false);
      return { success: true };
    } catch (err) {
      console.error('Registration failed:', err);
      setError('Registration failed. Please try again.');
      setIsLoading(false);
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  };
  
  // Logout function
  const logout = () => {
    setUser(null);
    // In a real app, we would also invalidate the token on the server
  };
  
  // Update user profile
  const updateProfile = (updatedData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      // In a real app, we would send the updated data to the server
      const updatedUser = { ...user, ...updatedData };
      setUser(updatedUser);
      setIsLoading(false);
      return { success: true };
    } catch (err) {
      console.error('Profile update failed:', err);
      setError('Profile update failed. Please try again.');
      setIsLoading(false);
      return { success: false, error: 'Profile update failed. Please try again.' };
    }
  };
  
  // Change password
  const changePassword = (passwordData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      // In a real app, we would send the password data to the server
      // and validate the current password
      setIsLoading(false);
      return { success: true };
    } catch (err) {
      console.error('Password change failed:', err);
      setError('Password change failed. Please try again.');
      setIsLoading(false);
      return { success: false, error: 'Password change failed. Please try again.' };
    }
  };
  
  // Check if user is authenticated
  const isAuthenticated = () => {
    return user !== null;
  };
  
  // Check if user is a landlord
  const isLandlord = () => {
    return user && user.role === 'landlord';
  };
  
  // Context value
  const value = {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    isAuthenticated,
    isLandlord
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};