import React, { useState, useEffect, useMemo, createContext } from 'react';

// need to finish deciding on states. need to import
export const UserContext = createContext();
export function AppContextProvider({ children }) {
  const [user, setUser] = useState('');
  const [userId, setUserId] = useState(null);
  const [auth, setAuth] = useState(null);
  const [allSplits, setAllSplits] = useState([]);
  const [allExercises, setAllExercises] = useState([]);
  const [lastWorkout, setLastWorkout] = useState(null);
  const [currentExercise, setCurrentExercise] = useState('');
  const [currentSplit, setCurrentSplit] = useState('');

  const userInfo = useMemo(() => ({
    username: [user, setUser],
    id: [userId, setUserId],
    authenticated: [auth, setAuth],
    splits: [allSplits, setAllSplits],
    exercises: [allExercises, setAllExercises],
    workouts: [lastWorkout, setLastWorkout],
    single_exercise: [currentExercise, setCurrentExercise],
    single_split: [currentSplit, setCurrentSplit],
  }), [user, userId, auth, allSplits, allExercises, currentExercise, currentSplit]);
  return (
    <UserContext.Provider value={userInfo}>
      {children}
    </UserContext.Provider>
  );
}
