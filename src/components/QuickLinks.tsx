import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ScrollText, BookOpen } from 'lucide-react';

const QuickLinks: React.FC = () => {
  return (
    <div className="max-w-[1440px] mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link 
          to="/theory" 
          className="bg-white hover:bg-gray-50 transition-colors rounded-lg shadow-md p-6 flex flex-col items-center text-center group"
        >
          <Compass size={32} className="text-[#1c2340] mb-4 group-hover:text-[#cba95b] transition-colors" />
          <h3 className="text-xl font-semibold mb-2">Theory</h3>
          <p className="text-gray-600">Explore the theoretical frameworks that guide our understanding of walking and space.</p>
        </Link>
        
        <Link 
          to="/about" 
          className="bg-white hover:bg-gray-50 transition-colors rounded-lg shadow-md p-6 flex flex-col items-center text-center group"
        >
          <ScrollText size={32} className="text-[#1c2340] mb-4 group-hover:text-[#cba95b] transition-colors" />
          <h3 className="text-xl font-semibold mb-2">About</h3>
          <p className="text-gray-600">Learn more about the purpose and methodology behind this walking exploration.</p>
        </Link>
        
        <Link 
          to="/works" 
          className="bg-white hover:bg-gray-50 transition-colors rounded-lg shadow-md p-6 flex flex-col items-center text-center group"
        >
          <BookOpen size={32} className="text-[#1c2340] mb-4 group-hover:text-[#cba95b] transition-colors" />
          <h3 className="text-xl font-semibold mb-2">Works Cited</h3>
          <p className="text-gray-600">Review the scholarly sources and references that inform this project.</p>
        </Link>
      </div>
    </div>
  );
};

export default QuickLinks;