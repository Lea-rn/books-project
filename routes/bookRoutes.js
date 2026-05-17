const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const getbookController = require("../controllers/bookController");

// {
//     originalname : "gjjbgnjbjnbg.jfif" ,
//     mimetype : "image/jfif" ,
//     size : 555644 ,
/// fileName : 55555555555.jpg
// }

///////// storage

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/uploads");
  },
  filename: (req, file, cb) => {
    let ext = path.extname(file.originalname); ////////////   .jfif

    if (ext === ".jfif") {
      ext = ".jpg"; ///.jpg
    }
    cb(null, Date.now() + ext); /////
  },
});

////////// filter only images  ::

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("only images are allowed"), false);
  }
};

//// multer config

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fieldSize: 2 * 1024 * 1024, /// 2mb
  },
});

router.get("/all", getbookController.getAllBooks);
router.get("/", getbookController.getThreeBooks);
router.get("/bookdetails/:id", getbookController.getOneBookDetails);

router.post("/add", upload.single("image"), getbookController.addBook);

module.exports = router;
