import { Request, Response } from 'express';
import validator from 'validator';
import AuthKey from 'models/auth/AuthKey';
import UserFetcher from 'models/users/UserFetcher';

export const postLogin = async (req: Request, res: Response): Promise<void> => {
  const response: { [key: string]: any }  = {};

  // Simulate lag
  await new Promise(r => setTimeout(r, 2000));

  // Form validation
  const errors: { [key: string]: string }  = {};
  if (!req.body.email || validator.isEmpty(req.body.email)) {
    errors.email = 'Please enter your email';
  }
  if (!req.body.password || validator.isEmpty(req.body.password)) {
    errors.password = 'Please enter your password';
  }

  // If there were no validation errors
  if(Object.keys(errors).length > 0) {
    response.errors = errors;
  } else {
    const fetcher: UserFetcher = new UserFetcher();
    const user = await fetcher.getByEmail(req.body.email);
    if (user == null) {
      errors.email = 'No account under provided email';
    } else if ((await user.comparePassword(req.body.password) === false)) {
      errors.password = 'Incorrect password';
    } else if (user.dataValues.id !== undefined) {
      const date = new Date();
      date.setDate(date.getDate() + 30);
      const key = new AuthKey({
        user_id: user.dataValues.id.toString(),
        expire_on: date,
        admin: false
      });
      await key.save();
      response.jwt = key.createSignedJWT();
    }
  }

  // Check again for errors from authorization
  if(Object.keys(errors).length > 0) {
    response.errors = errors;
  }

  res.json(response);
};

export const getInfo = async (req: Request, res: Response): Promise<void> => {
  const response: any = {};
  if (!req.user) {
    response.error = 'Not logged in';
  } else {
    response.key = req.user;
  }
  res.json(response);
};
