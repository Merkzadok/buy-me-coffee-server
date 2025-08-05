import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (req: Request, res: Response) => {
  const {
    email,
    password,
    username,
    receivedDonations,
    donations,
    profileId,
    profile,
    bankCard,
    bankCardId,
  } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
        receivedDonations,
        donations,
        profileId,
        profile,
        bankCard,
        bankCardId: bankCardId,
      },
    });

    const isMatch = bcrypt.compare(password, user.password ?? "");

    if (await isMatch) {
      const data = { userId: user.id, email: user.email };

      const secret = "super-secret-123456";

      const hour = Math.floor(Date.now() / 1000) + 60 * 60;

      const accessToken = jwt.sign({ exp: hour, data }, secret);

      return res.status(200).json({ success: true, accessToken });
    } else {
      return res.status(400).json({ message: "Password mismatch" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
