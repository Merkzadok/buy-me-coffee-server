import express from "express";
import { createBankCard } from "../controller/bank/create-bank-card.controller";

const bankCardRouter = express.Router();

bankCardRouter.post("/:userId", createBankCard);

export default bankCardRouter;
