const router = require("express").Router();

const getbookController = require("../controllers/bookController");

router.get("/all", getbookController.getAllBooks);
router.get("/", getbookController.getThreeBooks);
router.get("/bookdetails/:id", getbookController.getOneBookDetails);

module.exports = router;
