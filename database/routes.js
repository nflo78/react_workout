const express = require('express');
const {
  signUpUser, loginUser, authenticateUser,
  fetchInfo, submitSplit, newExercise, submitExercise,
  splitExercise, fetchSession, startSession, stopSession, recentWorkout,
} = require('./controllers');

const router = express.Router();

const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

router.post('/submitUser', asyncHandler(signUpUser));

router.post('/login', asyncHandler(loginUser));

router.post('/authenticateuser', asyncHandler(authenticateUser));

router.post('/fetchinfo', asyncHandler(fetchInfo));

router.post('/newsplit', asyncHandler(submitSplit));

router.post('/newexercise', asyncHandler(newExercise));

router.post('/splitexercises', asyncHandler(splitExercise));

router.post('/getsession', asyncHandler(fetchSession));

router.post('/startsession', asyncHandler(startSession));

router.post('/stopsession', asyncHandler(stopSession));

router.post('/submitexercise', asyncHandler(submitExercise));

router.post('/recentworkout', asyncHandler(recentWorkout));

module.exports = router;
