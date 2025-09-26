// src/index.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoute from '../routes/userRoute.js';
import contactRoute from '../routes/contactRoute.js'
import { connectDB } from '../config/db.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', userRoute);
app.use('/api/viewcontacts',contactRoute);


const startServer = async () => {
  try {
    await connectDB();  

    app.listen(PORT, () => {
      console.log(`✅ Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
