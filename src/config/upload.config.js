import multer from 'multer';
import path from 'path';
import fs from 'fs';
import config from './index.js';

// Ensure upload directories exist
const createUploadDirs = () => {
  const dirs = [
    path.join(config.uploadPath, 'images'),
    path.join(config.uploadPath, 'pdfs'),
    path.join(config.uploadPath, 'temp')
  ];

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

createUploadDirs();

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = 'temp';
    
    if (file.mimetype.startsWith('image/')) {
      folder = 'images';
    } else if (file.mimetype === 'application/pdf') {
      folder = 'pdfs';
    }
    
    cb(null, path.join(config.uploadPath, folder));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  const allowedPdfType = 'application/pdf';
  
  if (req.path.includes('/image')) {
    if (allowedImageTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'), false);
    }
  } else if (req.path.includes('/pdf')) {
    if (file.mimetype === allowedPdfType) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: config.maxFileSize
  }
});

export default upload;