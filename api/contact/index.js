// api/contact/index.js
import { insertContactRequestSchema } from '../../shared/schema.js';
import { storage } from '../../server/storage.js';
import { z } from 'zod';
import { GoogleSheetsService } from '../../server/services/googleSheets.js';
import { getGoogleSheetsConfig } from '../../server/config/googleSheets.js';
import { CloudinaryService } from '../../server/services/cloudinary.js';
import { getCloudinaryConfig } from '../../server/config/cloudinary.js';
import multer from 'multer';

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

// Configure multer for memory storage
const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

// Export a function that handles the request
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request (preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Reject non-POST methods
  if (req.method !== 'POST') {
    res.status(405).json({ 
      success: false, 
      message: `Method ${req.method} Not Allowed` 
    });
    return;
  }

  try {
    // Initialize services if needed
    if (!cloudinaryService) initCloudinary();
    if (!googleSheetsService) await initGoogleSheets();

    // Handle file upload manually since we can't use multer middleware directly
    // Note: For file uploads, you'll need to handle multipart/form-data differently
    // This simplified version handles JSON data only
    
    // Validate the request body
    const validatedData = insertContactRequestSchema.parse(req.body);
    
    let photoUrl = "";
    
    // If photoUrl was sent in body
    if (req.body.photoUrl) {
      photoUrl = req.body.photoUrl;
    }
    
    // Save contact request to storage
    const savedRequest = await storage.createContactRequest(validatedData);
    
    // If Google Sheets is configured, add to spreadsheet
    if (googleSheetsService) {
      await googleSheetsService.addContactRequest(validatedData, photoUrl);
    }
    
    res.status(200).json({ 
      success: true, 
      message: "Contact request submitted successfully. We'll get back to you soon!", 
      id: savedRequest.id,
      photoUrl
    });
  } catch (error) {
    console.error("Error in contact API handler:", error);
    if (error instanceof z.ZodError) {
      res.status(400).json({ 
        success: false, 
        message: "Invalid form data", 
        errors: error.errors 
      });
    } else {
      res.status(500).json({ 
        success: false, 
        message: `Failed to submit contact request: ${error.message}` 
      });
    }
  }
}
