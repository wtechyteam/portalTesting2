const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const appraisalRoutes = require('./routes/appraisalRoutes');
const userRoutes = require('./routes/userRoutes');

// Use routes
app.use('/api/appraisals', appraisalRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});