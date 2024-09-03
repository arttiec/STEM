import { AbstractRegister } from "./AbstractRegister/AbstractRegister.js";
import { RoomModel } from "../Models/RoomModel.js";

export class RoomRegister extends AbstractRegister
{
    constructor() 
    { 
        super();
        
        this.id = 0;
    }

    GetObjectById(id)
    {
        throw new Error("Method 'GetObjectById(id)' must be implemented.");
    }

    InsertObject(user, prototype, ws)
    {
        const room = new RoomModel(this.id, user, prototype, ws);
      
        prototype.setStatus(1);
        this.register.push(room);
      
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