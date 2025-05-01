import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Home, Church } from 'lucide-react';

interface WalkPoint {
  id: number;
  imageUrl: string;
  description: string;
  distance: string;
  time: string;
}

const VirtualWalk: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  // Sample walk points - replace these with your actual image paths
  const walkPoints: WalkPoint[] = [
    {
      id: 0,
      imageUrl: "/images/walk/start.jpg",
      description: "Starting from home, you step out onto the quiet street. The morning air is crisp and fresh.",
      distance: "0m",
      time: "0:00"
    },
    {
      id: 1,
      imageUrl: "/images/walk/park.jpg",
      description: "Passing by the local park, you notice how different it feels on Shabbat - peaceful and quiet.",
      distance: "200m",
      time: "4:00"
    },
    {
      id: 2,
      imageUrl: "/images/walk/synagogue-view.jpg",
      description: "The synagogue comes into view, its familiar architecture welcoming you.",
      distance: "300m",
      time: "6:00"
    },
    {
      id: 3,
      imageUrl: "/images/walk/entrance.jpg",
      description: "Approaching the entrance, you can hear the morning prayers beginning.",
      distance: "400m",
      time: "8:00"
    }
  ];

  const handleNext = () => {
    if (currentStep < walkPoints.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentPoint = walkPoints[currentStep];

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#1c2340] mb-4">Virtual Walk to Synagogue</h2>
        <p className="text-gray-600 mb-4">
          Experience the journey to synagogue on Shabbat morning through this virtual walk.
          Each step represents a moment in the journey, capturing the unique atmosphere of walking to synagogue.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div 
          className="bg-[#1c2340] h-2.5 rounded-full" 
          style={{ width: `${(currentStep / (walkPoints.length - 1)) * 100}%` }}
        ></div>
      </div>

      {/* Location Indicators */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Home size={20} className="text-[#1c2340] mr-2" />
          <span className="text-sm text-gray-600">Home</span>
        </div>
        <div className="flex items-center">
          <span className="text-sm text-gray-600">Synagogue</span>
          <Church size={20} className="text-[#cba95b] ml-2" />
        </div>
      </div>

      {/* Image Container */}
      <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-4">
        <img 
          src={currentPoint.imageUrl} 
          alt={`Walk point ${currentPoint.id}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/images/placeholder.jpg"; // Fallback image if the main image fails to load
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white">
          <p className="text-sm">{currentPoint.description}</p>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-600">
          Distance: {currentPoint.distance} | Time: {currentPoint.time}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`px-4 py-2 rounded-md flex items-center ${
              currentStep === 0 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-[#1c2340] text-white hover:bg-[#cba95b]'
            }`}
          >
            <ChevronLeft size={20} className="mr-2" />
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentStep === walkPoints.length - 1}
            className={`px-4 py-2 rounded-md flex items-center ${
              currentStep === walkPoints.length - 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-[#1c2340] text-white hover:bg-[#cba95b]'
            }`}
          >
            Next
            <ChevronRight size={20} className="ml-2" />
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="mt-6 text-center text-gray-600">
        <p>
          This virtual walk captures the experience of walking to synagogue on Shabbat morning.
          Each step represents a moment in the journey, highlighting how the act of walking
          transforms ordinary streets into pathways of spiritual connection.
        </p>
      </div>
    </div>
  );
};

export default VirtualWalk; 