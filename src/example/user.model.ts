import Connection from "./connection.js";

export interface UserInterface {
  name: string;
  age: number;
}

export default class UserModel {
  collectionName = "users";

  async create(user: UserInterface) {
    return await Connection.getCollection(this.collectionName).insertOne(user);
  }

  async createMany(users: Array<UserInterface>) {
    return await Connection.getCollection(this.collectionName).insertMany(users);
  }

  async read() {
    return await Connection.getCollection(this.collectionName).find().toArray();
  }
}
