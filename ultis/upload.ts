const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

var storage = new GridFsStorage({
  url: 'mongodb+srv://quang:1234567890@cluster0.ssrlu.mongodb.net/food',
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (_req: any,file: any) => {
    console.log(file)
    const match = ["image/png", "image/jpeg"];
    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-bezkoder-${file.originalname}`;
      return filename;
    }
    return {
      bucketName: "photos",
      filename: `${Date.now()}-bezkoder-${file.originalname}`
    };
  }
});
export var uploadFiles1= multer({ storage: storage })
export var uploadFiles = multer({ storage: storage }).single("file");
var uploadFilesMiddleware = util.promisify(uploadFiles);
export default uploadFilesMiddleware;
