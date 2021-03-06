import { Request, Response } from 'express';
import prisma from 'db/prisma';

export const getAll = async (req: Request, res: Response): Promise<void> => {
  res.json(await prisma.ingredient.findMany({
    orderBy: { name: 'asc' },
  }));
};

export const postIndex = async (req: Request, res: Response): Promise<void> => {
  const { name, plural } = req.body;
  const newIngredient = await prisma.ingredient.create({ data: { name, plural } });
  res.json(newIngredient);
};
