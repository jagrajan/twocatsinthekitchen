import { auth_key } from '@prisma/client';

declare global {
  export  namespace Express {
    export interface Request {
      auth: auth_key;
    }
  }
}
