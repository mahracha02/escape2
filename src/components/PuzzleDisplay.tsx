import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePuzzle } from '../context/PuzzleContext';

export const PuzzleDisplay: React.FC = () => {
  const { state, submitAnswer, useHint } = usePuzzle();
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.currentPuzzle) return;

    const isCorrect = submitAnswer(answer);
    setFeedback(isCorrect ? 'Correct! Well done!' : 'Try again!');
    if (isCorrect) {
      setAnswer('');
    }
  };

  if (!state.currentPuzzle) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-gray-600"
      >
        Select a puzzle to begin!
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-primary-700"
      >
        {state.currentPuzzle.title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-gray-700"
      >
        {state.currentPuzzle.description}
      </motion.p>

      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter your answer"
          className="input"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="btn-primary w-full"
        >
          Submit
        </motion.button>
      </motion.form>

      <AnimatePresence mode="wait">
        {feedback && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-4 rounded-lg font-medium ${
              feedback.includes('Correct')
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {feedback}
          </motion.p>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={useHint}
        disabled={state.hintsUsed.includes(state.currentPuzzle.id)}
        className={`btn-secondary w-full ${
          state.hintsUsed.includes(state.currentPuzzle.id)
            ? 'opacity-50 cursor-not-allowed'
            : ''
        }`}
      >
        {state.hintsUsed.includes(state.currentPuzzle.id)
          ? 'Hint Used'
          : 'Get Hint'}
      </motion.button>

      <AnimatePresence>
        {state.hintsUsed.includes(state.currentPuzzle.id) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
          >
            <p className="text-yellow-800">{state.currentPuzzle.hint}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}; 