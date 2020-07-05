import { Request, Response } from 'express';
// import validator from 'validator';
// import UserFetcher from 'models/users/UserFetcher';

export const getParamId = async (req: Request, res: Response): Promise<void> => {
  let response: any = {};
  // const id: string = req.params.id;
  // const fetcher = new UserFetcher();
  // if (validator.isUUID(id)) {
  //   const user = await fetcher.getById(id);
  //   if (user != null) {
  //     response.user = user.dataValues;
  //   } else {
  //     response.error = "No user found";
  //   }
  // } else {
  //   response.error = "Invalid uuid provided";
  // }
  res.json(response);
};
