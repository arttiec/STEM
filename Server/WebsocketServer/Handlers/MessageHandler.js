import logger from "../logger.js";

export class MessageHandler
{
    Notify(register, id, message)
    {
        const addressee = register.find(x => x.getId() === id);

        if (addressee)
        {
            addressee.getConnection.send(message);
        }
        else
        {
            logger.error({
                name: "ID_NOT_FOUND", 
                origin: ">", 
                message: `{"Id": ${id}, "Error": "Id was not found in the registry"}`
            });
        }

    }

    NotifyAll(register, message)
    {
        throw new Error("Not Implemented!");
    }
}

function sendMessageToPrototype(id, message) {
    const addressee = connectedPrototypes.find(user => user.getId() == id);
  
    if (addressee) {
      addressee.getConnection().send(message);
    } else {
      console.error(`Usuário de ID ${id} não encontrado!!!`);
    }
  }