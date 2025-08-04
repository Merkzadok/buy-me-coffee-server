import { prisma } from "../../utils/prisma";
import { Request, Response } from "express";

export const deletedById = async (req: Request, res: Response) => {
    const { userId } = req.params;

  
    try {
        const post = await prisma.donations.delete({
          where: {
            id: Number(userId),
          },
        });
    
        res.status(200).json(post);
      } catch (error) {
        res.status(500).json({ message: error });
        console.log(error);
      }
    };
    

     