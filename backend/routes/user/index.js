import * as dotenv from 'dotenv';
dotenv.config()
import express from "express";
import mongoose from 'mongoose';
import { Note } from '../../models/note.model.js';
import { User } from "../../models/user.model.js";
export const userRouter = express.Router();

/**
 * GET /api/users?publicAddress=xxx
 * @summary This endpoint checks if the user exists in the database and returns a randomly generated nonce (handled by user schema)
 * @param {object} req.query.required - {publicAddress: string} Request query contains Metamask public address of the user 
 * @return {object} 200 - Sucess. Returns the object of the user found in the database
 * @return {object} yyy - Error. Error is passed to next handler
 */
userRouter.get('/', async (req, res, next) => {
    try {
        const publicAddress = req.query && req.query.publicAddress ? req.query.publicAddress : undefined;
        const users = await User.find({ publicAddress: publicAddress });
        return res.json({ users: users });
    } catch {
        next();
    }
})

/**
 * POST /api/users
 * @summary This endpoint creates a new user in the database with the given Metamask public address 
 * @param {object} req.body.required - {publicAddress: string} Contains the Metamask public address of the user
 * @return {object} 200 - Sucess. Returns 
 */
userRouter.post('/', async (req, res, next) => {
    try {
        const user = await User.create(req.body)
        return res.json(user)
    } catch {
        next();
    }
})

/**
 * GET /api/users/notes 
 * @summary This endpoint retrieves the notes created by a specific user from the database 
 * This is a protected endpoint and the userId supplied to retrieve the notes is extracted directly from the decoded payload of the verified JWT. 
 * This does not give a chance for anyone to tamper with the parameters to attempt recovering another user's notes. The same logic applies to the other protected routes.
 * @param {object} req.auth.payload - Decoded payload from verified JWT. Contains Metamask public address and unique MongoDB object ID of the user
 * @return {object} 200 - Success. Return notes retrieved from database
 * @return {} 401 - Unauthorized. Authentication failed: This indicates that the JWT verification failed and payload is empty. 
 * @return {object} 500 - Internal Server Error. Error in retrieving the notes.
 */
userRouter.get('/notes', async (req, res) => {
    if (!req.auth.payload) return res.sendStatus(401);
    try {
        const notes = await Note.find({ userId: new mongoose.Types.ObjectId(req.auth.payload.id) }, 'note')
        res.json({ notes: notes });
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: `Error retrieving notes: ${e}` });
    }
})

/**
 * POST /api/users/notes 
 * @summary This protected endpoint adds a note to the database
 * @param {object} req.body.required - {note: string} Contains an encrypted string of the note
 * @param {object} req.auth.payload - Decoded payload from verified JWT. Contains Metamask public address and unique MongoDB object ID of the user
 * @return {object} 200 - Sucess. Returns the unique MongoDB object ID of the note. 
 * @return {} 401 - Unauthorized. Authentication failed: This indicates that the JWT verification failed and payload is empty. 
 * @return {object} 500 - Internal Server Error. Error in adding the note.
 */
userRouter.post('/notes', async (req, res) => {
    if (!req.auth.payload) return res.sendStatus(401);
    try {
        const response = await Note.create({ ...req.body, userId: new mongoose.Types.ObjectId(req.auth.payload.id) });
        return res.status(201).json({ _id: response._id });
    } catch (e) {
        console.log(e)
        return res.status(500).json({ error: `Error creating note: ${e}` });
    }
});

/**
 * PATCH /api/users/notes 
 * @summary This protected endpoint updates a note already present in the database
 * @param {object} req.body.required - {_id: string, note: string} Contains the MongoDB id of the note and an encrypted string of the note
 * @param {object} req.auth.payload - Decoded payload from verified JWT. Contains Metamask public address and unique MongoDB object ID of the user
 * @return {} 204 - No Content. Indicates operation is successful
 * @return {} 401 - Unauthorized. Authentication failed: This indicates that the JWT verification failed and payload is empty. 
 * @return {object} 304 - Not Modified. Error in updating the note.
 */
userRouter.patch('/notes', async (req, res) => {
    if (!req.auth.payload) return res.sendStatus(401);
    try {
        await Note.updateOne({ _id: new mongoose.Types.ObjectId(req.body._id), userId: new mongoose.Types.ObjectId(req.auth.payload.id) }, { note: req.body.note });
        return res.sendStatus(204);
    } catch (e) {
        console.log(e)
        return res.status(304).json({ error: `Error updating note: ${e}` });
    }
});

/**
 * DELETE /api/users/notes?id=xxx
 * @summary This protected endpoint deleted a note from the database
 * @param {object} req.query.required - {id: string} The MongoDB object id of the note to be deleted
 * @param {object} req.auth.payload - Decoded payload from verified JWT. Contains Metamask public address and unique MongoDB object ID of the user
 * @return {} 204 - No Content. Indicates operation is successful
 * @return {} 401 - Unauthorized. Authentication failed: This indicates that the JWT verification failed and payload is empty. 
 * @return {object} 404 - Not Found. Note with the given ID not found in database.
 */
userRouter.delete('/notes', async (req, res) => {
    if (!req.auth.payload) return res.sendStatus(401);
    try {
        if (req.query && req.query.id) {
            await Note.deleteOne({ _id: new mongoose.Types.ObjectId(req.query.id), userId: new mongoose.Types.ObjectId(req.auth.payload.id) });
            return res.sendStatus(204);
        }
        return res.status(404).json({ error: "Note not found" });

    } catch (e) {
        console.log(e)
        return res.status(304).json({ error: `Error deleting note: ${e}` });
    }
})