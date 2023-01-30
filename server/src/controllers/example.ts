import { Request, Response } from 'express';
import axios from 'axios';

export const example_1 = async (req: Request, res: Response) => {
  try {
    const response = await axios.get('https://names.drycodes.com/10');
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data from API');
  }
};
