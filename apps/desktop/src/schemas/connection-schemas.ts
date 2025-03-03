import { DatabaseType } from "@/types/dbs";
import * as z from "zod";

const baseConnectionSchema = z.object({
  name: z.string().min(1, "Connection name is required"),
});

const postgresSchema = baseConnectionSchema.extend({
  host: z.string().min(1, "Host is required"),
  port: z
    .string()
    .regex(/^\d+$/, "Port must be a number")
    .optional()
    .default("5432"),
  database: z.string().min(1, "Database name is required"),
  username: z.string().min(1, "Username is required"),
  password: z.string().optional(),
  ssl: z.boolean().optional().default(false),
});

const mysqlSchema = baseConnectionSchema.extend({
  host: z.string().min(1, "Host is required"),
  port: z
    .string()
    .regex(/^\d+$/, "Port must be a number")
    .optional()
    .default("3306"),
  database: z.string().min(1, "Database name is required"),
  username: z.string().min(1, "Username is required"),
  password: z.string().optional(),
});

const sqliteSchema = baseConnectionSchema.extend({
  filepath: z.string().min(1, "Database file path is required"),
  readOnly: z.boolean().optional().default(false),
});

const mongodbSchema = baseConnectionSchema
  .extend({
    connectionString: z.string().optional(),
    host: z.string().optional(),
    port: z
      .string()
      .regex(/^\d+$/, "Port must be a number")
      .optional()
      .default("27017"),
    database: z.string().optional(),
    username: z.string().optional(),
    password: z.string().optional(),
    authSource: z.string().optional(),
  })
  .refine((data) => data.connectionString || data.host, {
    message: "Either connection string or host must be provided",
    path: ["connectionString"],
  });

const mssqlSchema = baseConnectionSchema
  .extend({
    server: z.string().min(1, "Server is required"),
    port: z
      .string()
      .regex(/^\d+$/, "Port must be a number")
      .optional()
      .default("1433"),
    database: z.string().min(1, "Database name is required"),
    authType: z.enum(["sqlAuth", "windowsAuth"]).default("sqlAuth"),
    username: z.string().optional(),
    password: z.string().optional(),
    encrypt: z.boolean().optional().default(true),
  })
  .refine(
    (data) =>
      data.authType !== "sqlAuth" ||
      (data.username && data.username.length > 0),
    {
      message: "Username is required for SQL Server Authentication",
      path: ["username"],
    },
  );

export function getConnectionSchema(dbType: DatabaseType) {
  switch (dbType) {
    case "postgres":
      return postgresSchema;
    case "mysql":
      return mysqlSchema;
    case "sqlite":
      return sqliteSchema;
    case "mongodb":
      return mongodbSchema;
    case "mssql":
      return mssqlSchema;
    default:
      return baseConnectionSchema;
  }
}

export function getDefaultValues(dbType: DatabaseType) {
  switch (dbType) {
    case "postgres":
      return {
        name: "",
        host: "localhost",
        port: "5432",
        database: "",
        username: "postgres",
        password: "",
        ssl: false,
      };
    case "mysql":
      return {
        name: "",
        host: "localhost",
        port: "3306",
        database: "",
        username: "root",
        password: "",
      };
    case "sqlite":
      return {
        name: "",
        filepath: "",
        readOnly: false,
      };
    case "mongodb":
      return {
        name: "",
        connectionString: "",
        host: "localhost",
        port: "27017",
        database: "",
        username: "",
        password: "",
        authSource: "admin",
      };
    case "mssql":
      return {
        name: "",
        server: "localhost",
        port: "1433",
        database: "",
        authType: "sqlAuth",
        username: "sa",
        password: "",
        encrypt: true,
      };
    default:
      return {
        name: "",
      };
  }
}
