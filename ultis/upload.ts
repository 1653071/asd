const util = require("util");
import mongoose from "mongoose";
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require('gridfs-stream');
let fs = require('fs-extra');
import a,{db} from "../connect"

let gfs;

gfs = Grid(db, mongoose.mongo);
gfs.collection('photos');

var storage = new GridFsStorage({
  url: 'mongodb+srv://quang:1234567890@cluster0.ssrlu.mongodb.net/food',
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (_req: any,file: any) => {
    console.log(file)
    const match = ["image/png", "image/jpeg"];
    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-bezkoder-${file.originalname}`;
      return {
        bucketName: "photos",
        filename: `${Date.now()}-${file.originalname}`,
        fileId: `image-${file._id}`
      }
    }
    return {
      bucketName: "photos",
      filename: `${Date.now()}-${file.originalname}`,
      fileId: `image-${file._id}`
    };
  }
});
export var uploadFiles1= multer({ storage: storage })
export var uploadFiles = multer({ storage: storage }).single("file");

var uploadFilesMiddleware = util.promisify(uploadFiles);

var storage1 = multer.diskStorage({
  destination: function (req, file, cb) {
    let path = `uploads/${"asd"}`;
    fs.mkdirsSync(path);
    cb(null, `uploads/${"asd"}`)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + '-' + Date.now())
  }
})
 
export var upload1 = multer({ storage: storage1,fileFilter: (req, file, cb) => {
  
  const enc = new TextEncoder();
          const decodedData = enc.encode(file.originalname)
          console.log(decodedData)
          var dnc = new TextDecoder("utf-8");
var arr = new Uint8Array(decodedData);
console.log(dnc.decode(arr));
  cb(null, true)
}, })

export default {uploadFilesMiddleware,gfs, upload1};
