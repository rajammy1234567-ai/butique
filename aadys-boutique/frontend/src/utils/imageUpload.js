// Cloudinary image upload utility
// No backend needed - direct upload to Cloudinary

const CLOUDINARY_CLOUD_NAME = 'dhjnveoxf'; // Your cloud name
const CLOUDINARY_UPLOAD_PRESET = 'unsigned_preset'; // Replace with your upload preset
const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB in bytes

/**
 * Validate file before upload
 * @param {File} file - Image file from file input
 * @throws {Error} - If file is invalid
 */
const validateFile = (file) => {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
    const maxSizeMB = (MAX_FILE_SIZE / (1024 * 1024)).toFixed(0);
    throw new Error(`File is too large (${fileSizeMB}MB). Maximum allowed size is ${maxSizeMB}MB. Please compress or use a smaller image.`);
  }

  // Check file type
  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm', 'video/quicktime'];
  if (!validTypes.includes(file.type)) {
    throw new Error('Invalid file type. Please upload JPG, PNG, WebP, GIF, or MP4/WebM videos.');
  }
};

/**
 * Upload image or video to Cloudinary
 * @param {File} file - File from file input
 * @returns {Promise<string>} - URL of uploaded file
 */
export const uploadToCloudinary = async (file) => {
  try {
    // Validate file first
    validateFile(file);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    console.log('Starting upload:', { 
      cloudName: CLOUDINARY_CLOUD_NAME, 
      preset: CLOUDINARY_UPLOAD_PRESET,
      fileName: file.name,
      fileType: file.type,
      fileSize: (file.size / (1024 * 1024)).toFixed(2) + 'MB'
    });

    // Determine the resource_type. 'auto' usually works, but explicit 'video'/'image' is safer.
    const resourceType = file.type.startsWith('video/') ? 'video' : 'image';

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Cloudinary error response:', data);
      throw new Error(data.error?.message || `Upload failed: ${response.status}`);
    }

    console.log('Upload successful:', data.secure_url);
    return data.secure_url; // Returns the image URL
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

/**
 * Upload multiple images to Cloudinary
 * @param {FileList} files - Multiple image files
 * @returns {Promise<string[]>} - Array of image URLs
 */
export const uploadMultipleToCloudinary = async (files) => {
  try {
    const uploadPromises = Array.from(files).map(file => uploadToCloudinary(file));
    const urls = await Promise.all(uploadPromises);
    return urls;
  } catch (error) {
    console.error('Multiple upload error:', error);
    throw error;
  }
};
