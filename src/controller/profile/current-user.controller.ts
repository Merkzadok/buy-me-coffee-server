import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";

export const currentUser = async (req: Request, res: Response) => {
  const { id } = req.query as { id: string };

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: {
        profile: true,
        bankCard: true,
        receivedDonations: {
          include: {
            donor: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
};
