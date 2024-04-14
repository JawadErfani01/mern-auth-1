import express from "express";
import {
  createPost,
  deletePost,
  updatePost,
  getAPost,
  getPosts,
  getMePosts,
} from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";
import imageUploader from "../middleware/imageUploader.js";
import { userExists } from "../middleware/userExistMiddleware.js";
const router = express.Router();

router.get("/", protect, getPosts);
router.get("/me", protect, getMePosts);

router.get("/:id", getAPost);
router.post("/", protect, imageUploader.single("image"), createPost);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);

export default router;
