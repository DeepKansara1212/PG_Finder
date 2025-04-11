import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { Toaster } from './../ui/toaster';

const Layout = ({ children }) => {
  const location = useLocation();
  const [showNavAndFooter, setShowNavAndFooter] = useState(true);
  
  // Check if current route should exclude navbar and footer
  useEffect(() => {
    const excludedRoutes = ['/login', '/register', '/landlord-signup'];
    const shouldExclude = excludedRoutes.some(route => location.pathname === route);
    setShowNavAndFooter(!shouldExclude);
  }, [location.pathname]);
  
  return (
    <div className="flex flex-col min-h-screen">
      {showNavAndFooter && <Navbar />}
      
      <main className="flex-grow">
        {children}
      </main>
      
      {showNavAndFooter && <Footer />}
      
      <Toaster />
    </div>
  );
};

export default Layout;