import express from "express";

const postRouter = express.Router();

postRouter.post("/", postRouter);

export default postRouter;
