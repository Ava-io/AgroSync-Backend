import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import { checkRole } from "../../middleware/checkRole.js";
import { createRecordTransactionService } from "../../services/Admin/RecordTransactioService.js";

const router = Router();

router.post(
  "/create-record-transaction",
  verifyToken,
  checkRole(["admin", "farm manager", "accountant"]),
  createRecordTransactionService,
);

export default router;
