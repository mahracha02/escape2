import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/puzzle.css';

interface LabyrintheProps {
  onSuccess: () => void;
}

const COLORS = ['indigo','jaune', 'vert', 'orange',  'rouge','violet' ,'bleu' ] as const;
const CORRECT_SEQUENCE = ['rouge', 'orange', 'jaune', 'vert', 'bleu', 'indigo', 'violet'] as const;

export const Labyrinthe = ({ onSuccess }: LabyrintheProps) => {
  const [sequence, setSequence] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const resetPuzzle = () => {
    setSequence([]);
    setError('');
    setIsSuccess(false);
    setIsFailed(false);
    setAttempts(0);
    setShowFireworks(false);
    setShowHint(false);
  };

  const handleColorClick = (color: string) => {
    if (isSuccess || isFailed) return;

    const newSequence = [...sequence, color];
    setSequence(newSequence);

    if (newSequence.length === CORRECT_SEQUENCE.length) {
      setAttempts(prev => prev + 1);
      const isCorrect = newSequence.every(
        (color, index) => color === CORRECT_SEQUENCE[index]
      );

      if (isCorrect) {
        setIsSuccess(true);
        setShowFireworks(true);
        setTimeout(() => {
          onSuccess();
        }, 2000);
      } else {
        if (attempts >= 2) {
          setIsFailed(true);
        } else {
          setError('Séquence incorrecte. Essayez encore.');
          setSequence([]);
        }
      }
    }
  };

  const getColorClass = (color: string) => {
    switch (color) {
      case 'rouge':
        return 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/50';
      case 'orange':
        return 'bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/50';
      case 'jaune':
        return 'bg-yellow-500 hover:bg-yellow-600 shadow-lg shadow-yellow-500/50';
      case 'vert':
        return 'bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/50';
      case 'bleu':
        return 'bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-500/50';
      case 'indigo':
        return 'bg-indigo-500 hover:bg-indigo-600 shadow-lg shadow-indigo-500/50';
      case 'violet':
        return 'bg-purple-500 hover:bg-purple-600 shadow-lg shadow-purple-500/50';
      default:
        return '';
    }
  };

  const renderFireworks = () => {
    return Array.from({ length: 3 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute"
        style={{
          left: `${30 + i * 20}%`,
          top: '50%',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: i * 0.2 }}
      >
        <div className="firework">
          {Array.from({ length: 8 }).map((_, j) => (
            <motion.div
              key={j}
              className="firework-particle"
              style={{
                transform: `rotate(${j * 45}deg)`,
                background: `hsl(${Math.random() * 360}, 100%, 50%)`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            />
          ))}
        </div>
      </motion.div>
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="puzzle-container"
      style={{
        background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
      }}
    >
      <div className="relative z-10 p-8">
        <motion.h2 
          className="text-3xl font-bold mb-6 text-white text-center"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
        >
          L'Ordre des Couleurs
        </motion.h2>
        
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-center mb-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowHint(true)}
              className="hint-button bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg shadow-lg transition-colors duration-200"
            >
              Voir l'indice
            </motion.button>
          </div>

          <p className="text-white mb-4 text-lg text-center">
            Appuyez sur les boutons dans l'ordre des couleurs de l'arc-en-ciel.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {COLORS.map((color) => (
              <motion.button
                key={color}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleColorClick(color)}
                className={`color-button p-4 rounded-xl text-white font-medium text-base md:text-lg shadow-lg transition-colors duration-200 ${getColorClass(color)}`}
                disabled={isSuccess || isFailed}
              >
                {color}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-red-400 text-sm font-medium text-center mb-4"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <motion.div 
          className="bg-black bg-opacity-50 p-4 rounded-lg border-2 border-white border-opacity-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex justify-between items-center">
            <p className="text-white text-sm">
              Séquence actuelle :{' '}
              <span className="font-mono text-gray-300">
                {sequence.length > 0 ? sequence.join(' → ') : 'Aucune'}
              </span>
            </p>
            <span className="text-sm text-gray-300 font-medium">
              Tentatives : {attempts}/3
            </span>
          </div>
        </motion.div>

        <AnimatePresence>
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="success-message absolute inset-0 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="text-white text-4xl font-bold text-center"
              >
                Succès !
              </motion.div>
            </motion.div>
          )}

          {isFailed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="failure-message absolute inset-0 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="text-white text-4xl font-bold text-center"
              >
                Échec !
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="game-button mt-4"
                  onClick={resetPuzzle}
                >
                  Réessayer
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {showHint && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
              onClick={() => setShowHint(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-gradient-to-br from-purple-900 to-blue-900 p-8 rounded-xl shadow-2xl max-w-md mx-4"
                onClick={e => e.stopPropagation()}
              >
                <h3 className="text-2xl font-bold text-white mb-4">Indice</h3>
                <p className="text-white text-lg mb-6">
                  L'ordre des couleurs suit celui de l'arc-en-ciel : <b>Rouge, ..., Violet.</b>
                  <br /><br />
                  Pensez à la phrase : " Richard Of York Gave Battle In Vain" pour vous souvenir de l'ordre.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowHint(false)}
                  className="w-full bg-white text-purple-900 font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  Fermer
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {showFireworks && renderFireworks()}
      </div>
    </motion.div>
  );
}; 