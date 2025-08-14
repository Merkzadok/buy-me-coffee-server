import { prisma } from "../../utils/prisma";
import { Request, Response } from "express";

export const receivedDonation = async (req: Request, res: Response) => {
  try {
    const post = await prisma.donations.findMany();

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
};
