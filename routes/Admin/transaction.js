import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import { checkRole } from "../../middleware/checkRole.js";
import {
  createTransactionService,
  delTransactionById,
  editTransactionById,
  getTransactionById,
  getTransactions,
} from "../../services/Admin/TransactionService.js";

const router = Router();

router.post(
  "/create-transaction",
  verifyToken,
  checkRole(["admin", "farm manager", "accountant"]),
  createTransactionService,
);
router.get(
  "/get-transactions",
  verifyToken,
  checkRole(["admin", "farm manager", "accountant"]),
  getTransactions,
);

router.get(
  "/get-transaction/:id",
  verifyToken,
  checkRole(["admin", "farm manager", "accountant"]),
  getTransactionById,
);

router.patch(
  "/edit-transaction/:id",
  verifyToken,
  checkRole(["admin", "farm manager", "accountant"]),
  editTransactionById,
);

router.delete(
  "/delete-transaction/:id",
  verifyToken,
  checkRole(["admin", "farm manager", "accountant"]),
  delTransactionById
);
export default router;
