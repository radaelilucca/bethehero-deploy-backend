import "dotenv/config";
import { createDb, migrate } from "postgres-migrations";
const { resolve } = require('path');


import Sequelize from "sequelize";

import Ong from "../app/models/Ong";
import Incident from "../app/models/Incident";

import databaseConfig from "../config/database";

const models = [Ong, Incident];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );

      await createDb('betheheroDB', {
        ...databaseConfig,
        defaultDatabase: "postgres",
      })
      await migrate(databaseConfig, resolve(__dirname, 'src', 'database', 'migrations') )
  }
}

export default new Database();
