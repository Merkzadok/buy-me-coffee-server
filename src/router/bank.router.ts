import express from "express";
import { createBankCard } from "../controller/bank/create-bank-card.controller";
import { getBankCardByUserId } from "../controller/bank/get-bank-card.controller";
import { UpdateBankCardById } from "../controller/bank/update-bank-card.controller";
import { authenticateToken } from "../middleware/verify";

const bankCardRouter = express.Router();

bankCardRouter.post("/:userId", authenticateToken, createBankCard);

bankCardRouter.get("/:userId", getBankCardByUserId);

bankCardRouter.put("/:bankCardId", UpdateBankCardById);

export default bankCardRouter;
