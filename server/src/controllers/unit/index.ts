import { Request, Response } from 'express';
import client from 'db';

export const getAll = async (req: Request, res: Response): Promise<void> => {
  const results = await client.query('SELECT * FROM cookbook.unit');
  res.json({
    units: results.rows
  });
};
