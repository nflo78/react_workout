require('dotenv').config();
const path = require('path');
const axios = require('axios');
const express = require('express');

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/dist')));

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/dist/index.html'));
// })


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server available at http://localhost:${PORT}`);
});
