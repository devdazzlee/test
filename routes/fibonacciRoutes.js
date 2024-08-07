import express from 'express';
import { getFibonacci } from '../controllers/fibonacciController.js';

const router = express.Router();

router.post('/', getFibonacci);

export default router;
