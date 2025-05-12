
export interface ImageDimensions {
  width: number;
  height: number;
}

/**
 * Resize an image to specified dimensions
 */
export const resizeImage = (
  image: HTMLImageElement,
  dimensions: ImageDimensions
): string => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = dimensions.width;
  canvas.height = dimensions.height;
  
  if (ctx) {
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(image, 0, 0, dimensions.width, dimensions.height);
  }
  
  return canvas.toDataURL('image/png');
};

/**
 * Crop an image using specified coordinates and dimensions
 */
export const cropImage = (
  image: HTMLImageElement,
  cropBox: { x: number; y: number; width: number; height: number }
): string => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = cropBox.width;
  canvas.height = cropBox.height;
  
  if (ctx) {
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(
      image,
      cropBox.x,
      cropBox.y,
      cropBox.width,
      cropBox.height,
      0,
      0,
      cropBox.width,
      cropBox.height
    );
  }
  
  return canvas.toDataURL('image/png');
};

/**
 * Calculate dimensions that maintain aspect ratio
 */
export const maintainAspectRatio = (
  originalWidth: number,
  originalHeight: number,
  targetWidth?: number,
  targetHeight?: number
): ImageDimensions => {
  const aspectRatio = originalWidth / originalHeight;
  
  if (targetWidth && !targetHeight) {
    return {
      width: targetWidth,
      height: Math.round(targetWidth / aspectRatio)
    };
  } else if (!targetWidth && targetHeight) {
    return {
      width: Math.round(targetHeight * aspectRatio),
      height: targetHeight
    };
  } else if (targetWidth && targetHeight) {
    // Both dimensions specified, returning as is
    return {
      width: targetWidth,
      height: targetHeight
    };
  }
  
  // Default: return original dimensions
  return {
    width: originalWidth,
    height: originalHeight
  };
};

/**
 * Convert a base64 string to a Blob object
 */
export const dataURLtoBlob = (dataURL: string): Blob => {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new Blob([u8arr], { type: mime });
};

/**
 * Generate a download link for an image
 */
export const downloadImage = (dataURL: string, filename: string): void => {
  const blob = dataURLtoBlob(dataURL);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  
  a.href = url;
  a.download = filename || 'image';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

/**
 * Get file extension from file name
 */
export const getFileExtension = (filename: string): string => {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2) || "png";
};

/**
 * Format file size for display
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Common image aspect ratios
 */
export const commonAspectRatios = [
  { name: 'Free', value: 'free' },
  { name: 'Square (1:1)', value: '1:1' },
  { name: 'Landscape (16:9)', value: '16:9' },
  { name: 'Portrait (9:16)', value: '9:16' },
  { name: 'Classic (4:3)', value: '4:3' },
  { name: 'Photo (3:2)', value: '3:2' },
];

/**
 * Common preset image sizes
 */
export const presetSizes = [
  { name: 'Instagram Post', width: 1080, height: 1080 },
  { name: 'Facebook Post', width: 1200, height: 630 },
  { name: 'Twitter Post', width: 1200, height: 675 },
  { name: 'YouTube Thumbnail', width: 1280, height: 720 },
  { name: 'HD (1080p)', width: 1920, height: 1080 },
  { name: 'Website Banner', width: 1200, height: 400 },
  { name: 'Profile Picture', width: 400, height: 400 },
  { name: 'LinkedIn Banner', width: 1584, height: 396 }
];

/**
 * New: Convert image format
 */
export const convertImageFormat = (
  image: HTMLImageElement,
  format: 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif',
  quality: number = 0.92
): string => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = image.width;
  canvas.height = image.height;
  
  if (ctx) {
    ctx.drawImage(image, 0, 0);
  }
  
  // Convert to the specified format with quality level (0.0 to 1.0)
  return canvas.toDataURL(format, quality);
};

/**
 * New: Compress image with specified quality
 */
export const compressImage = (
  image: HTMLImageElement,
  quality: number = 0.7
): string => {
  // Extract the format from image source if possible
  let format = 'image/jpeg';
  if (image.src.includes('image/png')) {
    format = 'image/png';
  } else if (image.src.includes('image/webp')) {
    format = 'image/webp';
  }
  
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = image.width;
  canvas.height = image.height;
  
  if (ctx) {
    ctx.drawImage(image, 0, 0);
  }
  
  // Apply compression by specifying quality
  return canvas.toDataURL(format, quality);
};

/**
 * New: Image format options
 */
export const imageFormatOptions = [
  { label: 'JPG', value: 'image/jpeg', extension: 'jpg' },
  { label: 'PNG', value: 'image/png', extension: 'png' },
  { label: 'WebP', value: 'image/webp', extension: 'webp' }
];

/**
 * New: Get file size from base64 string (approximate)
 */
export const getFileSizeFromBase64 = (base64String: string): number => {
  const base64 = base64String.split(',')[1];
  return Math.ceil((base64.length * 3) / 4);
};

/**
 * New: Social media presets with proper dimensions
 */
export const socialMediaPresets = [
  { name: 'Instagram Post', width: 1080, height: 1080, description: 'Perfect square for feed posts' },
  { name: 'Instagram Story', width: 1080, height: 1920, description: 'Vertical format for stories' },
  { name: 'Facebook Post', width: 1200, height: 630, description: 'Optimal for timeline posts' },
  { name: 'Facebook Cover', width: 851, height: 315, description: 'Page or profile cover' },
  { name: 'Twitter Post', width: 1200, height: 675, description: 'Ideal aspect ratio for tweets' },
  { name: 'LinkedIn Post', width: 1200, height: 627, description: 'Professional feed posts' },
  { name: 'LinkedIn Banner', width: 1584, height: 396, description: 'Profile banner' },
  { name: 'YouTube Thumbnail', width: 1280, height: 720, description: 'HD video thumbnail' },
  { name: 'Pinterest Pin', width: 1000, height: 1500, description: 'Vertical pin format' }
];

/**
 * New: Add alt text to an image element for accessibility and SEO
 */
export const addImageAltText = (
  imgElement: HTMLImageElement, 
  originalFileName: string, 
  editType: 'resized' | 'cropped'
): void => {
  const fileNameWithoutExtension = originalFileName.replace(/\.[^/.]+$/, "");
  imgElement.alt = `${editType} version of ${fileNameWithoutExtension}`;
};
