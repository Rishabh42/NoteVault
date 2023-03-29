
import express from "express";
import { authRouter } from './auth/index.js';
import { userRouter } from "./user/index.js";

export const mainRouter = express.Router();

mainRouter.use('/auth', authRouter);
mainRouter.use('/users', userRouter);