import express from "express";
import { postDonation } from "../controller/donation/create-donation.controller";
// import { totalDonation } from "../controller/donation/total-earnings.controller";
import { receivedDonation } from "../controller/donation/recieved-donation.controller";
import { receivedDonationById } from "../controller/donation/search-donation.controller";
import { deletedById } from "../controller/donation/deleted-by-id.controller";

const donationRouter = express.Router();

donationRouter.post("/create-donation", postDonation);

donationRouter.get("/received", receivedDonation);

donationRouter.get("/:userId", receivedDonationById);

donationRouter.delete("/:userId", deletedById);

// donationRouter.delete("/deletedMany",deleted)

// donationRouter.get("/total-earnings/:userId", totalDonation);


export default donationRouter;
