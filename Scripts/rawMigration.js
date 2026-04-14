import { pool } from "../config/db.js";
import { initDb } from "../config/db.js";


const migrationStarted = async () => {
  console.log("migrationStarted");
  await initDb();
  await pool.end();

  console.log("migrationEnded");
};

migrationStarted();
