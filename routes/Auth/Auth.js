import { Router } from "express";
import SigninService from "../../services/Auth/signinService.js";
import SignupService from "../../services/Auth/signupService.js";

const router = Router();

router.post("/signup", SignupService);
router.post("/signin", SigninService);

export default router;
