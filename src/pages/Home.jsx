import Hero from '../components/home/Hero';
import PopularLocations from '../components/home/PopularLocation';
import FeaturedPGs from '../components/home/FeaturedPGs';
import HowItWorks from '../components/home/HowItWorks';
import CtaSection from '../components/home/CtaSection';
import { Helmet } from 'react-helmet';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>PG Finder - Find Your Perfect PG Accommodation</title>
        <meta name="description" content="Discover verified PG accommodations tailored to your needs with our easy-to-use platform." />
      </Helmet>
      <Hero />
      <PopularLocations />
      <FeaturedPGs />
      <HowItWorks />
      <CtaSection />
    </>
  );
};

export default Home;
