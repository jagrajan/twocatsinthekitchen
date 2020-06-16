import { Request, Response } from 'express';
import { createImageFile } from 'utils/ImageSaver';
import config from 'config';
import { UploadedFile } from 'express-fileupload';
import { extname } from 'path';
import { v4 } from 'uuid';

export const postIndex = async(req: Request, res: Response): Promise<void> => {
  const file = req.files?.blogImage
  if (file) {
    const image: UploadedFile = Array.isArray(file) ? file[0] : file;
    const filename = `${v4()}${extname(image.name)}`;
    await image.mv(`${config.storage.imageFolder}/${filename}`);
    res.json({ filename })
  } else {
    const filename = await createImageFile(req.body.data);
    res.json({ filename });
  }
}
