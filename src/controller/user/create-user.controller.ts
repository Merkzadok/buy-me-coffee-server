import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";

export const createUser = async (req: Request, res: Response) => {
  const {
    email,
    password,
    username,
    receivedDonations,
    donations,
    profileId,
    profile,
    bankCard,
  } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password,
        username,
        receivedDonations,
        donations,
        profileId,
        profile,
        bankCard,
      },
    });

    res.status(200).json({ message: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
