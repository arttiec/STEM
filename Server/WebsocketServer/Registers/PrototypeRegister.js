import { AbstractRegister } from "./AbstractRegister/AbstractRegister.js";
import { PrototypeModel } from "../Models/PrototypeModel.js";

export class PrototypeRegister extends AbstractRegister
{
    constructor() 
    { 
        super();
    }

    GetObjectById(id)
    {
        return this.register.find(prototype => prototype.getId() == id);;
    }

    InsertObject(data, ws)
    {
        const prototype = new PrototypeModel(data.PrototypeId, data.Type, ws);

        this.register.push(prototype);
      
        ws.on('close', () => {
          console.log(`Protótipo ${data.PrototypeId} Desconectado.`);
      
          this.DeleteObject(prototype);
        });
      
        ws.on('error', console.error)
    }

    DeleteObject(id)
    {
        this.register.splice(this.register.indexOf(id), 1);
    }
}