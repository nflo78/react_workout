const express = require("express");
const {
  signUpUser, loginUser, fetchInfo, submitSplit, newExercise, submitExercise, splitExercise,
} = require('./controllers')

const router = express.Router();

const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

router.post('/submitUser', asyncHandler(signUpUser));

router.post('/login', asyncHandler(loginUser));

router.post('/fetchinfo', asyncHandler(fetchInfo));

router.post('/newsplit', asyncHandler(submitSplit));

router.post('/newexercise', asyncHandler(newExercise));

router.post('/splitexercises', asyncHandler(splitExercise));

router.post('/submitexercise', asyncHandler(submitExercise));

module.exports = router;
