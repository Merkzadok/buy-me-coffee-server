import express from "express";
import { createUser } from "../controller/user/create-user.controller";
import { getUserById } from "../controller/user/get-user-by-id.controller";
import { getUser } from "../controller/user/get-users.controller";
import { deleteUser } from "../controller/user/delete-user.controller";
import { UpdateUser } from "../controller/user/update-user.controller";
import { checkUserName } from "../controller/user/check-user-name-available.controller";
import { signIn } from "../controller/user/sign-in.controller";

const userRouter = express.Router();

userRouter.post("/", createUser);

userRouter.get("/:userId", getUserById);

userRouter.get("/", getUser);

userRouter.delete("/:userId", deleteUser);

userRouter.put("/:userId", UpdateUser);

userRouter.post("/check-username", checkUserName);

userRouter.post("/sign-in", signIn);

export default userRouter;
