import express from "express";
import { createProfile } from "../controller/profile/create-profile.controller";
import { getCurrentProfileById } from "../controller/profile/get-profile-byId.controller";
import { getProfileByUsername } from "../controller/profile/get-profile-username.controller";
import { currentUser } from "../controller/profile/current-user.controller";
import { authenticateToken } from "../middleware/verify";
import { getUser } from "../controller/user/get-users.controller";

const profileRouter = express.Router();

profileRouter.get("/current-user", authenticateToken, currentUser);

profileRouter.post("/:userId", createProfile);

profileRouter.get("/:id", getCurrentProfileById);

profileRouter.get("/view/:username", getProfileByUsername);

profileRouter.get("/", getUser);

export default profileRouter;
