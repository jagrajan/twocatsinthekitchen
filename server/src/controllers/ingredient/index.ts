import { Request, Response } from 'express';
import prisma from 'db/prisma';

export const getAll = async (req: Request, res: Response): Promise<void> => {
  res.json(await prisma.ingredient.findMany({}));
};
