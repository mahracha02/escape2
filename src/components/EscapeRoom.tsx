import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CodeSecret } from './puzzles/CodeSecret';
import { MotDePasse } from './puzzles/MotDePasse';
import { Labyrinthe } from './puzzles/Labyrinthe';
import '../styles/puzzle.css';

type PuzzleState = 'locked' | 'active' | 'completed';

interface Puzzle {
  id: string;
  title: string;
  state: PuzzleState;
  component: React.ReactNode;
}

export const EscapeRoom = () => {
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    // Créer des particules aléatoires
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setParticles(newParticles);
  }, []);

  const [puzzles, setPuzzles] = useState<Puzzle[]>([
    {
      id: 'code-secret',
      title: 'Le Coffre-Fort',
      state: 'active',
      component: <CodeSecret onSuccess={() => handlePuzzleSuccess(0)} />
    },
    {
      id: 'mot-de-passe',
      title: 'Le Mot Caché',
      state: 'locked',
      component: <MotDePasse onSuccess={() => handlePuzzleSuccess(1)} />
    },
    {
      id: 'labyrinthe',
      title: 'L\'Ordre des Couleurs',
      state: 'locked',
      component: <Labyrinthe onSuccess={() => handlePuzzleSuccess(2)} />
    }
  ]);

  const handlePuzzleSuccess = (index: number) => {
    setPuzzles(prevPuzzles => {
      const newPuzzles = [...prevPuzzles];
      newPuzzles[index].state = 'completed';
      if (index < newPuzzles.length - 1) {
        newPuzzles[index + 1].state = 'active';
        setCurrentPuzzleIndex(index + 1);
      }
      return newPuzzles;
    });
  };

  const getPuzzleStateClass = (state: PuzzleState) => {
    switch (state) {
      case 'completed':
        return 'bg-green-500 shadow-lg shadow-green-500/50';
      case 'active':
        return 'bg-blue-500 shadow-lg shadow-blue-500/50';
      case 'locked':
        return 'bg-gray-500';
    }
  };

  const renderConfetti = () => {
    return Array.from({ length: 50 }).map((_, i) => (
      <motion.div
        key={i}
        className="confetti"
        style={{
          left: `${Math.random() * 100}%`,
          background: `hsl(${Math.random() * 360}, 100%, 50%)`,
          animationDelay: `${Math.random() * 2}s`,
        }}
      />
    ));
  };

  return (
    <div className="escape-room-content">
      {/* Particules de fond */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center"
      >
        <motion.h1 
          className="text-3xl md:text-4xl font-bold text-center mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
        >
          Escape The Web
        </motion.h1>

        <div className="mb-4 md:mb-6">
          <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-center text-blue-300">Progression</h2>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {puzzles.map((puzzle, index) => (
              <motion.div 
                key={puzzle.id} 
                className="flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
              >
                <div
                  className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center ${getPuzzleStateClass(
                    puzzle.state
                  )} transition-all duration-300 text-base md:text-lg font-bold`}
                >
                  {index + 1}
                </div>
                <span className="mt-1 md:mt-2 text-xs md:text-sm text-center text-gray-300">{puzzle.title}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="w-full flex-1 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPuzzleIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full"
            >
              {puzzles[currentPuzzleIndex].component}
            </motion.div>
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {puzzles.every(puzzle => puzzle.state === 'completed') && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="success-overlay"
            >
              {renderConfetti()}
              <div className="success-container">
                <div className="success-ring" />
                <div className="success-shine" />
                <h2 className="success-title">Félicitations !</h2>
                <p className="success-message">
                  Vous avez réussi à résoudre toutes les énigmes et à vous échapper !
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="success-button"
                  onClick={() => window.location.reload()}
                >
                  Rejouer
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}; 