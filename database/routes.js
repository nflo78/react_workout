const express = require("express");
const {
  signUpUser, loginUser, getInfo, submitSplit, newExercise
} = require('./controllers')

const router = express.Router();

router.post('/submitUser', signUpUser);

router.post('/login', loginUser);

router.post('/getInfo', getInfo);

router.post('/newsplit', submitSplit);

router.post('/newexercise', newExercise);

module.exports = router;