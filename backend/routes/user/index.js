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
        const notes = await Note.find({ userId: new mongoose.Types.ObjectId(req.auth.payload.id) }, 'note')
        res.json({ notes: notes });
    } catch (e) {
        res.status(500).json({ error: `Error retrieving notes: ${e}` });
    }
})

userRouter.post('/notes', async (req, res) => {
    if (!req.auth.payload) return res.sendStatus(401);
    try {
        const response = await Note.create({ ...req.body, userId: new mongoose.Types.ObjectId(req.auth.payload.id) });
        return res.status(201).json({ id: response._id, ...JSON.parse(response.note) });
    } catch (e) {
        return res.status(500).json({ error: `Error creating note: ${e}` });
    }
});

userRouter.patch('/notes', async (req, res) => {
    if (!req.auth.payload) return res.sendStatus(401);
    try {
        await Note.updateOne({ _id: new mongoose.Types.ObjectId(req.body.id), userId: new mongoose.Types.ObjectId(req.auth.payload.id) }, { note: req.body.note });
        return res.sendStatus(204);
    } catch (e) {
        return res.status(304).json({ error: `Error updating note: ${e}` });
    }
});

userRouter.delete('/notes', async (req, res) => {
    if (!req.auth.payload) return res.sendStatus(401);
    try {
        if (req.query && req.query.id) {
            await Note.deleteOne({ _id: new mongoose.Types.ObjectId(req.query.id), userId: new mongoose.Types.ObjectId(req.auth.payload.id) });
            return res.sendStatus(204);
        }
        return res.status(404).json({ error: "Note not found" });

    } catch (e) {
        return res.status(304).json({ error: `Error deleting note: ${e}` });
    }
})