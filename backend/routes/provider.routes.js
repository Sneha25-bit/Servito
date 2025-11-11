import { Router } from "express";
import {
  getProviderProfile,
  getMyProviderProfile,
  updateProviderProfile,
} from "../controllers/provider.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// Public route: get provider by customer ID
router.get("/profile/:id", getProviderProfile);

// Private route: get your own profile (requires JWT)
router.get("/me", requireAuth, getMyProviderProfile);

// Private route: update your own profile
router.put("/update", requireAuth, updateProviderProfile);

export default router;
