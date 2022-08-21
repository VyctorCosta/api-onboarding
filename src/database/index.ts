import "dotenv/config";
import { Pool } from "pg";

export const client = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// export const client = new Pool({
//   host: process.env.DATABASE_HOST,
//   port: +process.env.DATABASE_PORT,
//   user: process.env.DATABASE_USER,
//   database: process.env.DATABASE_DATABASE,
//   password: process.env.DATABASE_PASSWORD,
// });
