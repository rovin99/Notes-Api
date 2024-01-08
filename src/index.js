const express = require('express');
const rateLimit = require('express-rate-limit');
const { ServerConfig, Logger } = require('./config');
const connect = require('./config/db');

const apiRoutes = require('./routes');
const app = express();
const cors = require('cors');
const corsOrigin = "*";


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, 
});

app.use(cors({
  origin: corsOrigin,
  allowedHeaders: '*',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply the rate limiter to all requests
app.use(limiter);

app.use('/api', apiRoutes);

const startServer = async () => {
  try {
    await connect();
    console.log(`MongoDB connected`);
    
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port: ${process.env.PORT}`);
    });
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
  }
};

startServer();
