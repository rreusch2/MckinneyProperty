// api/contact-requests/index.js
import { storage } from '../../server/storage.js';

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

  // Only allow GET requests for this endpoint
  if (req.method !== 'GET') {
    res.status(405).json({ 
      success: false, 
      message: `Method ${req.method} Not Allowed` 
    });
    return;
  }

  try {
    const requests = await storage.getContactRequests();
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error retrieving contact requests:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to retrieve contact requests" 
    });
  }
}
