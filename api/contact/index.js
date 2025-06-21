// api/contact/index.js
import { insertContactRequestSchema } from '../../shared/schema.js';
import { storage } from '../../server/storage.js';
import { z } from 'zod';
import busboy from 'busboy';
import { GoogleSheetsService } from '../../server/services/googleSheets.js';
import { getGoogleSheetsConfig } from '../../server/config/googleSheets.js';
import { CloudinaryService } from '../../server/services/cloudinary.js';
import { getCloudinaryConfig } from '../../server/config/cloudinary.js';

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

    // Log incoming request to debug
    console.log('Request headers:', req.headers);
    console.log('Request method:', req.method);
    
    // First, try to handle JSON data if that's what was sent
    if (req.headers['content-type'] && req.headers['content-type'].includes('application/json')) {
      let jsonData;
      try {
        jsonData = typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}');
        console.log('Parsed JSON data:', jsonData);
        
        // Process the JSON data
        const validatedData = insertContactRequestSchema.parse(jsonData);
        let photoUrl = jsonData.photoUrl || "";
        
        // Save and process as usual
        await processValidatedData(validatedData, photoUrl, res);
        return;
      } catch (error) {
        console.error('Error processing JSON data:', error);
        return res.status(400).json({ 
          success: false, 
          message: error instanceof z.ZodError ? 'Invalid form data' : 'Error processing request',
          errors: error instanceof z.ZodError ? error.errors : [{ message: error.message }]
        });
      }
    }
    
    // For multipart form data, use busboy to parse it
    if (req.headers['content-type'] && req.headers['content-type'].includes('multipart/form-data')) {
      console.log('Handling multipart form data with busboy');
      
      // Create a Promise that resolves when busboy finishes parsing
      const parseFormData = new Promise((resolve, reject) => {
        const formData = {};
        let fileBuffer = null;
        let fileName = '';
        
        const bb = busboy({ headers: req.headers });
        
        bb.on('file', (name, file, info) => {
          const { filename, mimeType } = info;
          console.log(`File [${name}]: filename: ${filename}, mimeType: ${mimeType}`);
          
          const chunks = [];
          file.on('data', (data) => chunks.push(data));
          file.on('end', () => {
            if (chunks.length) {
              fileBuffer = Buffer.concat(chunks);
              fileName = filename;
              console.log(`File [${name}] got ${fileBuffer.length} bytes`);
            }
          });
        });
        
        bb.on('field', (name, val) => {
          console.log(`Field [${name}]: value: ${val}`);
          formData[name] = val;
        });
        
        bb.on('close', () => {
          console.log('Form parsing finished');
          resolve({ formData, fileBuffer, fileName });
        });
        
        bb.on('error', (err) => {
          console.error('Error parsing form:', err);
          reject(err);
        });
        
        // Pipe the request into busboy
        req.pipe(bb);
      });
      
      try {
        // Wait for form parsing to complete
        const { formData, fileBuffer, fileName } = await parseFormData;
        console.log('Parsed form data:', formData);
        
        // Validate the form data
        const validatedData = insertContactRequestSchema.parse(formData);
        let photoUrl = "";
        
        // Process uploaded file if present
        if (fileBuffer && cloudinaryService) {
          try {
            photoUrl = await cloudinaryService.uploadImage(fileBuffer, fileName);
            console.log('Image uploaded to Cloudinary:', photoUrl);
          } catch (uploadError) {
            console.error('Error uploading image:', uploadError);
          }
        } else if (formData.photoUrl) {
          photoUrl = formData.photoUrl;
        }
        
        // Save and process the data
        await processValidatedData(validatedData, photoUrl, res);
        return;
      } catch (error) {
        console.error('Error processing form data:', error);
        return res.status(400).json({ 
          success: false, 
          message: error instanceof z.ZodError ? 'Invalid form data' : 'Error processing request',
          errors: error instanceof z.ZodError ? error.errors : [{ message: error.message }]
        });
      }
    } else {
      // For any other content type, try to process as simple form
      console.log('No multipart form data detected, trying fallback');
      try {
        const requestData = req.body || {};
        console.log('Fallback body:', requestData);
        const validatedData = insertContactRequestSchema.parse(requestData);
        let photoUrl = requestData.photoUrl || "";
        await processValidatedData(validatedData, photoUrl, res);
        return;
      } catch (error) {
        console.error('Error in fallback processing:', error);
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid request format',
          error: error.message
        });
      }
    }
  } catch (error) {
    console.error('Error in contact API handler:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error processing request',
      error: error.message 
    });
  }
}

// Helper function to process validated data
async function processValidatedData(validatedData, photoUrl, res) {
  console.log('Processing validated data:', validatedData);
  
  // Save contact request to storage
  const savedRequest = await storage.createContactRequest(validatedData);
  console.log('Saved request:', savedRequest);
  
  // If Google Sheets is configured, add to spreadsheet
  if (googleSheetsService) {
    console.log('Adding to Google Sheets...');
    try {
      await googleSheetsService.addContactRequest(validatedData, photoUrl);
      console.log('Successfully added to Google Sheets');
    } catch (sheetError) {
      console.error('Error adding to Google Sheets:', sheetError);
      // Continue even if Google Sheets fails
    }
  }
  
  // Return success response
  res.status(200).json({ 
    success: true, 
    message: "Contact request submitted successfully. We'll get back to you soon!", 
    id: savedRequest.id,
    photoUrl
  });
  
  return savedRequest;
}

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

    // Log incoming request to debug
    console.log('Request headers:', req.headers);
    console.log('Request method:', req.method);
    
    // First, try to handle JSON data if that's what was sent
    if (req.headers['content-type'] && req.headers['content-type'].includes('application/json')) {
      let jsonData;
      try {
        jsonData = typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}');
        console.log('Parsed JSON data:', jsonData);
        
        // Process the JSON data
        const validatedData = insertContactRequestSchema.parse(jsonData);
        let photoUrl = jsonData.photoUrl || "";
        
        // Save and process as usual
        const savedRequest = await processValidatedData(validatedData, photoUrl, res);
        return;
      } catch (error) {
        console.error('Error processing JSON data:', error);
        return res.status(400).json({ 
          success: false, 
          message: error instanceof z.ZodError ? 'Invalid form data' : 'Error processing request',
          errors: error instanceof z.ZodError ? error.errors : [{ message: error.message }]
        });
      }
    }
    
    // For multipart form data, use busboy to parse it
    if (req.headers['content-type'] && req.headers['content-type'].includes('multipart/form-data')) {
      const formData = {};
      let fileBuffer = null;
      let fileName = '';
      
      // Create a Promise that resolves when busboy finishes parsing
      const parseFormData = new Promise((resolve, reject) => {
        const bb = busboy({ headers: req.headers });
        
        bb.on('file', (name, file, info) => {
          const { filename, mimeType } = info;
          console.log(`File [${name}]: filename: ${filename}, mimeType: ${mimeType}`);
          
          const chunks = [];
          file.on('data', (data) => chunks.push(data));
          file.on('end', () => {
            if (chunks.length) {
              fileBuffer = Buffer.concat(chunks);
              fileName = filename;
              console.log(`File [${name}] got ${fileBuffer.length} bytes`);
            }
          });
        });
        
        bb.on('field', (name, val) => {
          console.log(`Field [${name}]: value: ${val}`);
          formData[name] = val;
        });
        
        bb.on('close', () => {
          console.log('Form parsing finished');
          resolve({ formData, fileBuffer, fileName });
        });
        
        bb.on('error', (err) => {
          console.error('Error parsing form:', err);
          reject(err);
        });
        
        // Pipe the request into busboy
        req.pipe(bb);
      });
      
      try {
        // Wait for form parsing to complete
        const { formData, fileBuffer, fileName } = await parseFormData;
        console.log('Parsed form data:', formData);
        
        // Validate the form data
        const validatedData = insertContactRequestSchema.parse(formData);
        let photoUrl = "";
        
        // Process uploaded file if present
        if (fileBuffer && cloudinaryService) {
          try {
            photoUrl = await cloudinaryService.uploadImage(fileBuffer, fileName);
            console.log('Image uploaded to Cloudinary:', photoUrl);
          } catch (uploadError) {
            console.error('Error uploading image:', uploadError);
          }
        } else if (formData.photoUrl) {
          photoUrl = formData.photoUrl;
        }
        
        // Save and process the data
        await processValidatedData(validatedData, photoUrl, res);
        return;
      } catch (error) {
        console.error('Error processing form data:', error);
        return res.status(400).json({ 
          success: false, 
          message: error instanceof z.ZodError ? 'Invalid form data' : 'Error processing request',
          errors: error instanceof z.ZodError ? error.errors : [{ message: error.message }]
        });
      }
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
