import dotnev from "dotenv";
import pg from "pg";
import { createUserTable } from "../model/CreateUsersTable.js";
import { createFarmTable } from "../model/CreateFarmTable.js";
import {} from // removeFirstNameColumn,
// removeLastNameColumnn,
// removePhoneColumn,
"../model/CreateAlterTable.js";
import { createCropsTable } from "../model/CreateCropsTable.js";
import { createEquipmentTable } from "../model/CreateEquipmentTable.js";
import { createHealthRecordTable } from "../model/CreateHealthRecordsTable.js";
import { createFeedingScheduleTable } from "../model/CreateFeedingScheduleTable.js";
import { createTransactionTable } from "../model/CreateTransactionTable.js";
import { createLivestockTable } from "../model/CreateLivestockTable.js";
import { createDiseaseDetectionTable } from "../model/CreateDiseaseDetectionTable.js";
import { createEquipmentUseTable } from "../model/CreateEquipmentUseTable.js";

dotnev.config();

console.log(process.env.DB_PORT);

export const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export const initDb = async () => {
  try {
    const client = await pool.connect();

    await client.query(createFarmTable);
    console.log("Farm table created successfully");

    await client.query(createUserTable);
    console.log("Users table created successfully");

    await client.query(createCropsTable);
    console.log("Crops table created successfully");

    await client.query(createEquipmentTable);
    console.log("Equipment table created successfully");

    await client.query(createHealthRecordTable);
    console.log("Health_record table created successfully ");

    await client.query(createFeedingScheduleTable);
    console.log("Feeding Schedule created successfully");

    await client.query(createTransactionTable);
    console.log("Transaction created successfully");

    await client.query(createLivestockTable);
    console.log("Livestock created successfully");

    await client.query(createDiseaseDetectionTable);
    console.log("Disease Detection Table created successfully");

    await client.query(createEquipmentUseTable);
    console.log("Equipment Use table created successfully");
    // await client.query(removeFirstNameColumn);
    // console.log("First name removed successfully");

    //   await client.query(removeLastNameColumnn);
    //   console.log("Last name removed successfully");

    // await client.query(removePhoneColumn);
    // console.log("Phone number removed successfully");
  } catch (error) {
    console.log(error, "Database not connected successfully");
  }
};
