import { Response, Request } from "express";
import { prisma } from "../../utils/prisma";
// function isValidCardNumber(cardNumber: string): boolean {
//   if (!/^\d{16}$/.test(cardNumber)) return false;

//   let sum = 0;
//   let shouldDouble = false;

//   for (let i = cardNumber.length - 1; i >= 0; i--) {
//     let digit = parseInt(cardNumber[i], 10);

//     if (shouldDouble) {
//       digit *= 2;
//       if (digit > 9) digit -= 9;
//     }

//     sum += digit;
//     shouldDouble = !shouldDouble;
//   }

//   return sum % 10 === 0;
// }

// function isValidExpiryDate(dateStr: string): boolean {
//   const expiryDateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
//   if (!expiryDateRegex.test(dateStr)) return false;

//   const expiryDate = new Date(dateStr);
//   const today = new Date();

//   return expiryDate > today;
// }

export const createBankCard = async (req: Request, res: Response) => {
  const { country, firstName, lastName, cardNumber, expiryDate } = req.body;

  const { userId } = req.params;

  //   if (!isValidExpiryDate(expiryDate)) {
  //     return res.status(400).json({ message: "Invalid expiry date" });
  //   }

  try {
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

    res.status(200).json({ bankCard });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};
