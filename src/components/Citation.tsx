import React from 'react';

interface CitationProps {
  sourceId: string;
}

const Citation: React.FC<CitationProps> = ({ sourceId }) => {
  return (
    <a 
      href={`/works#${sourceId}`} 
      className="inline-block text-[#cba95b] hover:text-[#d9564d] transition-colors"
      aria-label={`Citation for ${sourceId}`}
    >
      <span className="text-xs">↗︎</span>
    </a>
  );
};

export default Citation;