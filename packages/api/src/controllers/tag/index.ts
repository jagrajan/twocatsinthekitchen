import { Request, Response } from 'express';
import prisma from 'db/prisma';

export const getAll = async (req: Request, res: Response): Promise<void> => {
  res.json(await prisma.tag.findMany({}));
};

export const postIndex = async (req: Request, res: Response): Promise<void> => {
  const { text } = req.body;
  const newTag = await prisma.tag.create({ data: { text } });
  res.json(newTag);
};
