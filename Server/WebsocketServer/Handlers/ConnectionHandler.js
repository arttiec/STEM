import logger from "../logger.js";

export class ConnectionHandler
{
    Verify(register)
    {
        register.forEach(connection => {
            if (!connection.getIsAlive()) {
                connection.getConnection().terminate();
                
                register.Delete(connection);
                console.log("desconectado!!!!");
                return;
            }
            
            connection.setIsAlive(false);
            connection.getConnection().ping();
        });
    }
}

// function verifyConnectionsOfPrototypes() {
//   connectedPrototypes.forEach(prototype => {
//     if (!prototype.getIsAlive()) {
//       prototype.getConnection().terminate();
      
//       connectedPrototypes.splice(connectedPrototypes.indexOf(prototype), 1)
//       console.log("desconectado!!!!");
//       return;
//     }
    
//     prototype.setIsAlive(false);
//     prototype.getConnection().ping();
//   });
// }