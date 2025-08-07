import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signIn = async (req: Request, res: Response) => {
  const { password, email } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password ?? "");
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const accesstoken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.NEXT_PUBLIC_URL_JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ accesstoken, user });
  } catch (error) {
    console.error("Sign-in error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
