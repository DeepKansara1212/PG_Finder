import { Search, Home, Calendar, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search className="h-12 w-12 text-primary" />,
      title: 'Search Properties',
      description: 'Browse through our verified PG accommodations based on your location, budget, and amenities preferences.'
    },
    {
      icon: <Home className="h-12 w-12 text-primary" />,
      title: 'View Details & Schedule',
      description: 'Check detailed information, photos, and reviews of properties. Schedule a visit at your convenient time.'
    },
    {
      icon: <Calendar className="h-12 w-12 text-primary" />,
      title: 'Book Your PG',
      description: 'Choose your desired PG and make a booking online with secure payment options.'
    },
    {
      icon: <CheckCircle className="h-12 w-12 text-primary" />,
      title: 'Move In',
      description: 'Get confirmation, e-receipt, and move into your new PG accommodation without any hassle.'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-3 inline-block">
            Simple Process
          </span>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How PG Finder Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find and book your ideal PG accommodation in just a few simple steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-6">
                  {step.icon}
                </div>
                <div className="absolute -top-3 -left-3 bg-primary w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              
              {/* Connector line between steps (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 w-full h-0.5 bg-gray-200 -z-10 translate-x-1/2">
                  <div className="absolute top-1/2 right-0 w-2 h-2 bg-primary rounded-full -translate-y-1/2"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;