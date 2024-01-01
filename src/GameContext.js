// GameContext.js

import { createContext, useContext, useReducer, useEffect } from 'react';

const GameContext = createContext();

const initialState = {
  timer: 8,
  userAmount: 0,
  results: [],
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TIMER':
      return { ...state, timer: action.payload };
    case 'UPDATE_USER_AMOUNT':
      return { ...state, userAmount: action.payload };
    case 'UPDATE_RESULTS':
      return { ...state, results: [...state.results, action.payload] };
    case 'CALCULATE_RESULT':
      // Add logic to calculate the result
      // For example, you can trigger the calculation when the timer reaches 0
      return state;
    default:
      return state;
  }
};

const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Set up and update timer
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch({ type: 'UPDATE_TIMER', payload: state.timer > 0 ? state.timer - 1 : 0 });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [state.timer]);

  useEffect(() => {
    localStorage.setItem('gameState', JSON.stringify(state));
  }, [state]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export { GameProvider, useGame };
