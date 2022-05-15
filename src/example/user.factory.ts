import { faker } from "@faker-js/faker";
import { UserInterface } from "./user.model.js";
import Factory from "../index.js";
import UserService from "./user.service.js";

export default class UserFactory extends Factory<UserInterface, Partial<UserInterface>> {
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
    return await new UserService().create(this.makeOne());
  }

  async createMany(count: number) {
    return new UserService().createMany(this.makeMany(count));
  }
}
