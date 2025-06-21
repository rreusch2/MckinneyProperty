import { v2 as cloudinary } from 'cloudinary';

export interface CloudinaryConfig {
  cloud_name: string;
  api_key: string;
  api_secret: string;
}

export class CloudinaryService {
  constructor(config: CloudinaryConfig) {
    cloudinary.config({
      cloud_name: config.cloud_name,
      api_key: config.api_key,
      api_secret: config.api_secret
    });
  }

  /**
   * Upload an image to Cloudinary
   * @param imageBuffer The image buffer to upload
   * @param fileName Original file name (used to generate a unique public_id)
   * @returns URL of the uploaded image
   */
  async uploadImage(imageBuffer: Buffer, fileName: string): Promise<string> {
    try {
      // Generate a unique ID based on timestamp and original filename
      const uniqueId = `property_${Date.now()}_${fileName.split('.')[0]}`;

      // Convert buffer to base64 for cloudinary upload
      const base64Image = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
      
      // Upload to Cloudinary
      const result = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader.upload(
          base64Image,
          {
            public_id: uniqueId,
            folder: 'property_photos'
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
      });

      console.log('Image successfully uploaded to Cloudinary');
      return result.secure_url;
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      throw new Error('Failed to upload image');
    }
  }
}
