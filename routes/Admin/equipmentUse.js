import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import { checkRole } from "../../middleware/checkRole.js";
import {
  createEquipmentUseService,
  delEquipUse,
  editEquipUseById,
  getEquipUse,
  getEquipUseById,
} from "../../services/Admin/EquipmentUseService.js";
import { delEquipById } from "../../services/Admin/EquipmentService.js";

const router = Router();

router.post(
  "/create-equipuse",
  verifyToken,
  checkRole(["admin", "farm manager", "field worker"]),
  createEquipmentUseService,
);

router.get(
  "/get-equipuse",
  verifyToken,
  checkRole(["admin", "farm manager", "field worker"]),
  getEquipUse,
);

router.get(
  "/get-equipUseId/:id",
  verifyToken,
  checkRole(["admin", "farm manager", "field worker"]),
  getEquipUseById,
);

router.patch(
  "/edit-equipUse/:id",
  verifyToken,
  checkRole(["admin", "farm manager", "field worker"]),
  editEquipUseById,
);

router.delete(
  "/delete-equipuse/:id",
  verifyToken,
  checkRole(["admin", "farm manager", "field worker"]),
  delEquipUse,
);
export default router;
