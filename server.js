import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import fibonacciRoutes from './routes/fibonacciRoutes.js';
import { setupWebSocket } from './controllers/websocketController.js';
import { createServer } from 'http';

const app = express();
const server = createServer(app);

setupWebSocket(server);

const connectDB = async () => {
  try {
    await mongoose.connect('////put', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
};

connectDB();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/fibonacci', fibonacciRoutes);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
