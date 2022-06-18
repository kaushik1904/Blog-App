const express = require("express");

const blogController = require("./../controllers/blogController");

const router = express.Router();

router.get("/", blogController.getAllBlog);
router.post("/add", blogController.addBlog);
router.put("/update/:id", blogController.updateBlog);
router.get("/:id", blogController.getById);
router.delete("/delete/:id", blogController.deleteBlog);

module.exports = router;
