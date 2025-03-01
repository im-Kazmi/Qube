import { Knex } from "knex";

export class BaseClient {
  knex: Knex;
  dialect: "mssql" | "sqlite" | "mysql" | "psql";
  db: string;
  constructor() {}
}
