import { useState, useEffect, useCallback } from 'react';
import { Bird, Pipe, GameState } from '../types/game';

const GRAVITY = 0.5;
const JUMP_FORCE = -8;
const INITIAL_PIPE_SPEED = 2;
const PIPE_WIDTH = 52;
const PIPE_GAP = 150;
const BIRD_SIZE = 30;
const SPEED_INCREMENT = 0.2;
const POINTS_PER_PIPE = 10;
const LEVEL_THRESHOLD = 50;

export const useGameLogic = () => {
  const [bird, setBird] = useState<Bird>({ y: 250, velocity: 0 });
  const [pipes, setPipes] = useState<Pipe[]>([]);
  const [gameState, setGameState] = useState<GameState>({
    isPlaying: false,
    score: 0,
    highScore: 0,
    speed: INITIAL_PIPE_SPEED,
    level: 1,
  });

  const jump = useCallback(() => {
    if (!gameState.isPlaying) {
      startGame();
    } else {
      setBird((prev) => ({ ...prev, velocity: JUMP_FORCE }));
    }
  }, [gameState.isPlaying]);

  const startGame = () => {
    setBird({ y: 250, velocity: 0 });
    setPipes([]);
    setGameState((prev) => ({
      ...prev,
      isPlaying: true,
      score: 0,
      speed: INITIAL_PIPE_SPEED,
      level: 1,
    }));
  };

  const endGame = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      isPlaying: false,
      highScore: Math.max(prev.highScore, prev.score),
    }));
  }, []);

  const updateBird = useCallback(() => {
    setBird((prev) => ({
      ...prev,
      y: prev.y + prev.velocity,
      velocity: prev.velocity + GRAVITY,
    }));
  }, []);

  const createPipe = useCallback(() => {
    const minHeight = 50;
    const maxHeight = 300;
    const topHeight = Math.random() * (maxHeight - minHeight) + minHeight;
    return {
      x: 800,
      topHeight,
      bottomHeight: 500 - topHeight - PIPE_GAP,
      passed: false,
    };
  }, []);

  const updatePipes = useCallback(() => {
    setPipes((prev) => {
      const newPipes = prev
        .map((pipe) => ({ ...pipe, x: pipe.x - gameState.speed }))
        .filter((pipe) => pipe.x > -PIPE_WIDTH);

      if (prev.length === 0 || prev[prev.length - 1].x < 600) {
        newPipes.push(createPipe());
      }

      return newPipes;
    });
  }, [createPipe, gameState.speed]);

  const checkCollision = useCallback(() => {
    const birdTop = bird.y;
    const birdBottom = bird.y + BIRD_SIZE;

    // Check if bird hits the ground or ceiling
    if (birdTop < 0 || birdBottom > 500) {
      return true;
    }

    // Check collision with pipes
    return pipes.some((pipe) => {
      if (pipe.x > 400 + BIRD_SIZE || pipe.x + PIPE_WIDTH < 400) return false;
      
      return (
        birdTop < pipe.topHeight ||
        birdBottom > 500 - pipe.bottomHeight
      );
    });
  }, [bird.y, pipes]);

  const updateScore = useCallback(() => {
    setPipes((prev) => {
      let scoreIncreased = false;
      const updatedPipes = prev.map((pipe) => {
        if (!pipe.passed && pipe.x + PIPE_WIDTH < 400) {
          scoreIncreased = true;
          return { ...pipe, passed: true };
        }
        return pipe;
      });

      if (scoreIncreased) {
        setGameState((prev) => {
          const newScore = prev.score + POINTS_PER_PIPE;
          const newLevel = Math.floor(newScore / LEVEL_THRESHOLD) + 1;
          const newSpeed = INITIAL_PIPE_SPEED + (newLevel - 1) * SPEED_INCREMENT;

          return {
            ...prev,
            score: newScore,
            level: newLevel,
            speed: newSpeed,
          };
        });
      }

      return updatedPipes;
    });
  }, []);

  useEffect(() => {
    if (!gameState.isPlaying) return;

    const gameLoop = setInterval(() => {
      updateBird();
      updatePipes();
      updateScore();
      
      if (checkCollision()) {
        endGame();
      }
    }, 20);

    return () => clearInterval(gameLoop);
  }, [gameState.isPlaying, updateBird, updatePipes, updateScore, checkCollision, endGame]);

  return { bird, pipes, gameState, jump };
};