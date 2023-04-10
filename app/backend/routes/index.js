
import express from "express";
import { expressjwt } from "express-jwt";
import { authRouter } from './auth/index.js';
import { userRouter } from "./user/index.js";

export const mainRouter = express.Router();

// All authentication endpoints defined in ./auth/index.js
mainRouter.use('/auth', authRouter);

// All endpoints to manage user and their notes defined in ./user/index.js
mainRouter.use('/users',
    // Middleware for protected endpoints that runs on every request except /api/user (GET and POST)
    // This function verifies the JWT received in the cookie to confirm the identity of the user
    expressjwt({
        secret: `${process.env.JWT_SECRET}`,
        algorithms: [`${process.env.JWT_ALGORITHM}`],
        getToken: function fromCookie(req) {
            if (req.cookies) return req.cookies.jwt;
            return null;
        }
    }).unless({ path: [{ url: '/api/users', methods: ['GET', 'POST'] }] }), userRouter);