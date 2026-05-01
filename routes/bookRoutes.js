const router = require("express").Router();

const getbookController = require("../controllers/bookController");

router.get("/", getbookController.getAllBooks);
// router.get("/one", getbookController.getOneBooks);

module.exports = router;
