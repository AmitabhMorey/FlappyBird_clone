import React from 'react';

interface PipeProps {
  x: number;
  topHeight: number;
  bottomHeight: number;
}

export const Pipe: React.FC<PipeProps> = ({ x, topHeight, bottomHeight }) => {
  return (
    <>
      <div
        className="absolute w-[52px] bg-green-500 border-4 border-green-700"
        style={{ left: `${x}px`, height: `${topHeight}px`, top: 0 }}
      />
      <div
        className="absolute w-[52px] bg-green-500 border-4 border-green-700"
        style={{
          left: `${x}px`,
          height: `${bottomHeight}px`,
          bottom: 0,
        }}
      />
    </>
  );
};