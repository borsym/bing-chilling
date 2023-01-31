import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import exampleRouter from './routes/example';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8800;

// middleware
app.use(cors());
app.use(express.json());

app.use('/api/v1/example', exampleRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Seasdrver');
});

app.get('/lol/recommend', (req: Request, res: Response) => {
  res.send('Lorem ipsum sit dolor amet...');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
