const express = require("express");
const router = express.Router();

const {
  imageUpload,
  vedioUpload,
  imageSizeReducer,
  localFileUpload,
} = require("../controllers/fileUpload");

//api routes
router.post("/localFileUpload", localFileUpload);
router.post("/imageUpload", imageUpload);
router.post("/vedioUpload", vedioUpload);
router.post("/imageSizeReducer" , imageSizeReducer);

module.exports = router;
