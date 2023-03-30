import * as dotenv from 'dotenv';
dotenv.config()
import express from "express";
import mongoose from 'mongoose';
import { Note } from '../../models/note.model.js';
import { User } from "../../models/user.model.js";
export const userRouter = express.Router();


// Function to check if user exists and return nonce (handled by user schema)
userRouter.get('/', async (req, res, next) => {
    try {
        const publicAddress = req.query && req.query.publicAddress ? req.query.publicAddress : undefined;
        const users = await User.find({ publicAddress: publicAddress });
        return res.json({ users: users });
    } catch {
        next();
    }
})

userRouter.post('/', async (req, res, next) => {
    try {
        const user = await User.create(req.body)
        return res.json(user)
    } catch {
        next();
    }
})

userRouter.get('/notes', async (req, res) => {
    if (!req.auth.payload) return res.sendStatus(401);
    try {
        const notes = await Note.find({ userId: mongoose.Types.ObjectId(req.auth.payload.id) })
        res.json({ notes: notes });
    } catch {
        res.status(500).json({ error: "Error retrieving notes" });
    }
})

userRouter.post('/notes', async (req, res) => {
    if (!req.auth.payload) return res.sendStatus(401);
    try {
        const note = await Note.create({ ...req.body, userId: mongoose.Types.ObjectId(req.auth.payload.id) });
        return res.json(note).status(201);
    } catch (e) {
        return res.status(500).json({ error: `Error creating notes: ${e}` });
    }
})