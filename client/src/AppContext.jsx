import React, { useState, useEffect, useMemo, createContext } from 'react';

// need to finish deciding on states. need to import
export const UserContext = createContext();
export function AppContextProvider({ children }) {
  const [user, setUser] = useState('');
  const [allSplits, setAllSplits] = useState([]);
  const [allExercises, setAllExercises] = useState([]);
  const [currentExercise, setCurrentExercise] = useState('');
  const [currentSplit, setCurrentSplit] = useState('');
  // const contextObj = {user: user, splits: allSplits, exercises: allExercises};

  const userInfo = useMemo(() => ({
    username: [user, setUser],
    splits: [allSplits, setAllSplits],
    exercises: [allExercises, setAllExercises],
    single_exercise: [currentExercise, setCurrentExercise],
    single_split: [currentSplit, setCurrentSplit],
  }), [user, allSplits, allExercises, currentExercise, currentSplit]);
  return (
    <UserContext.Provider value={userInfo}>
      {children}
    </UserContext.Provider>
  );
}
