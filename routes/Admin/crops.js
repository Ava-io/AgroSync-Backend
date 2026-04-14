import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import { checkRole } from "../../middleware/checkRole.js";
import {
  createCropService,
  delCropById,
  editCrop,
  getCropById,
  getCrops,
} from "../../services/Admin/CropService.js";

const router = Router();

router.post(
  "/create-crop",
  verifyToken,
  checkRole(["admin", "farm manager", "agronomist"]),
  createCropService,
);

router.get(
  "/get-crops",
  verifyToken,
  checkRole(["admin", "farm manager", "agronomist"]),
  getCrops,
);

router.get(
  "/get-crop-id/:id",
  verifyToken,
  checkRole(["admin", "farm manager", "agronomist"]),
  getCropById,
);

router.patch(
  "/edit-crop/:id",
  verifyToken,
  checkRole(["admin", "farm manager", "agronomist"]),
  editCrop,
);

router.delete(
  "/del-crop/:id",
  verifyToken,
  checkRole(["admin", "farm manager", "agronomist"]),
  delCropById,
);

export default router;
