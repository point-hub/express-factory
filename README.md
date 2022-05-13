# Express Factory

Express model factories make it painless to create test database record using your application

## Installation

```javascript
npm install @point-hub/express-factory --save-dev
```

## Usage

Create a factory file and implement your model definition, create, and createMany methods

```javascript
import { faker } from "@faker-js/faker";
import Factory from "@point-hub/express-factory";
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

  async createMany(count: number) {
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

```

Use your factory in your test file

```javascript
// Create one user
new UserFactory().createOne();

// Create many users
new UserFactory().createMany(3);

// Make one user without saving to database
new UserFactory().makeOne();

// Make many users without saving to database
new UserFactory().makeMany(3);

// Use Sequence data
const userFactory = new UserFactory();
userFactory.sequence([
  { name: "John" },
  { name: "Jane" },
]);
const result = userFactory.createMany(3);

// Use State data
const userFactory = new UserFactory();
userFactory.state({
  age: 21,
});
const result = userFactory.createOne();
```
