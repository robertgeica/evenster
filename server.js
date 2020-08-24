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
// app.use('/auth', require('./routes/api/auth'));
// app.use('/register', require('./routes/api/register'));
// app.use('/pubs', require('./routes/api/pubs'));
// app.use('/posts', require('./routes/api/pubs'));


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});