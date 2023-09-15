const express = require("express");
const {
  signUpUser, loginUser, testController
} = require('./controllers')

const router = express.Router();

router.post('/submitUser', signUpUser);

router.post('/login', loginUser)

router.get('/test', testController)
module.exports = router;