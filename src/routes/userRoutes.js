import express from "express";
import {
  register,
  login,
  getUsers,
  getUser,
  updateProfile,
  resetPassword,
  deleteUserAccount
} from "../controllers/userController.js";
import { authenticateToken, authorizeAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile/:id", authenticateToken, getUser);
router.get("/users", authenticateToken, authorizeAdmin, getUsers);
router.get("/users/:id", authenticateToken, getUser);
router.put("/users/:id", authenticateToken, updateProfile);
router.post("/users/:id/reset-password", authenticateToken, resetPassword);
router.delete("/users/:id", authenticateToken, authorizeAdmin, deleteUserAccount);

export default router;
