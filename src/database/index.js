import "dotenv/config";

import Sequelize from "sequelize";
import { Client } from "pg";

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

    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: true,
    });

    client.connect();

    client.query(
      "SELECT table_schema,table_name FROM information_schema.tables;",
      (err, res) => {
        if (err) throw err;
        for (let row of res.rows) {
          console.log(JSON.stringify(row));
        }
        client.end();
      }
    );
  }
}

export default new Database();
