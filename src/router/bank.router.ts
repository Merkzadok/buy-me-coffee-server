import express from "express";
import { createBankCard } from "../controller/bank/create-bank-card.controller";
import { getBankCardByUserId } from "../controller/bank/get-bank-card.controller";

const bankCardRouter = express.Router();

bankCardRouter.post("/:userId", createBankCard);

bankCardRouter.get("/:userId", getBankCardByUserId);

export default bankCardRouter;
