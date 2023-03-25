import express, { json } from "express";
import mongoose from "mongoose";
import auth from "./routes/auth"
const app = express(); //Create express app
app.use(json()); //Middleware to parse JSON

//Connect to MongoDB database
connectToDb()
    .then(() => console.log("Database connected"))
    .catch(err => console.error(err));
const connectToDb = async () => await mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PWD}@${process.env.MONGO_URI}/${process.env.DB_NAME}`);

const PORT = process.env.PORT || 8080;

//Import routers 
app.use('/auth', auth);

app.get('/', (req, res) => {
    res.send("Note taking app");
})

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));