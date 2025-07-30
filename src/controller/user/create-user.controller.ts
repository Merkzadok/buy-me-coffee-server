import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";

export const createUser = async (req: Request, res: Response) => {
  const { email, name } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    res.status(200).json({ message: user });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
