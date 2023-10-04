const express = require("express");
const {
  signUpUser, loginUser, getInfo, submitSplit, newExercise, getExercises
} = require('./controllers')

const router = express.Router();

router.post('/submitUser', signUpUser);

router.post('/login', loginUser);

router.post('/getinfo', getInfo);

// router.post('/getexercises', getExercises);

router.post('/newsplit', submitSplit);

router.post('/newexercise', newExercise);

module.exports = router;