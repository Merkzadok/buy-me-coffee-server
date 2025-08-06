import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";

export const checkUserName = async (req: Request, res: Response) => {
  const { username } = req.body;
  console.log(username);

  try {
    const checkUserName = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (checkUserName) {
      res.status(500).json({ message: "Username has been taken" });
      return;
    }

    res.status(200).json({ success: true, checkUserName });
  } catch (error) {
    res.status(401).json({ message: error });
  }
};
