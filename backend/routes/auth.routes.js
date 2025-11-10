import { Router } from "express";
import { body } from "express-validator";
import { signup, login, me } from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post(
  "/signup",
  [
    body("role").isIn(["customer", "provider"]),
    body("username").isString().notEmpty(),
    body("email").isEmail(),
    body("password").isString().isLength({ min: 6 }),
    body("phone_no").matches(/^\d{10}$/),
    body("address").notEmpty()
    // provider extras validated in controller for brevity
  ],
  signup
);

router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password").isString().isLength({ min: 6 }),
    body("loginRole").optional().isIn(["customer", "provider"])
  ],
  login
);

router.get("/me", requireAuth, me);

export default router;
