import React from 'react';
import { GameState } from '../types/game';

interface GameOverlayProps {
  gameState: GameState;
}

export const GameOverlay: React.FC<GameOverlayProps> = ({ gameState }) => {
  if (gameState.isPlaying) {
    return (
      <div className="absolute top-4 left-4 text-white text-2xl font-bold flex flex-col gap-2">
        <div>Score: {gameState.score}</div>
        <div>Level: {gameState.level}</div>
        <div className="text-sm">Speed: {gameState.speed.toFixed(1)}x</div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg text-center">
        <h1 className="text-4xl font-bold mb-4">Flappy Bird</h1>
        <p className="text-xl mb-2">Score: {gameState.score}</p>
        <p className="text-xl mb-2">Level: {gameState.level}</p>
        <p className="text-xl mb-4">High Score: {gameState.highScore}</p>
        <p className="text-gray-600">Click or press space to {gameState.score === 0 ? 'start' : 'restart'}</p>
      </div>
    </div>
  );
};