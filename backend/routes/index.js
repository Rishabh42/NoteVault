
import express from "express";
import { expressjwt } from "express-jwt";
import { authRouter } from './auth/index.js';
import { userRouter } from "./user/index.js";

export const mainRouter = express.Router();

mainRouter.use('/auth', authRouter);
mainRouter.use('/users', expressjwt({
    secret: `${process.env.JWT_SECRET}`,
    algorithms: [`${process.env.JWT_ALGORITHM}`],
    getToken: function fromCookie(req) {
        if (req.cookies) return req.cookies.jwt;
        return null;
    }
}).unless({ path: [{ url: '/', methods: ['GET', 'POST'] }] }), userRouter);