// Cloudinary configuration
import { CloudinaryConfig } from '../services/cloudinary';

// Function to get Cloudinary config - this will be called at runtime
// after environment variables are fully loaded
export function getCloudinaryConfig(): CloudinaryConfig {
  // Get environment variables
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  
  return {
    cloud_name: cloudName || '',
    api_key: apiKey || '',
    api_secret: apiSecret || ''
  };
}

// For backwards compatibility
export const cloudinaryConfig = getCloudinaryConfig();

// For testing purposes, you can add your Cloudinary details directly here
// but for production, use environment variables
/*
export const cloudinaryConfig: CloudinaryConfig = {
  cloud_name: 'your-cloud-name',
  api_key: 'your-api-key',
  api_secret: 'your-api-secret'
};
*/

// Important: To use this service, you'll need to:
// 1. Create a Cloudinary account (they offer a free tier)
// 2. Get your cloud name, API key and API secret from your dashboard
// 3. Set the environment variables or hardcode values for testing
