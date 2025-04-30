import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { cards } from '../data/cards';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CardCarousel: React.FC = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const playFootstepSound = () => {
    // In a real implementation, this would play a short footstep sound
    console.log('Footstep sound played');
  };

  const handlePrev = () => {
    setActiveCard((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveCard((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  useEffect(() => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.scrollWidth / cards.length;
      carouselRef.current.scrollTo({
        left: activeCard * cardWidth,
        behavior: 'smooth'
      });
    }
  }, [activeCard]);

  return (
    <div className="relative w-full overflow-hidden py-10">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-50">
        <button 
          onClick={handlePrev}
          className="p-2 bg-[#1c2340] bg-opacity-50 text-white rounded-r-lg hover:bg-opacity-70 transition-all"
          aria-label="Previous card"
        >
          <ChevronLeft size={24} />
        </button>
      </div>
      
      <div 
        ref={carouselRef}
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {cards.map((card, index) => (
          <div 
            key={card.slug} 
            className="min-w-full md:min-w-[50%] lg:min-w-[33.333%] px-4 snap-center"
          >
            <Link 
              to={`/card/${card.slug}`}
              className="block h-80 relative overflow-hidden rounded-lg shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              onMouseEnter={playFootstepSound}
              onFocus={playFootstepSound}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-20 transition-opacity duration-300 hover:opacity-30"
                style={{ backgroundImage: `url(${card.visualHook})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c2340] to-transparent" />
              <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                <h3 className="text-2xl font-semibold mb-2">{card.title}</h3>
                <p className="text-sm opacity-80 line-clamp-2">
                  {card.diaryText.substring(0, 100)}...
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-50">
        <button 
          onClick={handleNext}
          className="p-2 bg-[#1c2340] bg-opacity-50 text-white rounded-l-lg hover:bg-opacity-70 transition-all"
          aria-label="Next card"
        >
          <ChevronRight size={24} />
        </button>
      </div>
      
      <div className="flex justify-center mt-6 space-x-2">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveCard(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              activeCard === index ? 'bg-[#cba95b]' : 'bg-gray-300'
            }`}
            aria-label={`Go to card ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CardCarousel;