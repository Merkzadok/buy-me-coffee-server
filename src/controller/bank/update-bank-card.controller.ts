import { Response, Request } from "express";
import { prisma } from "../../utils/prisma";

function isValidExpiryDate(dateStr: string): boolean {
  // Accept YYYY-MM-DD or full ISO date with time
  const expiryDateRegex =
    /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])(T.*)?$/;
  if (!expiryDateRegex.test(dateStr)) return false;

  const expiryDate = new Date(dateStr);
  const today = new Date();

  return expiryDate > today;
}

export const UpdateBankCardById = async (req: Request, res: Response) => {
  const { bankCardId } = req.params;
  const { country, lastName, firstName, cardNumber, expiryDate } = req.body;

  if (!isValidExpiryDate(expiryDate.slice(0, 10))) {
    return res.status(400).json({ message: "Invalid expiry date" });
  }

  try {
    const bankCard = await prisma.bankCard.update({
      where: { id: Number(bankCardId) },
      data: {
        country,
        lastName,
        firstName,
        cardNumber,
        expiryDate: new Date(expiryDate),
      },
    });

    res.status(200).json({
      bankCard: {
        ...bankCard,
        createdAt: bankCard.createdAt.toISOString().slice(0, 10),
        updatedAt: bankCard.updatedAt.toISOString().slice(0, 10),
      },
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
    console.log(error);
  }
};
