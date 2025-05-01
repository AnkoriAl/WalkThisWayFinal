import React from 'react';
import { ChevronDown } from 'lucide-react';
import CardCarousel from '../components/CardCarousel';
import QuickLinks from '../components/QuickLinks';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section with Video Background */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#1c2340] bg-opacity-70 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.pexels.com/photos/5847359/pexels-photo-5847359.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')"
          }}
        >
          {/* In a full implementation, this would be a video */}
          <div className="absolute inset-0 bg-[#1c2340] bg-opacity-50"></div>
        </div>
        
        <div className="relative z-20 text-center px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
            Walking the Text
          </h1>
          <p className="text-xl text-white mb-8">
            Eight cards, endless footsteps
          </p>
          <div className="animate-bounce mt-12">
            <ChevronDown size={32} className="text-white mx-auto" />
            <p className="text-white text-sm">Scroll to begin</p>
          </div>
        </div>
      </div>
      
      {/* Card Carousel Section */}
      <div className="py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#1c2340]">
            Explore the Cards
          </h2>
          <CardCarousel />
        </div>
      </div>
      
      {/* Quick Links Section */}
      <div className="py-16 bg-[#f6f0e6]">
        <div className="max-w-[1440px] mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#1c2340]">
            Additional Resources
          </h2>
          <QuickLinks />
        </div>
      </div>
    </div>
  );
};

export default HomePage;