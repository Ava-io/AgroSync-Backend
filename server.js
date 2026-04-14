import express from "express";
import dotenv from "dotenv";
import authRoutes from "../Backend/routes/Auth/Auth.js";
import cropRoute from "./routes/Admin/crops.js";
import equipmentRoute from "./routes/Admin/equipment.js";
import healthRecordRoute from "./routes/Admin/healthRecord.js";
import feedingScheduleRoute from "./routes/Admin/feedingSchedule.js";
import transactionRoute from "./routes/Admin/transaction.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/crop", cropRoute);
app.use("/equipment", equipmentRoute);
app.use("/healthrecord", healthRecordRoute);
app.use("/schedule", feedingScheduleRoute);
app.use("/transaction", transactionRoute);

app.listen(port, () => {
  console.log(`My server is running at https://localhost:${port}`);
});
