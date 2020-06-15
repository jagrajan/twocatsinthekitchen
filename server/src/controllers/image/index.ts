import { Request, Response } from 'express';
import { createImageFile } from 'utils/ImageSaver';

export const postIndex = async(req: Request, res: Response): Promise<void> => {
  const filename = await createImageFile(req.body.data);
  res.json({ filename });
}
