require('dotenv').config();
const path = require('path');
const axios = require('axios');
const express = require('express');
const router = require('../database/routes');

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/dist')));

app.use(router);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.use((err, req, res, next) => {
  console.log('SERVER BEFORE ERROR');
  if (err) {
    console.log('SERVER ERROR: ', err)
    return res.status(err.statusCode || 500).json(err.message);
    // return res.send(err);
  }
  next();
});
//added access and refresh token
// added json web token dependency
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server available at http://localhost:${PORT}`);
});
