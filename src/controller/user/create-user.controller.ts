import { Response, Request } from "express";
import { prisma } from "../../utils/prisma";

// ✅ Basic 16-digit number check
function isValidCardNumber(cardNumber: string): boolean {
  return /^\d{16}$/.test(cardNumber);
}

// ✅ Basic YYYY-MM-DD format check (not future validation)
function isValidExpiryDate(dateStr: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
}

export const createBankCard = async (req: Request, res: Response) => {
  const { country, firstName, lastName, cardNumber, expiryDate } = req.body;
  const { userId } = req.params;

  // ✅ Validate card number
  if (!isValidCardNumber(cardNumber)) {
    return res.status(400).json({ message: "Card number must be 16 digits" });
  }

  // ✅ Validate expiry date format
  if (!isValidExpiryDate(expiryDate)) {
    return res
      .status(400)
      .json({ message: "Expiry date must be in YYYY-MM-DD format" });
  }

  try {
    // ✅ Safely parse date string to Date object
    const parsedExpiryDate = new Date(expiryDate);

    // ✅ Additional safety check in case it's an invalid date (e.g. 2025-02-30)
    if (isNaN(parsedExpiryDate.getTime())) {
      return res
        .status(400)
        .json({ message: "Expiry date is not a valid calendar date" });
    }

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
        expiryDate: bankCard.expiryDate.toISOString().slice(0, 10),
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
