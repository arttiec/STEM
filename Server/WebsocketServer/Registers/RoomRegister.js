import { AbstractRegister } from "./AbstractRegister/AbstractRegister.js";
import { RoomModel } from "../Models/RoomModel.js";

export class RoomRegister extends AbstractRegister
{
    constructor() 
    { 
        super();
    }

    GetObjectById(id)
    {
        throw new Error("Method 'GetObjectById(id)' must be implemented.");
    }

    InsertObject()
    {
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

    DeleteObject(id)
    {
        throw new Error("Method 'DeleteObject(id)' must be implemented.");
    }
}