const router = require("express").Router();
const auth = require("../middlewares/auth");
const PostsController = require("../controllers/posts.controller");

// Public
router.get("/", PostsController.listPosts);
router.get("/:id", PostsController.getPostById);

// Protected
router.post("/", auth, PostsController.createPost);
router.put("/:id", auth, PostsController.updatePost);
router.delete("/:id", auth, PostsController.deletePost);

module.exports = router;
