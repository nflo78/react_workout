require('dotenv').config();
const path = require('path');
const axios = require('axios');
const express = require('express');
const router = require('../database/routes');

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
})
app.use(router);

//added access and refresh token
// added json web token dependency
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server available at http://localhost:${PORT}`);
});
