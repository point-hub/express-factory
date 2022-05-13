import { MongoMemoryServer } from "mongodb-memory-server";
import { Db, MongoClient, Collection } from "mongodb";

class Connection {
  mongod!: MongoMemoryServer;
  client!: MongoClient;
  db!: Db;

  async connect() {
    this.mongod = await MongoMemoryServer.create();
    const uri = this.mongod.getUri();

    this.client = new MongoClient(uri, {});
    this.client.connect();
  }

  async stop() {
    this.client.close();
    await this.mongod.stop();
  }

  async init() {
    this.db = this.client.db("factory-db");
    await this.db.createCollection("user");
  }

  /**
   * Get all collection in the MongoDB and remove all elements from them.
   * We do this to have a clean state between each test case so we don't introduce
   * side effects inside the test cases, affecting other test cases
   */
  async refresh() {
    const collections: Array<Collection> = await this.db.collections();
    await Promise.all(collections.map((collection: Collection) => collection.deleteMany({})));
  }

  getCollection(name: string) {
    return this.db.collection(name);
  }
}

export default new Connection();
