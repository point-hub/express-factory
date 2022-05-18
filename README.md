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
import { UserInterface } from "./user.model.js";
import UserService from "./user.service.js";

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

```

Use your factory in your test file

```javascript
// Create one user
new UserFactory().create();

// Create many users
new UserFactory().createMany(3);
```

## Features

### Make
Use the make method to create models without persisting them to the database
```javascript
// Make one user without saving to database
new UserFactory().makeOne();
// Alias
new UserFactory().make();

// Make many users without saving to database
new UserFactory().makeMany(3);
// Alias
new UserFactory().make(3);
```

### Sequences
Sometimes you may wish to alternate the value of a given model attribute for each created model. You may accomplish this by defining a state transformation as a sequence.

```javascript
const userFactory = new UserFactory();
userFactory.sequence([
  { name: "John" },
  { name: "Jane" },
]);
userFactory.createMany(3);
```

### State
State manipulation allow you to define discrete modifications that can be applied to your model factories in any combination.

```javascript
const userFactory = new UserFactory();
userFactory.state({
  age: 21,
});
userFactory.create();
```