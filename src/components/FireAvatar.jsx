import React from 'react';

export default function FireAvatar() {
  return (
    <div 
      className="relative w-[120%] h-[120%] flex items-center justify-center group cursor-pointer"
      style={{
        maskImage: 'radial-gradient(ellipse at 50% 55%, black 25%, transparent 55%)',
        WebkitMaskImage: 'radial-gradient(ellipse at 50% 55%, black 25%, transparent 55%)'
      }}
    >
      
      {/* 
        LAYER 1: The Static Base Image 
        This ensures the silhouette, shoulders, and glowing eyes remain 100% perfectly still.
      */}
      <img 
        src="/Images/flame_boy2.png" 
        alt="Flame Boy Static" 
        className="absolute inset-0 w-full h-full object-cover object-center z-10"
      />

      {/* 
        LAYER 2: The Warped Flames Image 
        This is a duplicate image with a live SVG displacement map applied.
        A radial mask ensures the warp ONLY applies to the flames at the top/edges,
        keeping the face and eyes completely untouched!
      */}
      <img 
        src="/Images/flame_boy2.png" 
        alt="Flame Boy Live Flames" 
        className="absolute inset-0 w-full h-full object-cover object-center z-20 mix-blend-lighten pointer-events-none"
        style={{ 
          filter: 'url(#flame-warp) brightness(1.1)',
          // Mask out the face and body (bottom center) so they don't warp
          maskImage: 'radial-gradient(circle at 50% 65%, transparent 0%, transparent 25%, black 45%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 65%, transparent 0%, transparent 25%, black 45%)'
        }}
      />

      {/* SVG Filter for Fluid Fire Physics (Displacement Map) */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <filter id="flame-warp" x="-20%" y="-20%" width="140%" height="140%">
          {/* Fractal Noise creates the fiery, organic texture map */}
          <feTurbulence type="fractalNoise" baseFrequency="0.015 0.06" numOctaves="3" result="noise">
            {/* Animating the noise frequency creates the curling/swaying effect */}
            <animate 
              attributeName="baseFrequency" 
              values="0.015 0.06; 0.025 0.09; 0.015 0.06" 
              dur="4s" 
              repeatCount="indefinite" 
            />
          </feTurbulence>
          {/* Displacement map applies the noise to warp the image pixels */}
          <feDisplacementMap 
            in="SourceGraphic" 
            in2="noise" 
            scale="20" 
            xChannelSelector="R" 
            yChannelSelector="G" 
          />
        </filter>
      </svg>

    </div>
  );
}
