import { expect } from "chai";
import Connection from "./example/connection.js";
import UserFactory from "./example/user.factory.js";
import UserService from "./example/user.service.js";
import { UserInterface } from "./example/user.model.js";

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
  it("should generate and return user object", async () => {
    const userFactory = new UserFactory();
    const result = userFactory.makeOne();

    expect(result.name).to.exist;
    expect(result.age).to.exist;
  });

  it("should generate and return array of users", async () => {
    const userFactory = new UserFactory();
    const result = userFactory.makeMany(3);

    expect(result.length).to.be.equal(3);
  });

  it("should use state value", async () => {
    const userFactory = new UserFactory();
    userFactory.state({
      name: "John Doe",
    });
    const result = userFactory.makeOne();

    expect(result.name).to.be.equal("John Doe");
  });

  it("should use sequence data seed", async () => {
    const userFactory = new UserFactory();
    userFactory.sequence([
      {
        name: "John",
      },
      {
        name: "Jane",
      },
    ]);
    const result = userFactory.makeMany(3);

    expect(result.length).to.be.equal(3);
    expect(result[0].name).to.be.equal("John");
    expect(result[1].name).to.be.equal("Jane");
    expect(result[2].name).to.be.equal("John");
  });

  it("should use sequence data seed and state value", async () => {
    const userFactory = new UserFactory();
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
    const result = userFactory.makeMany(3);

    expect(result.length).to.be.equal(3);
    expect(result[0].name).to.be.equal("John");
    expect(result[1].name).to.be.equal("Jane");
    expect(result[2].name).to.be.equal("John");
    expect(result[0].age).to.be.equal(10);
    expect(result[1].age).to.be.equal(10);
    expect(result[2].age).to.be.equal(10);
  });

  it("should replace sequence value if state exists", async () => {
    const userFactory = new UserFactory();
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
    const result = userFactory.makeMany(3);

    expect(result.length).to.be.equal(3);
    expect(result[0].name).to.be.equal("Charlie");
    expect(result[1].name).to.be.equal("Charlie");
    expect(result[2].name).to.be.equal("Charlie");
  });

  it("should use mongodb database to store data", async () => {
    await new UserFactory().create();

    const userService = new UserService();
    const users = await userService.read();

    expect(users).length(1);
  });

  it("should use mongodb database to store many data", async () => {
    await new UserFactory().createMany(3);

    const userService = new UserService();
    const users = await userService.read();

    expect(users).length(3);
  });

  it("should return an object when call make() without param", async () => {
    const userFactory = new UserFactory();
    const result = userFactory.make() as UserInterface;

    expect(result.name).to.exist;
    expect(result.age).to.exist;
  });

  it("should return an array when call make(5) with counter as param", async () => {
    const userFactory = new UserFactory();
    const result = userFactory.make(5) as UserInterface[];

    expect(result.length).to.be.equal(5);
  });
});
