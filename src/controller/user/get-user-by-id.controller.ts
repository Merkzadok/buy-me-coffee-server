import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";

export const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const users = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    });
    res.status(200).json({ message: users });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
