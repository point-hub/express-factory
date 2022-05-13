import UserModel from "./user.model.js";

interface UserInterface {
  name: string;
  age: number;
}

export default class UserService {
  async create(user: UserInterface) {
    const userModel = new UserModel();
    return await userModel.create(user);
  }

  async createMany(users: Array<UserInterface>) {
    const userModel = new UserModel();
    return await userModel.createMany(users);
  }

  async read() {
    const userModel = new UserModel();
    return await userModel.read();
  }
}
