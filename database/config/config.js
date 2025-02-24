import "dotenv/config";

export default {
  development: {
    username:process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    sslmode: "require",
  },
  test: {
    username: "",
    password: null,
    database: "",
    host: "127.0.0.1",
    dialect: "",
  },
  production: {
    username: "root",
    password: null,
    database: "",
    host: "127.0.0.1",
    dialect: "",
  },
};
