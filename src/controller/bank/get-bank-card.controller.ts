import { Response, Request } from "express";
import { prisma } from "../../utils/prisma";

export const getBankCardByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const bankCard = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    });
    res.status(200).json({ message: bankCard });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
