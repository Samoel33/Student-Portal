const multer = require('multer');


const storageImage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/images");
  },
  filename: (req, file, cb) => {
    cb(null, `${getDate()}-${file.originalname}`);
  },
});

const uploadImage = multer({
  storage: storageImage,
});

exports.uploadImage = uploadImage.single("image");

const storageFile = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/timeTable");
  },
  filename: (req, file, cb) => {
    cb(null, `${getDate()}-${file.originalname}`);
  },
});

const uploadFile = multer({
  storage: storageFile,
});

exports.upload = uploadFile.single("upload");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/attachments");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const uploadAttachment = multer({
  storage: storage,
});

exports.uploadAttachment = uploadAttachment.single("attachment");