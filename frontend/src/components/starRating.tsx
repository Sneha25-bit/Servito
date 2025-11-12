import React, { useState } from 'react';
import { Star } from 'lucide-react';

export default function StarRating() {
  const [rating, setRating] = useState(3);
  const [hover, setHover] = useState(0);

  const handleClick = (index) => {
    setRating(index + 1);
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#ffffffff'
  };

  const starsStyle = {
    display: 'flex',
    gap: '8px'
  };

  return (
    <div style={containerStyle}>
      <div style={starsStyle}>
        {[0, 1, 2, 3, 4].map((index) => {
          const isFilled = index < (hover || rating);
          return (
            <Star
              key={index}
              size={40}
              style={{ cursor: 'pointer', transition: 'all 0.2s' }}
              fill={isFilled ? '#fbbf24' : 'none'}
              stroke={isFilled ? '#fbbf24' : '#d1d5db'}
              strokeWidth={2}
              onClick={() => handleClick(index)}
              onMouseEnter={() => setHover(index + 1)}
              onMouseLeave={() => setHover(0)}
            />
          );
        })}
      </div>
 </div>
);
}