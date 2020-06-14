import { Request, Response } from 'express';
import prisma from 'db/prisma';

export const getAll = async (req: Request, res: Response): Promise<void> => {
  const result = await prisma.unit.findMany({});
  res.json(result);
};
