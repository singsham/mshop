const express = require("express");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const path = require("path");
const url = require("url");

const router = express.Router();

const s3 = new aws.S3({

});

const profileImgUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "mshop-musicapp-bucket",
    acl: "public-read",
    key: (req, file, cb) => {
      cb(null, path.basename(file.originalname, path.extname(file.originalname)) + path.extname(file.originalname));
    }
  }),
  limits: { fileSize: 20000000 }, // In bytes: 20000000 bytes = 20 MB
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single("profileImage");

function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /|mp3|mp4|flv/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: audio|video Only!");
  }
}

router.post("/media-upload", (req, res) => {
  profileImgUpload(req, res, (error) => {
    if (error) {
      res.json({ error: error });
    } else {
      // If File not found
      if (req.file === undefined) {
        console.log("Error: No File Selected!");
        res.json("Error: No File Selected");
      } else {
        // If Success
        const fileName = req.file.key;
        const fileUrl = req.file.location;
        res.json({fileName,fileUrl});
      }
    }
  });
});

router.get("/media-list", (req, res) => {
  const url = "https://s3-ap-south-1.amazonaws.com/mshop-musicapp-bucket/";

  var params = {
    Bucket: "mshop-musicapp-bucket"
  };

  s3.listObjectsV2(params, (err, data) => {
    if (err) res.json("error");
    else {
      const mediaUrl = data.Contents.map((keys) => {
        return { fileName: keys.Key, fileUrl: url + keys.Key };
      });
      res.json({ mediaUrl });
    }
  });
});

module.exports = router;
