import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  getCustomerProfile,
  updateCustomerProfile,
} from "../controllers/customer.controller.js";

const router = Router();

router.get("/profile", requireAuth, getCustomerProfile);
router.put("/profile", requireAuth, updateCustomerProfile);

export default router;
