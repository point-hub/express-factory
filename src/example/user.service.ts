import UserModel, { UserInterface } from "./user.model.js";

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
