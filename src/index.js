const express = require('express');
const { ServerConfig, Logger } = require('./config');
const connect = require('./config/db');

const apiRoutes = require('./routes');
const app = express();
const cors = require('cors');
const corsOrigin = "*";

app.use(cors({
  origin: corsOrigin,
  allowedHeaders: '*',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
