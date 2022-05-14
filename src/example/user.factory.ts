import { faker } from "@faker-js/faker";
import Factory from "../index.js";
import { UserInterface as ModelUserInterface } from "./user.model.js";
import UserService from "./user.service.js";

export interface UserInterface {
  name?: string;
  age?: number;
}

export default class UserFactory extends Factory<ModelUserInterface, UserInterface> {
  definition() {
    return {
      name: faker.name.findName(),
      age: faker.datatype.number({
        min: 15,
        max: 50,
      }),
    };
  }

  async create() {
    const userService = new UserService();
    const result = this.makeOne();
    return await userService.create({
      name: result.name,
      age: result.age,
    });
  }

  async createMany(count?: number) {
    const userService = new UserService();
    const result = this.makeMany(count);

    const users: Array<ModelUserInterface> = [];
    for (let i = 0; i < result.length; i++) {
      users.push({
        name: result[i].name,
        age: result[i].age,
      });
    }

    return userService.createMany(users);
  }
}
