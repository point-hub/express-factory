import { faker } from "@faker-js/faker";
import Factory from "../index.js";
import UserService from "./user.service.js";

interface UserInterface {
  name: string;
  age: number;
}

export default class UserFactory extends Factory {
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
      name: result.name as string,
      age: result.age as number,
    });
  }

  async createMany(count?: number) {
    const userService = new UserService();
    const result = this.makeMany(count);

    const users: Array<UserInterface> = [];
    for (let i = 0; i < result.length; i++) {
      users.push({
        name: result[i].name as string,
        age: result[i].age as number,
      });
    }

    return await userService.createMany(users);
  }
}
