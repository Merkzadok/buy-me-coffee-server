import { prisma } from "../../utils/prisma";
import { Request, Response } from "express";

export const receivedDonation = async (req: Request, res: Response) => {
  // const { time, amount } = req.query as { time: string; amount: string };

  // const filters: any = {};

  // if (userId) {
  //   filters.recipientId = parseInt(userId);
  // }

  // if (time === "30" || time === "90") {
  //   const daysAgo = parseInt(time);
  //   const date = new Date();
  //   date.setDate(date.getDate() - daysAgo);
  //   filters.createdAt = {
  //     gte: date,
  //   };
  // }

  // if (amount) {
  //   const amountNumber = parseInt(amount);
  //   if (!isNaN(amountNumber)) {
  //     filters.amount = amountNumber;
  //   }
  // }

  try {
    const post = await prisma.donations.findMany();

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
};
