import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";
import { GetUserAuthInfoRequest } from "../../middleware/verify";

export const currentUser = async (
  req: GetUserAuthInfoRequest,
  res: Response
) => {
  const user = req.user;

  try {
    const foundedUser = await prisma.user.findFirst({
      where: { id: Number(user?.id) },
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

    if (!foundedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user: foundedUser });
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
};
