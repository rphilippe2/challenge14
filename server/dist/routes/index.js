import { Router } from "express";
import authRoutes from "./auth-routes.js";
import apiRoutes from "./api/index.js";
import { authenticateToken } from "../middleware/auth.js";
const router = Router();
// Routes that don't require authentication
router.use("/auth", authRoutes);
// Routes that require authentication
router.use("/api", authenticateToken, apiRoutes);
export default router;
