import * as dotenv from 'dotenv';
dotenv.config()
import express from "express";
import { expressjwt } from "express-jwt";
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

userRouter.get('/notes', expressjwt({
    secret: `${process.env.JWT_SECRET}`,
    algorithms: [`${process.env.JWT_ALGORITHM}`],
    getToken: function fromCookie(req) {
        if (req.cookies) return req.cookies.jwt;
        return null;
    }
}), (req, res) => {
    if (!req.auth.payload) return res.sendStatus(401);
    res.sendStatus(200);
})