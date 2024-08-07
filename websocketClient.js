// websocketClient.js
import WebSocket from 'ws';

const ws = new WebSocket('ws://localhost:3000');

ws.on('open', () => {
  console.log('Connected to WebSocket server');
  ws.send('Hello, server!');
});

ws.on('message', (message) => {
  console.log('Received message from server:', message);
});

ws.on('close', () => {
  console.log('Disconnected from WebSocket server');
}); 
