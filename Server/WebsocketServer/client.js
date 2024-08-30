import { WebSocket } from "ws";

const ws = new WebSocket("ws://localhost:8080");

function generateId() {
  return Math.floor(Math.random() * 1000);
}

ws.on('error', console.error);

ws.on('open', function open() {
  const data = JSON.stringify({ TypeOfMessage: 'UserInfo', UserId: `${generateId()}` });

  ws.send(data);
});

ws.on('ping', function ping() {
  console.log("Ping Recido");

  ws.pong();
});

ws.on('message', function message(data) {
  console.log('received: %s', data);
});

ws.on('close', function clear(){
  clearTimeout(this.pingTimeout);
});