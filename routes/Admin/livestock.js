import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import { checkRole } from "../../middleware/checkRole.js";
import {
  createLivestockService,
  delLivestock,
  editLivestock,
  getLivestock,
  getLivestockId,
} from "../../services/Admin/LivestockService.js";

const router = Router();

router.post(
  "/create-livestock",
  verifyToken,
  checkRole(["admin", "farm manager", "livestock officer"]),
  createLivestockService,
);

router.get(
  "/get-livestock",
  verifyToken,
  checkRole(["admin", "farm manager", "livestock officer"]),
  getLivestock,
);

router.get(
  "/getLivestockid/:id",
  verifyToken,
  checkRole(["admin", "farm manager", "livestock officer"]),
  getLivestockId,
);

router.patch(
  "/edit-livestock/:id",
  verifyToken,
  checkRole(["admin", "farm manager", "livestock officer"]),
  editLivestock,
);

router.delete(
  "/delete-livestock/:id",
  verifyToken,
  checkRole(["admin", "farm manager", "livestock officer"]),
  delLivestock,
);
export default router;
