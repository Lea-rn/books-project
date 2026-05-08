const router = require("express").Router();

const userController = require("../controllers/userController");

//// register Post :

router.post("/register", userController.registerUser);

module.exports = router;
