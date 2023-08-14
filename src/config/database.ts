import { Sequelize } from 'sequelize';
import pg from 'pg'
import 'dotenv/config'

const {DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST} = process.env

//creating sequelize Instance
export const sequelize: any = new Sequelize(DB_NAME!, DB_USERNAME!, DB_PASSWORD!, {
  host: DB_HOST!,
  dialect: 'postgres',
  dialectModule: pg
})

export async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log(`The connection was successful with database: ${DB_NAME}`);
  } catch (err) {
    console.log(`Error: ${err}`);
  }
}




(async () => {
  console.log("testing connection");
  await testConnection();
  console.log("testing connection");
  
    try {
      await sequelize.sync({ 
         match: new RegExp(`^${DB_NAME}$`) });
      console.log(`Table synchronization successful with the DB: ${DB_NAME}`);
    } catch (err) {
      console.log(`Error while synchronizing the database: ${DB_NAME}\nError: ${err}`);
    }
})();
