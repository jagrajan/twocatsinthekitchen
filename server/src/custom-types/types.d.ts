import { AuthKeyDefinition } from 'models/auth/AuthKey';

declare global {
  export  namespace Express {
    export interface Request {
      auth: AuthKeyDefinition;
    }
  }
}
