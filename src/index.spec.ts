import Connection from "./example/connection.js";
import UserFactory from "./example/user.factory.js";
import { UserInterface } from "./example/user.model.js";
import UserService from "./example/user.service.js";

beforeAll(async () => {
  await Connection.connect();
  await Connection.init();
});

afterAll(async () => {
  await Connection.stop();
});

beforeEach(async () => {
  await Connection.refresh();
});

describe("test", () => {
  it("should generate and return user object", async () => {
    const userFactory = new UserFactory();
    const result = userFactory.makeOne();

    expect(result.name).toBeDefined();
    expect(result.age).toBeDefined();
  });

  it("should generate and return array of users", async () => {
    const userFactory = new UserFactory();
    const result = userFactory.makeMany(3);

    expect(result.length).toBe(3);
  });

  it("should use state value", async () => {
    const userFactory = new UserFactory();
    userFactory.state({
      name: "John Doe",
    });
    const result = userFactory.makeOne();

    expect(result.name).toBe("John Doe");
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

    expect(result.length).toBe(3);
    expect(result[0].name).toBe("John");
    expect(result[1].name).toBe("Jane");
    expect(result[2].name).toBe("John");
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

    expect(result.length).toBe(3);
    expect(result[0].name).toBe("John");
    expect(result[1].name).toBe("Jane");
    expect(result[2].name).toBe("John");
    expect(result[0].age).toBe(10);
    expect(result[1].age).toBe(10);
    expect(result[2].age).toBe(10);
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

    expect(result.length).toBe(3);
    expect(result[0].name).toBe("Charlie");
    expect(result[1].name).toBe("Charlie");
    expect(result[2].name).toBe("Charlie");
  });

  it("should use mongodb database to store data", async () => {
    await new UserFactory().create();

    const userService = new UserService();
    const users = await userService.read();

    expect(users.length).toBe(1);
  });

  it("should use mongodb database to store many data", async () => {
    await new UserFactory().createMany(3);

    const userService = new UserService();
    const users = await userService.read();

    expect(users.length).toBe(3);
  });

  it("should return an object when call make() without param", async () => {
    const userFactory = new UserFactory();
    const result = userFactory.make() as UserInterface;

    expect(result.name).toBeDefined();
    expect(result.age).toBeDefined();
  });

  it("should return an array when call make(5) with counter as param", async () => {
    const userFactory = new UserFactory();
    const result = userFactory.make(5) as UserInterface[];

    expect(result.length).toBe(5);
  });
});
