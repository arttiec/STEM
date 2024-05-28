export class PrototypeModel {

    constructor(Id, Type, Connection) {
        this.Id = Id;
        this.Type = Type;
        this.Connection = Connection;
        this.IsAlive = true;

        this.status = 0;
    }

    getId() {
        return this.Id;
    }

    getType() {
        return this.Type;
    }

    getStatus() {
        return this.status;
    }

    setStatus(status) {
        this.status = status 
    }

    getConnection() {
        return this.Connection;
    }

    setConnection(Connection) {
        this.Connection = Connection;
    }

    getIsAlive() {
        return this.IsAlive;
    }

    setIsAlive(isAlive) {
        this.IsAlive = isAlive
    }
}