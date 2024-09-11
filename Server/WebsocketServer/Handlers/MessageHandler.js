import logger from "../logger.js";

export class MessageHandler
{
    Notify(register, id, message)
    {
        const addressee = register.find(x => x.getId() === id);

        if (addressee)
        {
            addressee.getConnection().send(message);
        }   
    }

    NotifyAll(register, message)
    {
        throw new Error("Not Implemented!");
    }
}
