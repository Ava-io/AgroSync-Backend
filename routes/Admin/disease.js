import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import { checkRole } from "../../middleware/checkRole.js";
import {
  createDiseaseService,
  delDIsease,
  editDiseaseId,
  getDiseaseId,
  getDiseases,
} from "../../services/Admin/DiseaseService.js";

const router = Router();

router.post(
  "/create-disease",
  verifyToken,
  checkRole(["admin", "farm manager", "livestock officer"]),
  createDiseaseService,
);

router.get(
  "/get-diseases",
  verifyToken,
  checkRole(["admin", "farm manager", "livestock officer"]),
  getDiseases,
);

router.get(
  "/get-disease-id/:id",
  verifyToken,
  checkRole(["admin", "farm manager", "livestock officer"]),
  getDiseaseId,
);

router.patch(
  "/edit-disease/:id",
  verifyToken,
  checkRole(["admin", "farm manager", "livestock officer"]),
  editDiseaseId,
);

router.delete(
  "/delete-disease/:id",
  verifyToken,
  checkRole(["admin", "farm manager", "livestock officer"]),
  delDIsease,
);
export default router;
