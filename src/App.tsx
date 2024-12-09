import React, { useEffect } from 'react';
import { Bird } from './components/Bird';
import { Pipe } from './components/Pipe';
import { GameOverlay } from './components/GameOverlay';
import { useGameLogic } from './hooks/useGameLogic';

function App() {
  const { bird, pipes, gameState, jump } = useGameLogic();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        jump();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [jump]);

  return (
    <div 
      className="relative w-[800px] h-[500px] mx-auto my-8 bg-sky-300 overflow-hidden cursor-pointer"
      onClick={jump}
    >
      <Bird y={bird.y} />
      {pipes.map((pipe, index) => (
        <Pipe key={index} {...pipe} />
      ))}
      <div className="absolute bottom-0 w-full h-20 bg-green-600" />
      <GameOverlay gameState={gameState} />
    </div>
  );
}

export default App;