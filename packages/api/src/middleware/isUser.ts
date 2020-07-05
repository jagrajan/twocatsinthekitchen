import { NextFunction, Request, Response } from 'express';

export default () => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let response: any = {};
  if (req.auth && req.auth.user_id) {
    next();
  } else {
    response.error = "You are not authorized to make this request";
    res.status(403).json(response);
  }
};
