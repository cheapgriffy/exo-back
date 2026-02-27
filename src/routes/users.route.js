const router = require("express").Router();

const validateUser = require("../middlewares/users");
const auth = require("../middlewares/auth");
const UsersController = require("../controllers/users.controller");

router.get("/", UsersController.listUsers);
router.post("/", validateUser, UsersController.createUser);
router.get("/me", auth, UsersController.getMe);

module.exports = router;
