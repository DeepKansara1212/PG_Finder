import { Link } from 'react-router-dom';
import { Button } from './../components/ui/button';
import { Helmet } from 'react-helmet';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | PG Finder</title>
        <meta name="description" content="The page you are looking for does not exist." />
      </Helmet>
      
      <div className="flex flex-col items-center justify-center min-h-[70vh] py-16 px-4 text-center">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h2 className="text-3xl font-semibold mt-6 mb-3">Page Not Found</h2>
        <p className="text-gray-600 max-w-md mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/">
            <Button size="lg">
              Go to Homepage
            </Button>
          </Link>
          <Link to="/properties">
            <Button variant="outline" size="lg">
              Browse Properties
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;