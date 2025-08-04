import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";

export const createProfile = async (req: Request, res: Response) => {
  const {
    name,
    about,
    avatarImage,
    socialMediaURL,
    backgroundImage,
    successMessage,
    createdAt,
    updatedAt,
  } = req.body;
  const { userId } = req.params;
  try {
    const profile = await prisma.profile.create({
      data: {
        name,
        about,
        userId: Number(userId),
        avatarImage,
        socialMediaURL,
        backgroundImage,
        successMessage,
        createdAt,
        updatedAt,
      },
    });

    res.status(200).json({ message: profile });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
