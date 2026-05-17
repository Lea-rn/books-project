const router = require("express").Router();

const userController = require("../controllers/userController");

//// register Post :

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.clearCookie("connect.sid");
  res.redirect("/login");
});

module.exports = router;
