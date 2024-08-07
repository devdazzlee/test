import WebSocket, { WebSocketServer } from 'ws';

let clients = [];

export const setupWebSocket = (server) => {
  const wss = new WebSocketServer({ server });
  wss.on('connection', (ws) => {
    console.log('New client connected');
    clients.push(ws);

    ws.on('message', (message) => {
      console.log('Received message:', message);
      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });

    ws.on('close', () => {
      console.log('Client disconnected');
      clients = clients.filter((client) => client !== ws);
    });
  });
};
