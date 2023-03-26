import * as dotenv from 'dotenv'
dotenv.config()
import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { mainRouter } from "./routes/index.js";
const app = express(); //Create express app
app.use(json()); //Middleware to parse JSON
app.use(cors())

//Connect to MongoDB database
const uri = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PWD}@${process.env.MONGO_URI}/${process.env.DB_NAME}?authMechanism=DEFAULT&authSource=${process.env.DB_NAME}`;
const connectToDb = async () => await mongoose.connect(uri);
connectToDb()
    .then(() => console.log("Database connected"))
    .catch(err => console.error(err));

const PORT = process.env.PORT || 8080;

//Import routers 
app.use('/api', mainRouter);

app.get('/', (req, res) => {
    res.send("Note taking app");
})

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));