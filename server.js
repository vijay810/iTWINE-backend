require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

app.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URL);
    }
    res.json({ local: 'server running', mongo: 'connected' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Local server running on port ${PORT}`);
});
app.use('/auth', require('./routes/auth.routes'));
app.use('/leave', require('./routes/leave.routes'));
app.use('/clients', require('./routes/clients.routes'));
app.use('/user', require('./routes/user.routes'));
app.use('/news', require('./routes/news.routes'));