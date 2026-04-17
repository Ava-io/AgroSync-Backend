import multer from "multer";
import path from "path";
import fs from fs;


const createDirIfNotExists = (folderName) => {
    if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName, { recursive: true})
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (req.originalUrl.includes("/create")) {
            uploadPath += "diseasesDetection";
        } else if (req.originalUrl.includes("/submission")) {
      uploadPath += "submissions/";
    }
        createDirIfNotExists(uploadPath);
        cb(null, uploadPath);
    },


  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
    );
  },
});


const fileFilter = (req, file, cb) => {
    cb(null, true);
}

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024,
    }
})