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
        backgroundImage: " ",
        successMessage: " ",
      },
    });

    const { id } = profile;

    const updatedUser = await prisma.user.update({
      where: { id: Number(userId) },
      data: {
        profileId: id,
      },
    });

    res.status(200).json({ profile: updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
