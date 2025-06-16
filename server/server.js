import express from "express";

import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./configs/db.js";


connectDB();

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("API is working");
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});