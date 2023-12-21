const express = require("express");
const router = express.Router();

const {imageUpload , vedioUpload , imageReduerUpload , localFileUpload} = require("../controllers/fileUpload");


//api routes
router.post("/localFileUpload" , localFileUpload);
router.post("/imageUpload" , imageUpload);


module.exports = router;
