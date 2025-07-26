const express = require("express");
const router = express.Router();

// Imports blog controller functions
const { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog } = require("../controllers/blogController");

// Middleware to protect routes (e.g., only logged-in users can create/update/delete blogs)
const { protect } = require("../middlewares/authMiddleware");

// Create a blog post - only logged in user
router.post("/", protect, createBlog);

// Get all blog posts
router.get("/", getAllBlogs);

// Get blog by ID
router.get("/:id", getBlogById);

// Update blog by ID - only the author
router.put("/:id", protect, updateBlog);

// Delete blog by ID - only the author
router.delete("/:id", protect, deleteBlog);

// Export the router
module.exports = router;
