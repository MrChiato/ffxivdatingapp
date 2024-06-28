const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/ffxivdatingapp', { useNewUrlParser: true, useUnifiedTopology: true });

const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const verifyRoutes = require('./routes/verify');
const chatRoutes = require('./routes/chats');

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes); 
app.use('/api/verify', verifyRoutes);
app.use('/api/chats', chatRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
