import { prisma } from "../../utils/prisma";
import { Request, Response } from "express";

export const receivedDonation = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const { amount, time } = req.query;

  const timePeriod = {
    30: {
      gte: new Date(new Date().setDate(new Date().getDate() - 30)), // Last 30 days
      lte: new Date(), // Up to today
    },
    90: {
      gte: new Date(new Date().setDate(new Date().getDate() - 90)), // Last 90 days
      lte: new Date(), // Up to today
    },
    all: {
      gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)), // Last 1 year
      lte: new Date(), // Up to today
    },
  };

  try {
    const donations = await prisma.donations.findMany({
      where: {
        recipientId: Number(userId),
        ...(amount && {
          amount: {
            gte: Number(amount),
          },
        }),
        ...(time && {
          createdAt: timePeriod[Number(time) as "all" | 30 | 90],
        }),
      },
      include: {
        donor: true,
      },
    });

    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
};
