import { WebSocket } from "ws";
import { URL, PROTOTYPE_TEST} from './Parameters/parameters.js'

const ws = new WebSocket(URL);

var currentData = null;
var lastData = null;

ws.on('open', function open() {
  const data = JSON.stringify({ TypeOfMessage: 'PrototypeInfo', PrototypeId: `${PROTOTYPE_TEST}`, Type: 'Manipulator' });

  ws.send(data);
});

ws.on('message', function message(data) {
    lastData = currentData;
    currentData = data;

    console.log('received: %s', data);

    if (currentData && currentData != lastData)
    {
        console.log("funcionou");
    }
})

ws.on('ping', function ping() {
  console.log("Ping Recido");

  ws.pong();
});

ws.on('close', function clear(){
  clearTimeout(this.pingTimeout);
});

ws.on('error', console.error);