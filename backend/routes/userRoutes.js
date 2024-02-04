import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import imageUploader from "../middleware/imageUploader.js";
import { userExists } from "../middleware/userExistMiddleware.js";
const router = express.Router();

router.post(
  "/register",
  imageUploader.single("image"),
  userExists,
  registerUser
);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
