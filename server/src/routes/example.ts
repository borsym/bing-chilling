import express from 'express';
import { example_1 } from '../controllers/example';

const router = express.Router();

router.get('/test', example_1);

export default router;
