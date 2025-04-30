import React from 'react';
import { aboutText } from '../data/theory';
import { cards } from '../data/cards';
import { BookOpen } from 'lucide-react';

const AboutPage: React.FC = () => {
  const courseMatrix = cards.map((card, index) => ({
    card: card.title,
    week: index + 1,
    primary: `Walking & ${card.title.split(',')[0]}`,
    theory: index === 0 ? 'Exile' : 
           index === 1 ? 'Sacred Geography' :
           index === 2 ? 'Tactics & Strategies' :
           index === 3 ? 'Flâneur Concept' :
           index === 4 ? 'Surveillance' :
           'Psychogeography'
  }));

  return (
    <div className="min-h-screen bg-[#f6f0e6]">
      <div className="max-w-[1440px] mx-auto px-4 py-12">
        {/* Hero section with pull quote */}
        <div className="mb-16 text-center">
          <div 
            className="text-2xl md:text-4xl font-semibold text-[#1c2340] max-w-3xl mx-auto"
            data-aos="fade-up"
          >
            "Visitors do not flip pages—they walk."
          </div>
        </div>
        
        {/* Main statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-8 lg:col-start-3">
            <div 
              className="bg-white rounded-lg shadow-md p-8"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h1 className="text-3xl font-bold mb-6 text-[#1c2340]">About This Project</h1>
              
              <div className="prose max-w-none">
                {aboutText.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Course matrix */}
        <div className="mb-16">
          <h2 
            className="text-2xl font-bold mb-6 text-[#1c2340] text-center"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Course Matrix
          </h2>
          
          <div 
            className="bg-white rounded-lg shadow-md overflow-hidden"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#1c2340] text-white">
                    <th className="px-4 py-3 text-left">Card</th>
                    <th className="px-4 py-3 text-left">Week</th>
                    <th className="px-4 py-3 text-left">Primary Focus</th>
                    <th className="px-4 py-3 text-left">Theory Anchor</th>
                  </tr>
                </thead>
                <tbody>
                  {courseMatrix.map((row, index) => (
                    <tr 
                      key={index}
                      className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                    >
                      <td className="px-4 py-3 border-t">{row.card}</td>
                      <td className="px-4 py-3 border-t">{row.week}</td>
                      <td className="px-4 py-3 border-t">{row.primary}</td>
                      <td className="px-4 py-3 border-t">{row.theory}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Process gallery */}
        <div className="mb-16">
          <h2 
            className="text-2xl font-bold mb-6 text-[#1c2340] text-center"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            Process Gallery
          </h2>
          
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-video bg-gray-100 flex items-center justify-center">
                  <p className="text-gray-400">Process image {item}</p>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600">
                    {item % 2 === 0 ? 'Early wireframe sketch showing card layout and interaction points.' : 
                     'Moodboard exploring visual themes of walking, exile, and Jewish history.'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA */}
        <div 
          className="text-center"
          data-aos="fade-up"
          data-aos-delay="700"
        >
          <a 
            href="#" 
            className="inline-flex items-center px-6 py-3 bg-[#1c2340] text-white rounded-md hover:bg-[#cba95b] transition-colors"
          >
            <BookOpen size={20} className="mr-2" />
            Download Process Log (.pdf)
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;