const express = require("express");
const {
  signUpUser
} = require('./controllers')

const router = express.Router();

router.post('/submitUser', signUpUser);

module.exports = router;