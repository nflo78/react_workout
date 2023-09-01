const express = require("express");
const {
  signUpUser, loginUser
} = require('./controllers')

const router = express.Router();

router.post('/submitUser', signUpUser);

router.post('/login', loginUser)

module.exports = router;