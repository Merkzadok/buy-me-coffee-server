import { Response, Request } from "express";
import { prisma } from "../../utils/prisma";

// function isValidCardNumber(cardNumber: string): boolean {
//   if (!/^\d{16}$/.test(cardNumber)) return false;

function isValidCardNumber(cardNumber: string): boolean {
  return /^\d{16}$/.test(cardNumber);

  let sum = 0;
  let shouldDouble = false;

  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber[i], 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

function isValidExpiryDate(dateStr: string): boolean {
  const expiryDateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  if (!expiryDateRegex.test(dateStr)) return false;

  const expiryDate = new Date(dateStr);
  const today = new Date();

  return expiryDate > today;
}

export const createBankCard = async (req: Request, res: Response) => {
  const { country, firstName, lastName, cardNumber, expiryDate } = req.body;

  const { userId } = req.params;

  // if (!isValidCardNumber(cardNumber)) {
  //   return res.status(400).json({ message: "Invalid card number" });
  // }

  // if (!isValidExpiryDate(expiryDate)) {
  //   return res.status(400).json({ message: "Invalid expiry date" });
  // }

  try {
    // 1️⃣ Create bank card
    const bankCard = await prisma.bankCard.create({
      data: {
        country,
        firstName,
        lastName,
        cardNumber,
        expiryDate: new Date(expiryDate),
        userId: Number(userId),
      },
    });

    // 2️⃣ Update user's bankCardId
    await prisma.user.update({
      where: { id: Number(userId) },
      data: { bankCardId: bankCard.id },
    });

    // 3️⃣ Send response with formatted dates
    res.status(200).json({
      bankCard: {
        ...bankCard,
        expiryDate: bankCard.expiryDate.toISOString().slice(0, 10),
        createdAt: bankCard.createdAt.toISOString().slice(0, 10),
        updatedAt: bankCard.updatedAt.toISOString().slice(0, 10),
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};
