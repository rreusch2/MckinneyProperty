import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { insertContactRequestSchema } from "@shared/schema";
import * as storageModule from "./storage";
import { GoogleSheetsService } from "./services/googleSheets";
import { getGoogleSheetsConfig } from "./config/googleSheets";
import { CloudinaryService } from "./services/cloudinary";
import { getCloudinaryConfig } from "./config/cloudinary";
import multer from "multer";
import { z } from "zod";

// Interface for request with file
interface RequestWithFile extends Request {
  file?: Express.Multer.File;
}

// Initialize services with empty placeholders - will be set during route registration
let googleSheetsService: GoogleSheetsService | null = null;
let cloudinaryService: CloudinaryService | null = null;

// Configure multer for file uploads
const multerStorage = multer.memoryStorage(); // Store files in memory as Buffer
const upload = multer({
  storage: multerStorage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  },
  fileFilter: (req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
      // @ts-ignore - Type issue with multer callback, it can accept Error as first param
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize services at runtime when environment variables are fully loaded
  // Google Sheets service
  try {
    const googleConfig = getGoogleSheetsConfig();
    if (googleConfig.credentials.client_email && googleConfig.credentials.private_key && googleConfig.spreadsheetId) {
      googleSheetsService = new GoogleSheetsService(googleConfig);
      // Initialize the spreadsheet with headers
      await googleSheetsService.initializeSpreadsheet();
      console.log("Google Sheets service initialized successfully.");
    } else {
      console.log("Google Sheets credentials not configured. Skipping integration.");
    }
  } catch (error) {
    console.error("Error initializing Google Sheets service:", error);
  }

  // Cloudinary service
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
  // Handle contact form submission with file upload
  app.post("/api/contact", upload.single("image"), async (req: RequestWithFile, res: Response) => {
    try {
      // Validate the request body
      const validatedData = insertContactRequestSchema.parse(req.body);
      
      let photoUrl = "";
      
      // Process image upload if present
      if (req.file && cloudinaryService) {
        try {
          // Upload image to Cloudinary
          photoUrl = await cloudinaryService.uploadImage(
            req.file.buffer,
            req.file.originalname
          );
          console.log("Image uploaded to Cloudinary:", photoUrl);
        } catch (uploadError) {
          console.error("Error uploading image:", uploadError);
          // Continue with form submission even if image upload fails
        }
      } else if (req.body.photoUrl) {
        // If no file upload but photoUrl was sent (e.g., from client-side placeholder)
        photoUrl = req.body.photoUrl;
      }
      
      // Save contact request to storage
      const savedRequest = await storageModule.storage.createContactRequest(validatedData);
      
      console.log("New contact request received:", savedRequest);
      
      // If Google Sheets is configured, add to spreadsheet
      if (googleSheetsService) {
        await googleSheetsService.addContactRequest(validatedData, photoUrl);
      }
      
      res.json({ 
        success: true, 
        message: "Contact request submitted successfully. We'll get back to you soon!", 
        id: savedRequest.id,
        photoUrl // Return the photo URL to client
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

  // Get all contact requests (for admin purposes)
  app.get("/api/contact-requests", async (req: Request, res: Response) => {
    try {
      const requests = await storageModule.storage.getContactRequests();
      res.json(requests);
    } catch (error) {
      console.error("Error retrieving contact requests:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to retrieve contact requests" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
