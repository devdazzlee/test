import { Worker } from 'worker_threads';
import path from 'path';

const calculateFibonacci = (number) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(path.resolve('./workers/fibonacciWorker.js'), { workerData: { number } });
    worker.on('message', resolve);
    worker.on('error', reject);
  });
};

export const getFibonacci = async (req, res) => {
  const { number } = req.body;
  try {
    const result = await calculateFibonacci(number);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
