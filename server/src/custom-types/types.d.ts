import { UserDefinition } from 'models/users/User';

declare global {
  export  namespace Express {
    export interface Request {
      user: UserDefinition;
    }
  }
}
