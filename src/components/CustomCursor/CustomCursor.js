import React, { useState, useEffect, useRef } from 'react';
import { Box, keyframes } from '@mui/material';

// Keyframes for the sparkling effect
const sparkle = keyframes`
  0% { opacity: 0.3; transform: scale(0.5) rotate(0deg); }
  50% { opacity: 0.8; transform: scale(1.1) rotate(10deg); }
  100% { opacity: 0.3; transform: scale(0.5) rotate(0deg); }
`;

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const cursorRef = useRef(null);
  const sparkleRefs = useRef(Array(5).fill().map(() => React.createRef()));

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over interactive elements
      const target = e.target;
      const isInteractive = target.closest('a, button, [role="button"], [onclick], [data-cursor-hover]');
      setIsHovered(!!isInteractive);

      // Trigger sparkle effect
      if (isInteractive) {
        sparkleRefs.current.forEach(ref => {
          if (ref.current) {
            ref.current.style.animation = 'none';
            void ref.current.offsetHeight; // Trigger reflow
            ref.current.style.animation = `${sparkle} 0.8s ease-in-out forwards`;
          }
        });
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  // Generate random positions for sparkles
  const getRandomPosition = () => (Math.random() * 40) - 20;

  return (
    <Box
      ref={cursorRef}
      sx={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: isHovered ? '40px' : '30px',
        height: isHovered ? '40px' : '30px',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: `translate(${position.x - (isHovered ? 20 : 15)}px, ${position.y - (isHovered ? 20 : 15)}px)`,
        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        filter: 'drop-shadow(0 0 6px rgba(100, 181, 246, 0.6))',
      }}
    >
      {/* Main Crystal */}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(30, 136, 229, 0.6), rgba(13, 71, 161, 0.8))',
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          transform: 'rotate(180deg)',
          border: '1px solid rgba(187, 222, 251, 0.8)',
          borderRadius: '30% 30% 50% 50%',
          transition: 'all 0.3s ease',
          '&:after': {
            content: '""',
            position: 'absolute',
            top: '10%',
            left: '10%',
            right: '10%',
            bottom: '10%',
            background: 'linear-gradient(135deg, rgba(144, 202, 249, 0.6), rgba(30, 136, 229, 0.3))',
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            transform: 'rotate(180deg)',
            borderRadius: '20% 20% 40% 40%',
          }
        }}
      />
      
      {/* Sparkles */}
      {Array(5).fill().map((_, i) => (
        <Box
          key={i}
          ref={sparkleRefs.current[i]}
          sx={{
            position: 'absolute',
            width: '6px',
            height: '6px',
            background: 'radial-gradient(circle, #bbdefb 0%, #64b5f6 100%)',
            borderRadius: '50%',
            opacity: 0,
            left: `${50 + getRandomPosition()}%`,
            top: `${50 + getRandomPosition()}%`,
            filter: 'blur(0.5px)',
            transform: 'scale(0.5)',
          }}
        />
      ))}
      
      {/* Inner glow */}
      <Box
        sx={{
          position: 'absolute',
          width: '60%',
          height: '60%',
          background: 'radial-gradient(circle, rgba(187, 222, 251, 0.4) 0%, rgba(100, 181, 246, 0) 70%)',
          top: '20%',
          left: '20%',
          borderRadius: '50%',
          opacity: isHovered ? 1 : 0.5,
          transition: 'opacity 0.3s ease',
        }}
      />
    </Box>
  );
};

export default CustomCursor;
