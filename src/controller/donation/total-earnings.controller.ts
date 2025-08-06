import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";

export const totalEarnings = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const total = await prisma.donations.findMany({
      where: { recipientId: Number(userId) },
    });

    const totalEarnings = total.reduce(
      (acc, donation) => acc + donation.amount,
      0
    );

    res.status(200).json({ totalEarnings: totalEarnings });
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
  ``;
};
