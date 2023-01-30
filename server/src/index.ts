import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8800;

console.log('hello teszt');

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Seasdrver');
});

app.get('/hi', (req: Request, res: Response) => {
  res.send('hi1asd');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
