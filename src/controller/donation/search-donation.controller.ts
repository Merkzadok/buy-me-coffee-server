import { prisma } from "../../utils/prisma";
import { Request, Response } from "express";

export const receivedDonationById = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const post = await prisma.donations.findUnique({
      where: {
        id: Number(userId),
      },
    });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
};
