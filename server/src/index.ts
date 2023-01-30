import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port = 8800;

console.log('hello teszt');

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Seasdrver');
});

app.get('/lol/recommend', (req: Request, res: Response) => {
  res.send('Lorem ipsum sit dolor amet...');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
