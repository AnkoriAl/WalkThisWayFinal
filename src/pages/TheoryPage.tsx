import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { theorySections } from '../data/theory';
import Citation from '../components/Citation';

const TheoryPage: React.FC = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('exile');
  
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && theorySections.some(section => section.id === hash)) {
      setActiveSection(hash);
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = theorySections.map(section => document.getElementById(section.id));
      const scrollPosition = window.scrollY + 200;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(theorySections[i].id);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#f6f0e6]">
      <div className="max-w-[1440px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left sidebar with anchor navigation */}
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-24">
              <nav className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-6 text-[#1c2340]">Theory</h2>
                <ul className="space-y-4">
                  {theorySections.map(section => (
                    <li key={section.id}>
                      <a 
                        href={`#${section.id}`}
                        className={`flex items-center transition-colors ${
                          activeSection === section.id ? 'text-[#cba95b]' : 'text-[#1c2340] hover:text-[#cba95b]'
                        }`}
                      >
                        <span 
                          className={`w-2 h-2 rounded-full mr-3 ${
                            activeSection === section.id ? 'bg-[#cba95b]' : 'bg-gray-300'
                          }`}
                        ></span>
                        <span className="text-sm md:text-base">{section.title.split(':')[0]}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-9">
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[#1c2340]">
                Theoretical Framework
              </h1>
              
              <div className="prose max-w-none prose-headings:text-[#1c2340] prose-a:text-[#cba95b] prose-a:no-underline hover:prose-a:text-[#d9564d]">
                {theorySections.map((section, index) => (
                  <section 
                    key={section.id} 
                    id={section.id}
                    className={`mb-16 ${index > 0 ? 'pt-8 border-t border-gray-200' : ''}`}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">{section.title}</h2>
                    
                    {section.content.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="mb-4">
                        {paragraph.includes('Solnit writes') && (
                          <>
                            {paragraph.split('Solnit writes')[0]}
                            Solnit writes <Citation sourceId="solnit" />
                            {paragraph.split('Solnit writes')[1]}
                          </>
                        )}
                        {!paragraph.includes('Solnit writes') && paragraph.includes('de Certeau says') && (
                          <>
                            {paragraph.split('de Certeau says')[0]}
                            de Certeau says <Citation sourceId="decerteau" />
                            {paragraph.split('de Certeau says')[1]}
                          </>
                        )}
                        {!paragraph.includes('Solnit writes') && !paragraph.includes('de Certeau says') && paragraph}
                      </p>
                    ))}
                    
                    {index === 1 && (
                      <div className="my-12 aspect-video w-full overflow-hidden rounded-lg">
                        <img 
                          src="https://images.pexels.com/photos/6992/forest-trees-northwestisbest-exploress.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
                          alt="Debord's Naked City psychogeographic map" 
                          className="w-full h-full object-cover"
                        />
                        <p className="text-sm text-gray-500 mt-2">Visual representation of Debord's Naked City concept</p>
                      </div>
                    )}
                    
                    {index === 2 && (
                      <div className="my-12 aspect-video w-full overflow-hidden rounded-lg">
                        <img 
                          src="https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
                          alt="View from World Trade Center, similar to de Certeau's vantage point" 
                          className="w-full h-full object-cover"
                        />
                        <p className="text-sm text-gray-500 mt-2">City view reminiscent of de Certeau's perspective from the World Trade Center</p>
                      </div>
                    )}
                  </section>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheoryPage;