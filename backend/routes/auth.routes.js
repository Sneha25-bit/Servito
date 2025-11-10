import { Router } from "express";
import { body } from "express-validator";
import {
  signupCustomer,
  signupProvider,
  login,
  me,
} from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

/**
 * =========================
 * CUSTOMER SIGNUP ROUTE
 * =========================
 */
router.post(
  "/signup-customer",
  [
    body("username").isString().notEmpty(),
    body("email").isEmail(),
    body("password").isString().isLength({ min: 6 }),
    body("phone_no").matches(/^\d{10}$/),
    body("address").notEmpty(),
  ],
  signupCustomer
);

/**
 * =========================
 * PROVIDER SIGNUP ROUTE
 * =========================
 */
router.post(
  "/signup-provider",
  [
    body("username").isString().notEmpty(),
    body("email").isEmail(),
    body("password").isString().isLength({ min: 6 }),
    body("phone_no").matches(/^\d{10}$/),
    body("address").notEmpty(),
    body("aadhar_no").matches(/^\d{12}$/),
    body("service_info").notEmpty(),
  ],
  signupProvider
);

/**
 * =========================
 * LOGIN & PROFILE ROUTES
 * =========================
 */
router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password").isString().isLength({ min: 6 }),
    body("loginRole").optional().isIn(["customer", "provider"]),
  ],
  login
);

router.get("/me", requireAuth, me);

export default router;
