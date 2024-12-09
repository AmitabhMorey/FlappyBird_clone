export interface Bird {
  y: number;
  velocity: number;
}

export interface Pipe {
  x: number;
  topHeight: number;
  bottomHeight: number;
  passed: boolean;
}

export interface GameState {
  isPlaying: boolean;
  score: number;
  highScore: number;
  speed: number;
  level: number;
}