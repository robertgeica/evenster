const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

// connect db
connectDB();

// apply middlewares
app.use(cors());
app.use(express.json({ extended: false }));

// routes
app.use('/auth', require('./routes/api/auth'));
app.use('/register', require('./routes/api/register'));
// app.use('/pub', require('./routes/api/pub'));
app.use('/post', require('./routes/api/post'));


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});