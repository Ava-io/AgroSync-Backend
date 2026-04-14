import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import { checkRole } from "../../middleware/checkRole.js";
import {
  createEquipmentService,
  delEquipById,
  editEquipment,
  getEquipment,
  getEquipments,
} from "../../services/Admin/EquipmentService.js";

const router = Router();

router.post(
  "/create-equipment",
  verifyToken,
  checkRole(["admin", "farm manager"]),
  createEquipmentService,
);

router.get(
  "/get-equipments",
  verifyToken,
  checkRole(["admin", "farm manager"]),
  getEquipments,
);

router.get(
  "/get-equipment/:id",
  verifyToken,
  checkRole(["admin", "farm manager"]),
  getEquipment,
);

router.patch(
  "/edit-equipment/:id",
  verifyToken,
  checkRole(["admin", "farm manager"]),
  editEquipment,
);

router.delete(
  "/del-equipment/:id",
  verifyToken,
  checkRole(["admin", "farm manager"]),
  delEquipById,
);
export default router;
