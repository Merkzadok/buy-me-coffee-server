import express from "express";
import { postDonation } from "../controller/donation/create-donation.controller";

const donationRouter = express.Router();

donationRouter.post("/", postDonation);

export default donationRouter;
