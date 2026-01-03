const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ status: 'OK', msg: 'Vercel function alive ✅' });
});

module.exports = app;
