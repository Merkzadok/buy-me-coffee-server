import express from "express";
import { createUser } from "../controller/user/create-user.controller";

const userRouter = express.Router();

userRouter.post("/create-user", createUser);

export default userRouter;
