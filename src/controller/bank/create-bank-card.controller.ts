import { Response, Request } from "express";
import { prisma } from "../../utils/prisma";

// ✅ Basic 16-digit number check
function isValidCardNumber(cardNumber: string): boolean {
  return /^\d{16}$/.test(cardNumber);
}

// ✅ Basic YYYY-MM format check
function isValidExpiryDate(dateStr: string): boolean {
  return /^\d{4}-\d{2}$/.test(dateStr);
}

// ✅ Convert YYYY-MM string to Date (e.g., "2027-08" -> "2027-08-01")
function parseExpiryDate(dateStr: string): Date {
  const [year, month] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, 1); // first day of month
}

export const createBankCard = async (req: Request, res: Response) => {
  const { country, firstName, lastName, cardNumber, expiryDate } = req.body;
  const { userId } = req.params;

  if (!isValidCardNumber(cardNumber)) {
    return res.status(400).json({ message: "Card number must be 16 digits" });
  }

  if (!isValidExpiryDate(expiryDate)) {
    return res
      .status(400)
      .json({ message: "Expiry date must be in YYYY-MM format" });
  }

  const parsedExpiryDate = parseExpiryDate(expiryDate);
  if (isNaN(parsedExpiryDate.getTime())) {
    return res
      .status(400)
      .json({ message: "Expiry date is not a valid calendar date" });
  }

  try {
    const bankCard = await prisma.bankCard.create({
      data: {
        country,
        firstName,
        lastName,
        cardNumber,
        expiryDate: parsedExpiryDate,
        userId: Number(userId),
      },
    });

    await prisma.user.update({
      where: { id: Number(userId) },
      data: { bankCardId: bankCard.id },
    });

    res.status(200).json({
      bankCard: {
        ...bankCard,
        expiryDate: bankCard.expiryDate.toISOString().slice(0, 7), // returns "YYYY-MM"
        createdAt: bankCard.createdAt.toISOString().slice(0, 10),
        updatedAt: bankCard.updatedAt.toISOString().slice(0, 10),
      },
    });
  } catch (error) {
    console.error("Error creating bank card:", error);
    res.status(500).json({
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};
