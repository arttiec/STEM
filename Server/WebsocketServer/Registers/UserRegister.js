import { AbstractRegister } from "./AbstractRegister/AbstractRegister.js";
import { UserModel } from "../Models/UserModel.js";
import logger from "../logger.js";

export class UserRegister extends AbstractRegister
{
    constructor() 
    { 
        super();
    }

    GetObjectById(id)
    {
        return this.register.find(user => user.getId === id);
    }

    InsertObject(data, ws)
    {
        const user = new UserModel(data.UserId, ws);
  
        this.register.push(user);
      
        ws.on('close', function close() {
          console.log(`Cliente ${data.UserId} Desconectado.`);
      
          this.register.splice(this.register.indexOf(user), 1);
        });
      
        ws.on('error', console.error)
    }

    DeleteObject(id)
    {
        throw new Error("Method 'DeleteObject(id)' must be implemented.");
    }
}