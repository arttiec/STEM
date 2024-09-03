import { WebSocket } from "ws";
import URL from './Parameters/parameters.js'

const ws = new WebSocket(URL);

function generateId() 
{
    return Math.floor(Math.random() * 1000);
}

ws.on('open', function open() {
  const data = JSON.stringify({ TypeOfMessage: 'UserInfo', UserId: `${generateId()}` });

  ws.send(data);
});

ws.on('message', function message(data) {
    console.log('received: %s', data);
})

ws.on('ping', function ping() {
  console.log("Ping Recido");

  ws.pong();
});

ws.on('close', function clear(){
  clearTimeout(this.pingTimeout);
});

ws.on('error', console.error);