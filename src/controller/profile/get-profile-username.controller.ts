import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";

export const getProfileByUsername = async (req: Request, res: Response) => {
  const { username } = req.params;

  try {
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
      include: {
        profile: true,
      },
    });

    res.status(200).json({ message: user });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
