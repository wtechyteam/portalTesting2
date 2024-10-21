const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authenticate = require ('./middlewares/authenticate')
const {submitSelfAppraisal} = require('./controllers/appraisalController')

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/protected-route", authenticate, submitSelfAppraisal);


// Import routes
const appraisalRoutes = require('./routes/appraisalRoutes');
const userRoutes = require('./routes/userRoutes');
const questionRoutes = require('./routes/questionroutes')
const events = require('events');
events.EventEmitter.defaultMaxListeners = 20;

// Use routes
app.use('/api/appraisals', appraisalRoutes);
app.use('/api/users', userRoutes);
app.use('/api/questions', questionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});