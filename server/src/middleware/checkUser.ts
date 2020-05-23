import { NextFunction, Request, Response } from 'express';
import AuthKey from 'models/auth/AuthKey';
import cache from 'cache/auth-cache';
import client from 'db';

export default () => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (req.headers.authorization && req.headers.authorization !== 'undefined') {
    const key = AuthKey.parse(req.headers.authorization.substr(7));
    const sql = 'SELECT * FROM users.auth_key WHERE id = $1 and expire_on > NOW()';
    const result = await client.query(sql, [key.dataValues.id]);
    if (result.rowCount > 0) {
      req.auth = result.rows[0];
    }
  }
  next();
};
