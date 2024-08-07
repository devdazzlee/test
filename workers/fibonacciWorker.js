import { parentPort, workerData } from 'worker_threads';

const fibonacci = (num) => {
  if (num <= 1) return num;
  return fibonacci(num - 1) + fibonacci(num - 2);
};

const result = fibonacci(workerData.number);
parentPort.postMessage(result);
