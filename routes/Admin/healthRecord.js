import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import { checkRole } from "../../middleware/checkRole.js";
import {
  createHealthRecordService,
  delRecordById,
  editHealthRecordById,
  getHealthRecords,
  getRecordById,
} from "../../services/Admin/HealthRecordService.js";

const router = Router();

router.post(
  "/create-record",
  verifyToken,
  checkRole(["admin", "farm manager", "livestock"]),
  createHealthRecordService,
);

router.get(
  "/get-records",
  verifyToken,
  checkRole(["admin", "farm manager", "livestock"]),
  getHealthRecords,
);

router.get(
  "/get-record-id/:id",
  verifyToken,
  checkRole(["admin", "farm manager", "livestock"]),
  getRecordById,
);

router.patch(
  "/edit-record/:id",
  verifyToken,
  checkRole(["admin", "farm manager", "livestock"]),
  editHealthRecordById,
);

router.delete(
  "/delete-record/:id",
  verifyToken,
  checkRole(["admin", "farm manager", "livestock"]),
  delRecordById,
);
export default router;
