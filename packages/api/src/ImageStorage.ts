import { mkdirSync, existsSync } from 'fs';
import config from 'config';

const folder = config.storage.imageFolder;

if (!existsSync(folder)) {
  mkdirSync(folder);
}

class ImageStorage {
  public saveUriImage(dataUrl: string): string | null {
    if (!dataUrl) {
      return null;
    }
    return null;
  }
}


export default ImageStorage;
