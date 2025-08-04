import express from "express";
import { createProfile } from "../controller/profile/create-profile.controller";

const profileRouter = express.Router();

profileRouter.post("/:userId", createProfile);

export default profileRouter;
