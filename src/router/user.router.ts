import express from "express";
import { createUser } from "../controller/user/create-user.controller";
// import { getUser } from "../controller/user/get-user.controller";

const userRouter = express.Router();

userRouter.post("/", createUser);

// userRouter.post("/", getUser);

export default userRouter;
