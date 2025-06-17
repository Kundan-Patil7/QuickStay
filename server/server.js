import express from "express";
import { clerkMiddleware } from "@clerk/express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./configs/db.js";
import clearkWebhooks from "./controllers/clerkWebhooks.js";

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(clerkMiddleware());
app.use(express.json());

// Routes
app.post("/api/clerk", clearkWebhooks); 

app.get("/", (req, res) => {
  res.send("API is working");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
