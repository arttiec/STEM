import { WebSocketServer } from 'ws';
import { UserRegister } from './Registers/UserRegister.js';
import { PrototypeRegister } from './Registers/PrototypeRegister.js';
import { RoomRegister} from './Registers/RoomRegister.js';
import { MessageHandler } from './Handlers/MessageHandler.js';
import { ConnectionHandler } from './Handlers/ConnectionHandler.js';
import logger from './logger.js';

const userRegister = new UserRegister();
const prototypeRegister = new PrototypeRegister();
const roomRegister = new RoomRegister();

const messageHandler = new MessageHandler();
const connectionHandler = new ConnectionHandler();

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

            userRegister.InsertObject(data, ws)
            break;
          
          case 'PrototypeInfo':
            console.log(`Protótipo ${data.PrototypeId} Conectado.`);

            prototypeRegister.InsertObject(data, ws)
            break;
          
          case 'CreateRoom':
            const user = userRegister.GetObjectById(data.UserId);
            const prototype = prototypeRegister.GetObjectById(data.PrototypeId);

            roomRegister.InsertObject(user, prototype, ws);
            break;

          case 'ManipulatorDataInfo':
            const msg = JSON.stringify(data.Message)
            
            console.log(data.Addressee, msg);
            
            messageHandler.Notify(prototypeRegister.register, data.Addressee, msg);
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
    const prototype = prototypeRegister.register.find(prototype => prototype.getConnection() === ws);
    
    if (prototype) 
    {
      prototype.setIsAlive(true);
    }
  });
});

// {"TypeOfMessage": "CreateRoom", "UserId": value1, "PrototypeId": value2}

function sendConnectedPrototypes() {
  const prototypes = prototypeRegister.register.map(prototype => {
    return { Id: prototype.getId(), Type: prototype.getType(), Status: prototype.getStatus() };
  });

  const msg = JSON.stringify({TypeOfMessage: 'ConnectedPrototypes', Prototypes: prototypes});

  userRegister.register.forEach(user => {
    user.getConnection().send(msg);
  });
}


setInterval(() =>{
  connectionHandler.Verify(prototypeRegister.register);
}, 1000);

setInterval(() => {
  sendConnectedPrototypes();
}, 500);
