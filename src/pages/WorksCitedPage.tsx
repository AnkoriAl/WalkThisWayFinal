import React from 'react';
import Citation from '../components/Citation';

const WorksCitedPage: React.FC = () => {
  const primarySources = [
    {
      id: 'bunyan',
      citation: "Bunyan, John. The Pilgrim's Progress. 1678."
    },
    {
      id: 'torah',
      citation: "Torah. Genesis 12:1, Exodus 14."
    },
    {
      id: 'king',
      citation: "King, Martin Luther Jr. 'Letter from Birmingham Jail.' 1963."
    }
  ];
  
  const secondarySources = [
    {
      id: 'solnit',
      citation: "Solnit, Rebecca. Wanderlust: A History of Walking. Penguin, 2000.",
      link: "#"
    },
    {
      id: 'debord',
      citation: "Debord, Guy. 'Theory of the Dérive.' Situationist International Anthology, 1958.",
      link: "#"
    },
    {
      id: 'decerteau',
      citation: "de Certeau, Michel. The Practice of Everyday Life. University of California Press, 1984.",
      link: "#"
    },
    {
      id: 'benjamin',
      citation: "Benjamin, Walter. The Arcades Project. Harvard University Press, 1999."
    },
    {
      id: 'elkin',
      citation: "Elkin, Lauren. Flâneuse: Women Walk the City. Farrar, Straus and Giroux, 2017."
    }
  ];
  
  const mediaAssets = [
    {
      id: 'caillebotte',
      citation: "Caillebotte, Gustave. Paris Street, Rainy Day. 1877. Art Institute of Chicago.",
      type: "Painting"
    },
    {
      id: 'nakedcity',
      citation: "Debord, Guy. The Naked City. 1957. Psychogeographic map.",
      type: "Map"
    },
    {
      id: 'ambient',
      citation: "Field Recording: Selma Bridge Crossing. Archive.org, Public Domain.",
      type: "Audio"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f6f0e6]">
      <div className="max-w-[1440px] mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-8 text-[#1c2340]">Works Cited</h1>
          
          <div className="space-y-12">
            <section id="primary" data-aos="fade-up">
              <h2 className="text-2xl font-semibold mb-4 text-[#1c2340] border-b border-gray-200 pb-2">
                1. Primary Sources
              </h2>
              <ul className="space-y-4 pl-6">
                {primarySources.map(source => (
                  <li key={source.id} id={source.id} className="relative">
                    <div className="absolute -left-6 top-1.5 w-2 h-2 rounded-full bg-[#cba95b]"></div>
                    <p className="text-[#1c2340]">{source.citation}</p>
                  </li>
                ))}
              </ul>
            </section>
            
            <section id="secondary" data-aos="fade-up" data-aos-delay="200">
              <h2 className="text-2xl font-semibold mb-4 text-[#1c2340] border-b border-gray-200 pb-2">
                2. Theory & Secondary Sources
              </h2>
              <ul className="space-y-4 pl-6">
                {secondarySources.map(source => (
                  <li key={source.id} id={source.id} className="relative">
                    <div className="absolute -left-6 top-1.5 w-2 h-2 rounded-full bg-[#cba95b]"></div>
                    <p className="text-[#1c2340]">
                      {source.citation}
                      {source.link && (
                        <a 
                          href={source.link} 
                          className="ml-2 text-[#cba95b] hover:text-[#d9564d] transition-colors"
                        >
                          [PDF ↗︎]
                        </a>
                      )}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
            
            <section id="media" data-aos="fade-up" data-aos-delay="400">
              <h2 className="text-2xl font-semibold mb-4 text-[#1c2340] border-b border-gray-200 pb-2">
                3. Media Assets
              </h2>
              <ul className="space-y-4 pl-6">
                {mediaAssets.map(asset => (
                  <li key={asset.id} id={asset.id} className="relative">
                    <div className="absolute -left-6 top-1.5 w-2 h-2 rounded-full bg-[#cba95b]"></div>
                    <p className="text-[#1c2340]">
                      <span className="text-[#d9564d]">[{asset.type}]</span> {asset.citation}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Citations follow MLA 9th edition format. All source materials used in this project are either in the public domain or cited under fair use for educational purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorksCitedPage;