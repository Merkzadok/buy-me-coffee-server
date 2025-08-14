import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";

export const getUser = async (req: Request, res: Response) => {
  // const { userId } = req.params;

  try {
    const profile = await prisma.profile.findMany();
    res.status(200).json({ message: profile });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
