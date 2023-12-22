const { cloudinaryConnect } = require("../config/cloudinary");
const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

//local file upload create handler function

exports.localFileUpload = async (req, res) => {
  try {
    //fetch file
    const file = req.files.file;
    console.log("File will come in console", file);

    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
    console.log("Path->", path);

    file.mv(path, (err) => {
      console.log(err);
    });
    res.json({
      success: true,
      message: "local file  uploaded successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

function isFileTypeSpported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder ,quality) {
    try {
      const options = { folder };
      console.log("temp file path" , file.tempFilePath);

      if(quality){
        options.quality = quality;
      }
      options.resource_type = "auto";
      return await cloudinary.uploader.upload(file.tempFilePath, options);
    } catch (error) {
      throw new Error(`Error uploading file to Cloudinary: ${error.message}`);
    }
  }
  

//Image upload handler
exports.imageUpload = async (req, res) => {
  try {
    //data fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;
    console.log(file);

    //validations
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();

    if (!isFileTypeSpported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File format is not supported",
      });
    }

    //file format is supported
    console.log("upload to inamsCode");
    const response = await uploadFileToCloudinary(file, "InamsCode");
    console.log("response", response);
    //Entry save in db
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl:response.secure_url,
    });
    res.json({
      success: true,
      message: "Image successfully uploaded",
      imageUrl: response.secure_url,
    });
  } catch (error) {
    console.log(error);
    console.error(error);
    res.status(400).json({
      success: false,
      message: "someting went wrong",
    });
  }
};





//Handler for vedio upload here
exports.vedioUpload = async (req,res)=>{
  try{
    //data fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.vedioFile;

    //validations
    const supportedTypes = ["mp4", "mov"];
    const fileType = file.name.split(".")[1].toLowerCase();

    if (!isFileTypeSpported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File format is not supported",
      });
    }  
    
    //file format is supported
    console.log("upload to inamsCode");
    const response = await uploadFileToCloudinary(file, "InamsCode");
    console.log("response", response);

     //Entry save in db
     const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl:response.secure_url,
    });

    res.json({
      success: true,
      message: "Vedio successfully uploaded",
      imageUrl: response.secure_url,
    });


  }
  catch(error){
    res.status(400).json({
      success:false,
      message:"something went wrong here."
    })
  }
}



// -------------------------------------------------------------

exports.imageSizeReducer = async(req,res) =>{
  try{
    //data fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;
    console.log(file);

    //validations
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();

    if (!isFileTypeSpported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File format is not supported",
      });
    }

    //file format is supported
    console.log("upload to inamsCode");
    const response = await uploadFileToCloudinary(file, "InamsCode",90);
    console.log("response", response);
    //Entry save in db
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl:response.secure_url,
    });
    res.json({
      success: true,
      message: "Image successfully uploaded",
      imageUrl: response.secure_url,
    });
 
  }
  catch(error){
    res.status(400).json({
      success:false,
      message:"something went wrong here."
    })
  }
}
