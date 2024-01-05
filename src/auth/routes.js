import express from "express";
const { Router } = express;
import { signup, login } from './controller.js'

const authRouter = Router();

authRouter.post("/signup", signup);

authRouter.post("/login", login);

export default authRouter;