import React from 'react';

const SynthwaveGrid = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-[#01011c] to-black"/>
      
      {/* Perspective container */}
      <div 
        className="absolute inset-0"
        style={{
          perspective: '500px',
          perspectiveOrigin: '50% 50%'
        }}
      >
        {/* Grid container */}
        <div 
          className="absolute w-full h-[200%] animate-grid-scroll"
          style={{
            top: '-100%',
            backgroundImage: `
              linear-gradient(to right, rgba(80, 200, 255, 0.3) 2px, transparent 2px),
              linear-gradient(to bottom, rgba(80, 200, 255, 0.3) 2px, transparent 2px)
            `,
            backgroundSize: '50px 50px', 
            transform: 'rotateX(45deg)',
            transformOrigin: '50% 50%',
          }}
        />
      </div>
    </div>
  );
};

export default SynthwaveGrid;