import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/puzzle.css';

interface CodeSecretProps {
  onSuccess: () => void;
}

export const CodeSecret = ({ onSuccess }: CodeSecretProps) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isSafeOpen, setIsSafeOpen] = useState(false);

  const resetPuzzle = () => {
    setCode('');
    setError('');
    setIsSuccess(false);
    setIsFailed(false);
    setAttempts(0);
    setShowHint(false);
    setIsSafeOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSuccess || isFailed) return;

    setAttempts(prev => prev + 1);
    if (code === '1337') {
      setIsSafeOpen(true);
      setTimeout(() => {
        setIsSuccess(true);
      }, 3000);
      setTimeout(() => {
        onSuccess();
      }, 5000);
    } else {
      if (attempts >= 2) {
        setIsFailed(true);
      } else {
        setError('Code incorrect. Essayez encore.');
        setCode('');
      }
    }
  };

  const handleKeyPress = (key: string) => {
    if (code.length < 4 && !isSuccess && !isFailed) {
      setCode(prev => prev + key);
    }
  };

  const handleDelete = () => {
    setCode(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    setCode('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="puzzle-container"
      style={{
        backgroundImage: 'url("/images/code-bg.jpg")',
      }}
    >
      <div className="puzzle-content">
        <motion.h2 
          className="puzzle-title"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
        >
          Le Coffre-Fort Numérique
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowHint(true)}
              className="hint-button bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg shadow-lg transition-colors duration-200"
            >
              Voir l'indice
            </motion.button>
          </div>

          <div className="safe-container">
            <div className={`safe ${isSafeOpen ? 'open' : ''}`}>
              <div className="safe-front">
                <div className="safe-glow" />
                <div className="safe-door">
                  <div className="safe-handle" />
                  <div className="safe-lock" />
                  <div className="safe-display">
                    <div className="code-display">
                      {code.split('').map((digit, index) => (
                        <div key={index} className="code-digit" data-testid={`code-digit-${digit}`}>{digit}</div>
                      ))}
                      {Array(4 - code.length).fill('').map((_, index) => (
                        <div key={`empty-${index}`} className="code-digit empty" />
                      ))}
                    </div>
                  </div>
                </div>
                {isSafeOpen && (
                  <motion.div 
                    className="safe-content"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                  >
                    <motion.div
                      className="secret-code"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5 }}
                    >
                      <span className="text-4xl font-bold text-white tracking-wider">1337</span>
                    </motion.div>
                  </motion.div>
                )}
                {isSuccess && <div className="safe-success" />}
              </div>
              <div className="safe-side" />
            </div>
          </div>

          <div className="keypad-container">
            <div className="keypad-grid">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <motion.button
                  key={num}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleKeyPress(num.toString())}
                  className="keypad-button"
                  disabled={isSuccess || isFailed}
                >
                  {num}
                </motion.button>
              ))}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClear}
                className="keypad-button clear"
                disabled={isSuccess || isFailed}
              >
                C
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleKeyPress('0')}
                className="keypad-button"
                disabled={isSuccess || isFailed}
              >
                0
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleDelete}
                className="keypad-button delete"
                disabled={isSuccess || isFailed}
              >
                ←
              </motion.button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            className="validate-button bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg transition-colors duration-200"
            disabled={isSuccess || isFailed || code.length !== 4}
          >
            Valider
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="error-message text-red-400 font-medium text-center"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <div className="attempts-counter">
          <p className="text-white">
            Tentatives : {attempts}/3
          </p>
        </div>

        <AnimatePresence>
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="success-message fixed inset-0 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20,
                  duration: 0.5 
                }}
                className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 rounded-2xl shadow-2xl text-center transform"
              >
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-white text-4xl font-bold mb-6"
                >
                  Succès !
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {isFailed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="failure-message fixed inset-0 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20,
                  duration: 0.5 
                }}
                className="bg-gradient-to-r from-red-500 to-rose-600 p-8 rounded-2xl shadow-2xl text-center transform"
              >
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-white text-4xl font-bold mb-6"
                >
                  Échec !
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "#ffffff" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-rose-600 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-200"
                    onClick={resetPuzzle}
                  >
                    Réessayer
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {showHint && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black bg-opacity-75"
              onClick={() => setShowHint(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-gradient-to-r from-yellow-500 to-amber-600 p-8 rounded-2xl shadow-2xl max-w-md mx-4 relative z-10"
                onClick={e => e.stopPropagation()}
              >
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-white text-2xl font-bold mb-4"
                >
                  Indice
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-white text-lg mb-6"
                >
                  Le code est une représentation numérique du mot "LEET".
                  <br /><br />
                  En langage "leet speak", les lettres sont remplacées par des chiffres...
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "#ffffff" }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-white text-amber-600 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-200"
                    onClick={() => setShowHint(false)}
                  >
                    Fermer
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const _styles = `
.safe {
  position: relative;
  width: 300px;
  height: 400px;
  margin: 0 auto;
  transform-style: preserve-3d;
  perspective: 1000px;
}

.safe-front {
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #2c3e50, #34495e);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  transform-style: preserve-3d;
  transition: transform 2s cubic-bezier(0.4, 0, 0.2, 1);
}

.safe.open .safe-front {
  transform: rotateY(-120deg);
  transform-origin: left;
}

.safe-door {
  position: absolute;
  inset: 20px;
  background: linear-gradient(45deg, #1a1a1a, #2c2c2c);
  border-radius: 10px;
  transform-style: preserve-3d;
}

.safe-handle {
  position: absolute;
  right: 40px;
  top: 50%;
  width: 60px;
  height: 20px;
  background: #c0392b;
  border-radius: 10px;
  transform: translateY(-50%);
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
}

.safe-lock {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 80px;
  height: 80px;
  background: #7f8c8d;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
}

.safe-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.5s;
}

.safe.open .safe-glow {
  opacity: 1;
  animation: glow 2s infinite;
}

@keyframes glow {
  0%, 100% { opacity: 0.1; }
  50% { opacity: 0.3; }
}

.safe-success {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(46,204,113,0.2) 0%, transparent 70%);
  opacity: 0;
  animation: successGlow 2s infinite;
}

@keyframes successGlow {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.4; }
}

.safe-content {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at center, rgba(46,204,113,0.1) 0%, transparent 70%);
  transform-style: preserve-3d;
  transform: translateZ(20px);
}

.secret-code {
  text-shadow: 0 0 10px rgba(46,204,113,0.5);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { 
    text-shadow: 0 0 10px rgba(46,204,113,0.5);
    transform: scale(1);
  }
  50% { 
    text-shadow: 0 0 20px rgba(46,204,113,0.8);
    transform: scale(1.05);
  }
}

.safe.open .safe-content {
  animation: reveal 2s forwards;
}

@keyframes reveal {
  0% { opacity: 0; }
  50% { opacity: 0; }
  100% { opacity: 1; }
}
`; 