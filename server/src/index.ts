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
  setTimeout(()=>{}, 2000);
  const sample = {
    "image": {
      "full": "Aatrox.png",
      "sprite": "champion0.png",
      "group": "champion",
      "x": 0,
      "y": 0,
      "w": 48,
      "h": 48
    },
    "tags": [
      "Fighter",
      "Tank"
    ],
    "name": "Aatrox",
    "title": "the Darkin Blade",
    "blurb": "Once honored defenders of Shurima against the Void, Aatrox and his brethren would eventually become an even greater threat to Runeterra, and were defeated only by cunning mortal sorcery. But after centuries of imprisonment, Aatrox was the first to find...",
    "info": {
      "attack": 8,
      "defense": 4,
      "magic": 3,
      "difficulty": 4
    }
  }
  res.json([sample]);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
