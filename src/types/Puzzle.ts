export interface Puzzle {
  id: string;
  title: string;
  description: string;
  hint: string;
  solution: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

export interface PuzzleState {
  currentPuzzle: Puzzle | null;
  completedPuzzles: string[];
  score: number;
  hintsUsed: string[];
}

export interface PuzzleContextType {
  state: PuzzleState;
  startPuzzle: (puzzleId: string) => void;
  submitAnswer: (answer: string) => boolean;
  useHint: () => void;
  resetPuzzle: () => void;
} 