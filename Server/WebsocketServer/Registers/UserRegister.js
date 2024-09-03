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
      
        ws.on('close', () => {
          console.log(`Cliente ${data.UserId} Desconectado.`);
      
          this.DeleteObject(user);
        });
      
        ws.on('error', console.error)
    }

    DeleteObject(id)
    {
        this.register.splice(this.register.indexOf(id), 1);
    }
}