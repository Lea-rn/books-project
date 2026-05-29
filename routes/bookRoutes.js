const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const getbookController = require("../controllers/bookController");

////// file = {
// originalname : download.jfif,
// encoding : hgjggjj ,
// mimeType "image/jfif" ,
// size : 25558888
// //}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/uploads");
  },
  filename: (req, file, cb) => {
    console.log("file : ", file);
    let ext = path.extname(file.originalname); ///// .jfif
    if (ext === ".jfif") {
      ext = ".jpg"; //// .jpg
    }
    cb(null, Date.now() + ext);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("only images are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, /// 2mb
  },
});

router.post("/add", upload.single("image"), getbookController.addBook);
router.get("/all", getbookController.getAllBooks);
router.get("/", getbookController.getThreeBooks);
router.get("/bookdetails/:id", getbookController.getOneBookDetails);
router.get("/delete/:id", getbookController.deleteBook);
router.get("/edit/:id", getbookController.getEditBookForm);
router.post(
  "/update/:id",
  upload.single("image"),
  getbookController.updateBook,
);

module.exports = router;
