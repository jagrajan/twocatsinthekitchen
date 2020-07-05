import fs from 'fs';
import { v4 } from 'uuid';
import imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';
import config from 'config';

export async function createImageFile (data: string) {
  const filename = v4() + '.png';
  fs.writeFileSync(`${config.storage.imageFolder}/${filename}`, new Buffer(data.split(',')[1], 'base64'));
  try {
    await imagemin([`${config.storage.imageFolder}/${filename}`], {
      destination: config.storage.imageFolder,
      plugins: [
        imageminPngquant({
          quality: [0.6, 0.8]
        })
      ]
    });
  } catch (err) {
    console.error(err);
  }
  return filename;
}
