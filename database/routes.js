const express = require("express");
const {
  signUpUser, loginUser, getInfo, submitSplit
} = require('./controllers')

const router = express.Router();

router.post('/submitUser', signUpUser);

router.post('/login', loginUser);

router.post('/getInfo', getInfo);

router.post('/newsplit', submitSplit);

module.exports = router;