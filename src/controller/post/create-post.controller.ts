import { Response, Request } from "express";
import { prisma } from "../../utils/prisma";

export const createPost = async (req: Request, res: Response) => {
  const { title, content, authorId } = req.body;

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });

    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
