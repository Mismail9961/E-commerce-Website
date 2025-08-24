import multer from "multer";
import path from "path";
import { put } from '@vercel/blob';

// Configure multer to use memory storage
const storage = multer.memoryStorage();

// Initialize multer with memory storage
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

// Middleware function to handle blob upload for fields
export const uploadFieldsToBlob = async (req, res, next) => {
  try {
    // If no files were uploaded, continue to next middleware
    if (!req.files || Object.keys(req.files).length === 0) {
      return next();
    }

    const uploadedFiles = {};
    const allUploadPromises = [];

    // Process each field (image1, image2, image3, image4)
    for (const [fieldName, files] of Object.entries(req.files)) {
      const filePromises = files.map(async (file) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        const basename = path.basename(file.originalname, ext);
        const filename = `${fieldName}-${basename}-${uniqueSuffix}${ext}`;

        const blob = await put(filename, file.buffer, {
          access: 'public',
          contentType: file.mimetype,
        });

        return {
          fieldName,
          url: blob.url,
          downloadUrl: blob.downloadUrl,
          pathname: blob.pathname,
          size: file.size,
          contentType: file.mimetype,
          originalName: file.originalname,
          filename: filename
        };
      });

      allUploadPromises.push(...filePromises);
    }

    // Wait for all uploads to complete
    const allUploadedFiles = await Promise.all(allUploadPromises);
    
    // Organize files by field name
    allUploadedFiles.forEach(fileData => {
      if (!uploadedFiles[fileData.fieldName]) {
        uploadedFiles[fileData.fieldName] = [];
      }
      uploadedFiles[fileData.fieldName].push(fileData);
    });

    // Add to request object
    req.uploadedFiles = uploadedFiles;
    req.imageUrls = {};
    
    // Create easy access to URLs for each field
    Object.entries(uploadedFiles).forEach(([fieldName, files]) => {
      req.imageUrls[fieldName] = files.map(file => file.url);
      // For single file fields, also provide direct access
      if (files.length === 1) {
        req.imageUrls[fieldName + 'Url'] = files[0].url;
      }
    });

    next();
  } catch (error) {
    console.error('Fields blob upload error:', error);
    return res.status(500).json({ 
      error: 'File upload to storage failed',
      details: error.message 
    });
  }
};

export default upload;