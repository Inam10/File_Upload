const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  },
});

//post middleware here
fileSchema.post("save", async function (doc) {
  try {
    console.log("doc", doc);

    //transoporter
    let transoporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    //send mail
    let info = await transoporter.sendMail({
      form: `Inams Coding`,
      to: doc.email,
      subject: "New file Uploaded on Coudinary",
      html: `<h2>Hello user</h2> <p>File uploaded. view here <a href="${doc.imageUrl}">${doc.imageUrl}</a></p>`,
    });

    console.log("Info", info);
  } catch (error) {
    console.error(error);
  }
});

const File = mongoose.model("File", fileSchema);
module.exports = File;
