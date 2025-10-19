import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/puzzle.css';

interface MotDePasseProps {
  onSuccess: () => void;
}

export const MotDePasse = ({ onSuccess }: MotDePasseProps) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showStars, setShowStars] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isSafeOpen, setIsSafeOpen] = useState(false);

  const resetPuzzle = () => {
    setPassword('');
    setError('');
    setIsSuccess(false);
    setIsFailed(false);
    setAttempts(0);
    setShowStars(false);
    setShowHint(false);
    setIsSafeOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSuccess || isFailed) return;

    setAttempts(prev => prev + 1);
    if (password.toLowerCase() === 'escape') {
      setIsSafeOpen(true);
      setTimeout(() => {
        setIsSuccess(true);
        setShowStars(true);
      }, 3000);
      setTimeout(() => {
        onSuccess();
      }, 4000);
    } else {
      if (attempts >= 2) {
        setIsFailed(true);
      } else {
        setError('Mot de passe incorrect. Essayez encore.');
        setPassword('');
      }
    }
  };

  const renderStars = () => {
    return Array.from({ length: 20 }).map((_, i) => (
      <motion.div
        key={i}
        className="star"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 2}s`,
        }}
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="puzzle-container"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <div className="relative z-10 p-8">
        <motion.h2 
          className="text-3xl font-bold mb-6 text-white text-center"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
        >
          Le Coffre-Fort Secret
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

          <div className="card-container relative w-full max-w-md mx-auto mb-8">
            <AnimatePresence mode="wait">
              {!isSafeOpen ? (
                <motion.div
                  key="front"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="card-front bg-gradient-to-br from-blue-900 to-purple-900 rounded-xl p-6 shadow-2xl"
                >
                  <div className="card-content text-center">
                    <h3 className="text-xl font-bold text-white mb-4">Carte Secrète</h3>
                    <div className="scratch-area relative h-32 bg-gray-800 rounded-lg overflow-hidden">
                      <div className="scratch-overlay absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-800" />
                    </div>
                    <p className="text-gray-300 mt-4">Grattez la carte pour révéler le mot de passe</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="back"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="card-back bg-gradient-to-br from-blue-900 to-purple-900 rounded-xl p-6 shadow-2xl"
                >
                  <div className="card-content text-center">
                    <h3 className="text-xl font-bold text-white mb-4">Mot de Passe</h3>
                    <div className="password-area relative h-32 bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <span className="text-3xl font-bold text-white tracking-wider">ESCAPE</span>
                      </motion.div>
                    </div>
                    <p className="text-gray-300 mt-4">Le mot de passe a été révélé !</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <p className="text-white mb-4 text-lg text-center">
            Entrez le mot de passe révélé sur la carte.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez le mot de passe..."
              className="w-full p-4 rounded-xl bg-black bg-opacity-50 text-white placeholder-gray-400 border-2 border-white border-opacity-20 focus:border-blue-500 focus:outline-none transition-colors duration-200"
              disabled={isSuccess || isFailed}
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full p-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg transition-colors duration-200"
              disabled={isSuccess || isFailed}
            >
              Valider
            </motion.button>
          </form>
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
              Tentatives : {attempts}/3
            </p>
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
                  Le mot que vous cherchez est lié à votre objectif : <b>échapper</b>.
                  <br /><br />
                  Pensez à ce que vous essayez de faire dans ce jeu...
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

        {showStars && renderStars()}
      </div>
    </motion.div>
  );
};

const _styles = `
.card-container {
  position: relative;
  min-height: 300px;
}

.scratch-area, .password-area {
  position: relative;
  overflow: hidden;
}

.scratch-overlay {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    45deg,
    #4a5568,
    #4a5568 10px,
    #2d3748 10px,
    #2d3748 20px
  );
}

.card.scratched .scratch-overlay {
  animation: scratch 1s forwards;
}

@keyframes scratch {
  0% {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
  100% {
    clip-path: polygon(0 0, 0 0, 0 0, 0 0);
  }
}
`;