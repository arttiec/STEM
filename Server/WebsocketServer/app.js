import { WebSocketServer } from 'ws';
import { UserModel } from './Models/UserModel.js'
import { PrototypeModel } from './Models/PrototypeModel.js';
import { RoomModel } from './Models/RoomModel.js';

var idRoom = 0;

const connectedUsers = [];
const connectedPrototypes = [];
const rooms = [];

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {

  ws.on('message', function handleMessage(message) {
    try {
      const data = JSON.parse(message);
      
      console.log(data);

      if (data && data.TypeOfMessage) {
        switch (data.TypeOfMessage) {
          case 'UserInfo':
            console.log(`Usuário ${data.UserId} Conectado.`);

            handleUserInfo(data, ws);
            break;
          
          case 'PrototypeInfo':
            console.log(`Protótipo ${data.PrototypeId} Conectado.`);

            handlePrototypeInfo(data, ws);
            break;
          
          case 'CreateRoom':
            handleRoom(data, ws);
            break;

          case 'ManipulatorDataInfo':
            const msg = JSON.stringify(data.Message)
            
            console.log(data.Addressee, msg);
            
            sendMessageToPrototype(data.Addressee, msg);
            break;

          default:
            console.log('Tipo de mensagem desconhecido: ', data.TypeOfMessage);
            break;
        }
      } else {
        console.error('Mensagem recebida do cliente em um formato inválido:', message);
      }

    } catch (error) {
       console.error('Erro ao processar mensagem do cliente:', error);
    }
  });

  ws.on('pong', function heartbeat() {
    const prototype = connectedPrototypes.find(prototype => prototype.getConnection() === ws);
    
    if (prototype) {
      prototype.setIsAlive(true);
    }
  });
});

function handleUserInfo(data, ws) {
  const user = new UserModel(data.UserId, ws);
  
  connectedUsers.push(user);

  ws.on('close', function close() {
    console.log(`Cliente ${data.UserId} Desconectado.`);

    connectedUsers.splice(connectedUsers.indexOf(user), 1);
  });

  ws.on('error', console.error)
}

function handlePrototypeInfo(data, ws) {
  const prototype = new PrototypeModel(data.PrototypeId, data.Type, ws);

  connectedPrototypes.push(prototype);

  ws.on('close', function close() {
    console.log(`Protótipo ${data.PrototypeId} Desconectado.`);

    connectedPrototypes.splice(connectedPrototypes.indexOf(prototype), 1);
  });

  ws.on('error', console.error)
}

// {"TypeOfMessage": "CreateRoom", "UserId": value1, "PrototypeId": value2}
function handleRoom(data, ws) {
  const user = connectedUsers.find(user => user.getId() == data.UserId);
  const prototype = connectedPrototypes.find(prototype => prototype.getId() == data.PrototypeId);

  const room = new RoomModel(idRoom, user, prototype, ws);
  idRoom++;

  prototype.setStatus(1);
  rooms.push(room);

  ws.on('close', function close() {
    console.log('Conexão entre fechado.');

    prototype.setStatus(0);

    rooms.splice(connectedPrototypes.indexOf(room), 1);
  });
}


function sendConnectedPrototypes() {
  const prototypes = connectedPrototypes.map(prototype => {
    return { Id: prototype.getId(), Type: prototype.getType(), Status: prototype.getStatus() };
  });

  const msg = JSON.stringify({TypeOfMessage: 'ConnectedPrototypes', Prototypes: prototypes});

  connectedUsers.forEach(user => {
    user.getConnection().send(msg);
  });
}

function sendMessageToPrototype(id, message) {
  const addressee = connectedPrototypes.find(user => user.getId() == id);

  if (addressee) {
    addressee.getConnection().send(message);
  } else {
    console.error(`Usuário de ID ${id} não encontrado!!!`);
  }
}

function verifyConnectionsOfPrototypes() {
  connectedPrototypes.forEach(prototype => {
    if (!prototype.getIsAlive()) {
      prototype.getConnection().terminate();
      
      connectedPrototypes.splice(connectedPrototypes.indexOf(prototype), 1)
      console.log("desconectado!!!!");
      return;
    }
    
    prototype.setIsAlive(false);
    prototype.getConnection().ping();
  });
}

// setInterval(() => {
//   console.log(connectedPrototypes);
// }, 3000);

setInterval(() =>{
  verifyConnectionsOfPrototypes()
}, 1000);

setInterval(() => {
  sendConnectedPrototypes();
}, 500);
