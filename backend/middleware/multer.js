import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure the uploads directory exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, uploadDir); // Save files to uploads/ folder
  },
  filename: function (req, file, callback) {
    // Generate a unique filename to avoid conflicts
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext);
    callback(null, `${basename}-${uniqueSuffix}${ext}`);
  },
});

// Initialize multer with fields configuration
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5MB
  fileFilter: function (req, file, callback) {
    // Restrict to image files
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return callback(null, true);
    }
    callback(new Error("Only images (jpeg, jpg, png, gif) are allowed"));
  },
});

export default upload;