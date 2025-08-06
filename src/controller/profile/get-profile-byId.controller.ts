import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";

export const getCurrentProfileById = async (req: Request, res: Response) => {
  const { id } = req.params;

  console.log(id);

  try {
    const profile = await prisma.profile.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        user: true,
      },
    });
    res.status(200).json({ message: profile });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
