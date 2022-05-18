import { faker } from "@faker-js/faker";
import Factory from "../index";
import { UserInterface } from "./user.model";
import UserService from "./user.service";

export default class UserFactory extends Factory<UserInterface> {
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
