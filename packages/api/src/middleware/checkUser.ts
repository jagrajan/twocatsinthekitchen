import { NextFunction, Request, Response } from 'express';
import { parseJWT } from 'models/auth/AuthKey';
import prisma from 'db/prisma';

export default () => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (req.headers.authorization && req.headers.authorization !== 'undefined') {
    const key = await parseJWT(req.headers.authorization.substr(7));
    const result = await prisma.auth_key.findOne({ where: { id: key.id } });
    if (result && result.expire_on > new Date()) {
      req.auth = result;
    }
  }
  next();
};
