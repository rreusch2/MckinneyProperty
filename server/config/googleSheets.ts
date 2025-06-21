// This is a template file for Google Sheets credentials
// In production, these values should be loaded from environment variables

import { GoogleSheetsConfig } from '../services/googleSheets';

// Function to get Google Sheets config - this will be called at runtime
// after environment variables are fully loaded
export function getGoogleSheetsConfig(): GoogleSheetsConfig {
  // Log status of environment variables
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  let privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  
  // Fix the private key formatting issue
  // The private key from .env might have escaped newlines (\n) that need to be converted
  // to actual newlines for the crypto library
  if (privateKey) {
    // Replace literal \n with actual newlines if they exist
    privateKey = privateKey.replace(/\\n/g, '\n');
    
    // Some environments might have the key without proper begin/end markers
    if (!privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
      privateKey = `-----BEGIN PRIVATE KEY-----\n${privateKey}\n-----END PRIVATE KEY-----\n`;
    }
  }
  
  return {
    credentials: {
      client_email: clientEmail || '',
      private_key: privateKey || '',
    },
    spreadsheetId: spreadsheetId || '',
  };
}

// For backwards compatibility
export const googleSheetsConfig = getGoogleSheetsConfig();

// Important: To use this service, you'll need to:
// 1. Create a Google Cloud Project
// 2. Enable the Google Sheets API
// 3. Create a service account and download the credentials JSON
// 4. Create a spreadsheet and share it with the service account email
// 5. Set the environment variables:
//    - GOOGLE_SHEETS_CLIENT_EMAIL
//    - GOOGLE_SHEETS_PRIVATE_KEY
//    - GOOGLE_SHEETS_SPREADSHEET_ID
