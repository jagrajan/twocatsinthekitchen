import { Request, Response } from 'express';
import prisma from 'db/prisma';

export const getIndex = async (req: Request, res: Response): Promise<void> => {
  const recipeId = parseInt(req.params.id);
  const results = await prisma.recipe_note.findMany({
    where: {
      recipe_id: recipeId,
      user_id: req.auth.user_id,
    },
  });
  res.json(results);
}

export const postIndex = async (req: Request, res: Response): Promise<void> => {
  const recipeId = parseInt(req.params.id);
  const notes: string[] = req.body;
  await prisma.recipe_note.deleteMany({
    where: {
      recipe_id: recipeId,
      user_id: req.auth.user_id,
    },
  });
  for (let i = 0; i < notes.length; i++) {
    await prisma.recipe_note.create({
      data: {
        recipe: { connect: { id: recipeId } },
        user_id: req.auth.user_id,
        text: notes[i],
        position: i,
      },
    });
  }
  const results = await prisma.recipe_note.findMany({
    where: {
      recipe_id: recipeId,
      user_id: req.auth.user_id,
    },
  });
  res.json(results);
};
