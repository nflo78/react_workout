const express = require("express");
const {
  signUpUser, loginUser, testController, submitSplit
} = require('./controllers')

const router = express.Router();

router.post('/submitUser', signUpUser);

router.post('/login', loginUser)

// router.get('/test', testController)

router.post('/newsplit', submitSplit);
module.exports = router;