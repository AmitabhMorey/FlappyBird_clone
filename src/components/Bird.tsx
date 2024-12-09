import React from 'react';

interface BirdProps {
  y: number;
}

export const Bird: React.FC<BirdProps> = ({ y }) => {
  return (
    <div
      className="absolute w-8 h-8 left-[400px] bg-yellow-400 rounded-full"
      style={{ top: `${y}px` }}
    >
      <div className="absolute w-2 h-2 bg-white rounded-full top-2 left-2" />
      <div className="absolute w-1 h-4 bg-orange-600 -right-1 top-2 rounded" />
    </div>
  );
};