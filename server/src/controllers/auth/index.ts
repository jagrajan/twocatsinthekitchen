import { Request, Response } from 'express';
import validator from 'validator';
import { comparePassword, isAdmin } from 'models/users/User';
import { createJWT } from 'models/auth/AuthKey';

import prisma from 'db/prisma';

export const postLogin = async (req: Request, res: Response): Promise<void> => {
  let response: { [key: string]: any }  = {};

  // Simulate lag
  // await new Promise(r => setTimeout(r, 2000));

  // Form validation
  const errors: { [key: string]: string }  = {};
  if (!req.body.email || validator.isEmpty(req.body.email)) {
    errors.email = 'Please enter your email';
  }
  if (!req.body.password || validator.isEmpty(req.body.password)) {
    errors.password = 'Please enter your password';
  }

  // If there were no validation errors
  if (Object.keys(errors).length > 0) {
    response.errors = errors;
    res.json(response);
    return;
  }

  const user = await prisma.profile.findOne({ where: { email: req.body.email } });
  if (user) {
    if (comparePassword(req.body.password, user.password)) {
      const date = new Date();
      date.setDate(date.getDate() + 30);
      const key = await prisma.auth_key.create({
        data: {
          expire_on: date,
          admin: await isAdmin(user.id),
          profile: {
            connect: { id: user.id },
          }
        },
      });
      response = {
        key,
        jwt: await createJWT(key),
      };
    } else {
      errors.password = 'Incorrect password';
    }
  } else {
    errors.email = 'No account under provided email';
  }

  // Check again for errors from authorization
  if(Object.keys(errors).length > 0) {
    response.errors = errors;
  }

  res.json(response);
};

export const getLogout = async (req: Request, res: Response): Promise<void> => {
  const key = req.auth;
  if (key) {
    prisma.auth_key.update({
      where: { id: key.id },
      data: { expire_on: new Date() }
    });
  }
  res.json({ logout: true });
};

export const getInfo = async (req: Request, res: Response): Promise<void> => {
  if (!req.auth) {
    res.json({ error: 'You are not logged in.' });
    return;
  }
  res.json(req.auth);
};
