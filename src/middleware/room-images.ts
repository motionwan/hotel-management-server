import multer, { Multer } from 'multer';
import path from 'path';
import { RequestHandler } from 'express';
import fs from 'fs';

const roomImagesFolder = path.join(__dirname, '../roomImages');

// create the "roomImages" folder if it doesn't already exist
if (!fs.existsSync(roomImagesFolder)) {
  fs.mkdirSync(roomImagesFolder);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, roomImagesFolder);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload: Multer = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  },
});

const uploadMiddleware: RequestHandler = upload.array('images');

export default uploadMiddleware;
