
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { 
  downloadImage, 
  formatFileSize, 
  getFileExtension, 
  imageFormatOptions, 
  compressImage, 
  convertImageFormat,
  getFileSizeFromBase64
} from "@/utils/imageUtils";

const Preview = () => {
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [originalImageSrc, setOriginalImageSrc] = useState<string | null>(null);
  const [originalFileName, setOriginalFileName] = useState<string>("");
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  const [fileSize, setFileSize] = useState<string>("");
  const [fileFormat, setFileFormat] = useState<string>("image/png");
  const [compressionQuality, setCompressionQuality] = useState<number>(92);
  const [imageAltText, setImageAltText] = useState<string>("");
  const [editType, setEditType] = useState<string>("");
  
  useEffect(() => {
    // Get data from session storage
    const storedImageSrc = sessionStorage.getItem('editedImageSrc');
    const storedOriginalImageSrc = sessionStorage.getItem('originalImageSrc');
    const storedFileName = sessionStorage.getItem('originalFileName');
    const storedDimensions = sessionStorage.getItem('dimensions');
    const storedEditType = sessionStorage.getItem('editType') || "edited";
    
    if (!storedImageSrc || !storedFileName) {
      toast.error("No image data found. Please edit an image first.");
      navigate('/');
      return;
    }
    
    setImageSrc(storedImageSrc);
    setOriginalImageSrc(storedOriginalImageSrc);
    setOriginalFileName(storedFileName);
    setEditType(storedEditType);
    
    // Generate SEO-friendly alt text
    const baseAltText = storedFileName.replace(/\.[^/.]+$/, "");
    setImageAltText(`${storedEditType} version of ${baseAltText} image`);
    
    if (storedDimensions) {
      setDimensions(JSON.parse(storedDimensions));
    }
    
    // Calculate file size from base64 string
    const base64Length = storedImageSrc.split(',')[1].length;
    const sizeInBytes = (base64Length * 0.75);
    setFileSize(formatFileSize(sizeInBytes));
    
    // Determine format from data URL
    if (storedImageSrc.includes('image/jpeg')) {
      setFileFormat('image/jpeg');
    } else if (storedImageSrc.includes('image/png')) {
      setFileFormat('image/png');
    } else if (storedImageSrc.includes('image/webp')) {
      setFileFormat('image/webp');
    }
  }, [navigate]);
  
  const handleDownload = () => {
    if (!imageSrc || !originalFileName) return;
    
    // Get the extension based on the selected format
    const formatOption = imageFormatOptions.find(option => option.value === fileFormat);
    const extension = formatOption ? formatOption.extension : getFileExtension(originalFileName);
    
    const fileName = originalFileName.replace(/\.[^/.]+$/, "") + `-${editType}.${extension}`;
    
    downloadImage(imageSrc, fileName);
    toast.success(`Image downloaded as ${fileName}`);
  };
  
  const handleFormatChange = (value: string) => {
    if (!originalImageSrc) return;
    
    setFileFormat(value);
    
    // Create temporary image to convert format
    const img = new Image();
    img.onload = () => {
      const convertedImageData = convertImageFormat(img, value as any, compressionQuality / 100);
      setImageSrc(convertedImageData);
      
      // Update file size
      const base64Length = convertedImageData.split(',')[1].length;
      const sizeInBytes = (base64Length * 0.75);
      setFileSize(formatFileSize(sizeInBytes));
    };
    img.src = originalImageSrc;
  };
  
  const handleCompressionChange = (value: number[]) => {
    if (!originalImageSrc) return;
    
    const quality = value[0];
    setCompressionQuality(quality);
    
    // Create temporary image to compress
    const img = new Image();
    img.onload = () => {
      const compressedImageData = convertImageFormat(img, fileFormat as any, quality / 100);
      setImageSrc(compressedImageData);
      
      // Update file size
      const base64Length = compressedImageData.split(',')[1].length;
      const sizeInBytes = (base64Length * 0.75);
      setFileSize(formatFileSize(sizeInBytes));
    };
    img.src = originalImageSrc;
  };
  
  const handleEditAgain = () => {
    navigate(-1); // Go back to the previous page (resize or crop)
  };
  
  const handleNewImage = () => {
    // Clear session storage
    sessionStorage.removeItem('editedImageSrc');
    sessionStorage.removeItem('originalImageSrc');
    sessionStorage.removeItem('originalFileName');
    sessionStorage.removeItem('dimensions');
    sessionStorage.removeItem('editType');
    
    // Redirect to home
    navigate('/');
  };
  
  if (!imageSrc) {
    return (
      <div className="editor-container content-area pb-16 flex items-center justify-center">
        <p>Loading preview...</p>
      </div>
    );
  }
  
  return (
    <div className="editor-container content-area pb-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Preview & Download</h1>
        <p className="text-muted-foreground">
          Your image is ready to download
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Image Preview */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Final Result</h2>
                {dimensions && (
                  <div className="text-sm text-muted-foreground">
                    {dimensions.width} × {dimensions.height} px
                  </div>
                )}
              </div>
              
              <div className="canvas-container bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  src={imageSrc}
                  alt={imageAltText}
                  className="max-w-full max-h-[500px] object-contain"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">{imageAltText}</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Download Card */}
        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-medium mb-4">Download Options</h2>
              
              <div className="space-y-6">
                <div className="space-y-1">
                  <p className="text-sm font-medium">File Information</p>
                  <div className="text-sm text-muted-foreground">
                    <p>Name: {originalFileName.replace(/\.[^/.]+$/, "") + `-${editType}`}</p>
                    {dimensions && <p>Dimensions: {dimensions.width} × {dimensions.height} px</p>}
                    <p>Size: {fileSize}</p>
                  </div>
                </div>

                {/* Format Options */}
                <div className="space-y-2">
                  <Label htmlFor="format">Format</Label>
                  <Select value={fileFormat} onValueChange={handleFormatChange}>
                    <SelectTrigger id="format" className="w-full">
                      <SelectValue placeholder="Select Format" />
                    </SelectTrigger>
                    <SelectContent>
                      {imageFormatOptions.map((format) => (
                        <SelectItem key={format.value} value={format.value}>
                          {format.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Compression Quality */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Quality</Label>
                    <span className="text-sm text-muted-foreground">{compressionQuality}%</span>
                  </div>
                  <Slider 
                    value={[compressionQuality]} 
                    min={10} 
                    max={100} 
                    step={1} 
                    onValueChange={handleCompressionChange}
                    className="py-4"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Lower quality = smaller file size
                  </p>
                </div>
                
                <Button onClick={handleDownload} className="w-full">
                  Download Image
                </Button>
                
                <div className="flex flex-col space-y-2">
                  <Button onClick={handleEditAgain} variant="outline">
                    Edit Again
                  </Button>
                  <Button onClick={handleNewImage} variant="ghost">
                    Start New Image
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Preview;
