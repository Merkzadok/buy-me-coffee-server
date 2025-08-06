import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";

export const postDonation = async (req: Request, res: Response) => {
  const {
    amount,
    specialMessage,
    socialURLOrBuyMeACoffee,
    donorId,
    recipientId,
    createdAt,
    updatedAt,

  } = req.body;

  try {
    const post = await prisma.donations.create({
      data: {
        amount,
        specialMessage,
        socialURLOrBuyMeACoffee,
        donorId,
        recipientId,
        createdAt,
        updatedAt,
      },
    });

    res.status(200).json({ success: post });
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
};

export const createDonation = async (req: Request, res: Response) => {
  
};
