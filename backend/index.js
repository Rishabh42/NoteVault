import * as dotenv from 'dotenv';
dotenv.config(); // Module to load environment varialbles from a .env file
import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import { mainRouter } from "./routes/index.js";
const app = express(); // Create express app
app.use(json()); // Middleware to parse JSON
app.use(cors({ origin: true, credentials: true })); // Middleware for Cross Origin Resource Sharing
app.use(cookieParser()); // Middleware to parse cookies 

// Connect to MongoDB database
const connectToDb = async () => await mongoose.connect(process.env.MONGO_URI);
connectToDb()
    .then(() => console.log("Database connected"))
    .catch(err => console.error(err));

const PORT = process.env.PORT || 8080;

// Import routers 
app.use('/api', mainRouter);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));