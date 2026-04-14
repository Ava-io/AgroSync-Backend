import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import { checkRole } from "../../middleware/checkRole.js";
import {
  createFeedingScheduleService,
  delScheduleById,
  editFeedingScheduleById,
  getFeedingSchedule,
  getScheduleById,
} from "../../services/Admin/FeedingScheduleService.js";

const router = Router();

router.post(
  "/create-schedule",
  verifyToken,
  checkRole(["admin", "farm manager", "livestock"]),
  createFeedingScheduleService,
);
router.get(
  "/get-schedule",
  verifyToken,
  checkRole(["admin", "farm manager", "livestock"]),
  getFeedingSchedule,
);

router.get(
  "/get-schedule/:id",
  verifyToken,
  checkRole(["admin", "farm manager", "livestock"]),
  getScheduleById,
);

router.patch(
  "/edit-schedule/:id",
  verifyToken,
  checkRole(["admin", "farm manager", "livestock"]),
  editFeedingScheduleById,
);

router.delete(
  "/delete-schedule/:id",
  verifyToken,
  checkRole(["admin", "farm manager", "livestock"]),
  delScheduleById,
);

export default router;
