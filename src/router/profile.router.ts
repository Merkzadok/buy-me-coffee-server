import express from "express";
import { createProfile } from "../controller/profile/create-profile.controller";
import { getCurrentUser } from "../controller/profile/get-profile.controller";
import { getCurrentProfileById } from "../controller/profile/get-profile-byId.controller";
import { getProfileByUsername } from "../controller/profile/get-profile-username.controller";

const profileRouter = express.Router();

profileRouter.post("/:userId", createProfile);

profileRouter.get("/:id", getCurrentProfileById);

profileRouter.get("/", getCurrentUser);

profileRouter.get("/view/:username", getProfileByUsername);

export default profileRouter;
