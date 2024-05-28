export class UserModel {

    constructor(Id, Connection) {
        this.Id = Id;
        this.Connection = Connection;
    }

    getId() {
        return this.Id;
    }

    getConnection() {
        return this.Connection;
    }

    setConnection(Connection) {
        this.Connection = Connection;
    }
}
