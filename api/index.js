import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bookRoutes from './routes/books.js'; // Import routes for handling book operations

const app = express();


dotenv.config();

// Connect to MongoDB database
mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Middleware to parse JSON request bodies
app.use(express.json());

// Basic route to check if server is running
app.get("/", (req, res) => {
  res.send("hello");
});

// Use routes defined in bookRoutes for /api/books endpoint
app.use("/api/books", bookRoutes);

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
