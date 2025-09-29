import { Router, type Request, type Response } from 'express';

const routes = Router();

const test = (value: string): string => value;

routes.get('/', (req: Request, res: Response) => {
  res.send('Working!');
});

export default routes;
