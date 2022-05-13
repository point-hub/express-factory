import { expect } from "chai";
import Connection from "./example/connection.js";
import UserFactory from "./example/user.factory.js";
import UserService from "./example/user.service.js";

before(async () => {
  await Connection.connect();
  await Connection.init();
});

after(async () => {
  await Connection.stop();
});

beforeEach(async () => {
  await Connection.refresh();
});

describe("test", async () => {
  it("should use state value", async () => {
    const userFactory = new UserFactory();
    userFactory.state({
      name: "John Doe",
    });
    const result = userFactory.makeOne();

    expect(result.name).to.be.equal("John Doe");
  });

  it("should generate many user at once", async () => {
    const userFactory = new UserFactory();
    userFactory.count(3);
    const result = userFactory.makeMany();

    expect(result.length).to.be.equal(3);
  });

  it("should generate many user at once using optional param", async () => {
    const userFactory = new UserFactory();
    const result = userFactory.makeMany(3);

    expect(result.length).to.be.equal(3);
  });

  it("should use sequence data seed", async () => {
    const userFactory = new UserFactory();
    userFactory.count(3);
    userFactory.sequence([
      {
        name: "John",
      },
      {
        name: "Jane",
      },
    ]);
    const result = userFactory.makeMany();

    expect(result.length).to.be.equal(3);
    expect(result[0].name).to.be.equal("John");
    expect(result[1].name).to.be.equal("Jane");
  });

  it("should use sequence data seed and state value", async () => {
    const userFactory = new UserFactory();
    userFactory.count(3);
    userFactory.sequence([
      {
        name: "John",
      },
      {
        name: "Jane",
      },
    ]);
    userFactory.state({
      age: 10,
    });
    const result = userFactory.makeMany();

    expect(result.length).to.be.equal(3);
    expect(result[0].name).to.be.equal("John");
    expect(result[1].name).to.be.equal("Jane");
    expect(result[0].age).to.be.equal(10);
    expect(result[1].age).to.be.equal(10);
    expect(result[2].age).to.be.equal(10);
  });

  it("should use state value as final form", async () => {
    const userFactory = new UserFactory();
    userFactory.count(3);
    userFactory.sequence([
      {
        name: "John",
      },
      {
        name: "Jane",
      },
    ]);
    userFactory.state({
      name: "Charlie",
    });
    const result = userFactory.makeMany();

    expect(result.length).to.be.equal(3);
    expect(result[0].name).to.be.equal("Charlie");
    expect(result[1].name).to.be.equal("Charlie");
    expect(result[2].name).to.be.equal("Charlie");
  });

  it("should use mongodb database to store data", async () => {
    const userFactory = new UserFactory();
    const result = await userFactory.create();
    expect(result.acknowledged).to.be.true;

    const userService = new UserService();
    const users = await userService.read();

    expect(users).length(1);
  });

  it("should use mongodb database to store many data", async () => {
    new UserFactory().createMany(3);

    const userService = new UserService();
    const users = await userService.read();

    expect(users).length(3);
  });
});
