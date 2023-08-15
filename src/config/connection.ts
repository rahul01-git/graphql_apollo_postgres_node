import { Dialect, Sequelize } from 'sequelize';
import 'dotenv/config'

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_DIALECT = process.env.DB_DIALECT;
 
const sequelize = new Sequelize(DB_NAME!, DB_USER!, DB_PASSWORD, {
  host: DB_HOST,
  port: +DB_PORT!,
  dialect: DB_DIALECT! as Dialect,
});

export { sequelize };
