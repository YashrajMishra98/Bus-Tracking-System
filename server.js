import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import cors from 'cors';
//import busRoutes from './routes/bus.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true 
}));
connectDB();

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});

app.use('/auth', authRoutes);
