// App create karna h
const express = require("express");
const app = express();

require("dotenv").config();

//find the port
const PORT = process.env.PORT || 3000;

//add the middleware
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

//database se connection
const db = require("./config/database");
db.connnect();

//cloud se connectivity
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//api route mount karna h

const Upload = require("./routes/FileUpload");
app.use("/api/v1/upload", Upload);

//server activate
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
