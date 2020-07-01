import { Request, Response } from 'express';
import prisma from 'db/prisma';

export const getAll = async (req: Request, res: Response): Promise<void> => {
  const result = await prisma.unit.findMany({
    orderBy: { name: 'asc' },
  });
  res.json(result);
};

export const postIndex = async (req: Request, res: Response): Promise<void> => {
  const { name, plural } = req.body;
  const newUnit = await prisma.unit.create({ data: { name, plural } });
  res.json(newUnit);
};
