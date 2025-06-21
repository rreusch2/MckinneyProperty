// api/index.js
import express from 'express';
import { insertContactRequestSchema } from '../shared/schema.js';
import { storage } from '../server/storage.js';
import { z } from 'zod';
import multer from 'multer';
import { GoogleSheetsService } from '../server/services/googleSheets.js';
import { getGoogleSheetsConfig } from '../server/config/googleSheets.js';
import { CloudinaryService } from '../server/services/cloudinary.js';
import { getCloudinaryConfig } from '../server/config/cloudinary.js';

// Initialize Express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configure multer for memory storage
const multerStorage = multer.memoryStorage();
const upload = multer({
  storage: multerStorage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  }
});

// Initialize services - will be lazy-loaded when needed
let googleSheetsService = null;
let cloudinaryService = null;

// Initialize Google Sheets service
async function initGoogleSheets() {
  try {
    const googleConfig = getGoogleSheetsConfig();
    if (googleConfig.credentials.client_email && googleConfig.credentials.private_key && googleConfig.spreadsheetId) {
      googleSheetsService = new GoogleSheetsService(googleConfig);
      await googleSheetsService.initializeSpreadsheet();
      console.log("Google Sheets service initialized successfully.");
    } else {
      console.log("Google Sheets credentials not configured. Skipping integration.");
    }
  } catch (error) {
    console.error("Error initializing Google Sheets service:", error);
  }
}

// Initialize Cloudinary service
function initCloudinary() {
  try {
    const cloudinaryConfig = getCloudinaryConfig();
    if (cloudinaryConfig.cloud_name && cloudinaryConfig.api_key && cloudinaryConfig.api_secret) {
      cloudinaryService = new CloudinaryService(cloudinaryConfig);
      console.log("Cloudinary service initialized successfully.");
    } else {
      console.log("Cloudinary credentials not configured. Image uploads will be placeholders only.");
    }
  } catch (error) {
    console.error("Error initializing Cloudinary service:", error);
  }
}

// API routes
app.post('/api/contact', upload.single('image'), async (req, res) => {
  try {
    // Initialize services if needed
    if (!cloudinaryService) initCloudinary();
    if (!googleSheetsService) await initGoogleSheets();

    // Validate the request body
    const validatedData = insertContactRequestSchema.parse(req.body);
    
    let photoUrl = "";
    
    // Process image upload if present
    if (req.file && cloudinaryService) {
      try {
        photoUrl = await cloudinaryService.uploadImage(
          req.file.buffer,
          req.file.originalname
        );
      } catch (uploadError) {
        console.error("Error uploading image:", uploadError);
      }
    } else if (req.body.photoUrl) {
      photoUrl = req.body.photoUrl;
    }
    
    // Save contact request to storage
    const savedRequest = await storage.createContactRequest(validatedData);
    
    // If Google Sheets is configured, add to spreadsheet
    if (googleSheetsService) {
      await googleSheetsService.addContactRequest(validatedData, photoUrl);
    }
    
    res.json({ 
      success: true, 
      message: "Contact request submitted successfully. We'll get back to you soon!", 
      id: savedRequest.id,
      photoUrl
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ 
        success: false, 
        message: "Invalid form data", 
        errors: error.errors 
      });
    } else {
      console.error("Error processing contact form:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to submit contact request" 
      });
    }
  }
});

app.get('/api/contact-requests', async (req, res) => {
  try {
    const requests = await storage.getContactRequests();
    res.json(requests);
  } catch (error) {
    console.error("Error retrieving contact requests:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to retrieve contact requests" 
    });
  }
});

// Export for Vercel serverless
export default app;
