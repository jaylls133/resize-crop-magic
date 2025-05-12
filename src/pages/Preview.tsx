
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { downloadImage, formatFileSize, getFileExtension } from "@/utils/imageUtils";

const Preview = () => {
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [originalFileName, setOriginalFileName] = useState<string>("");
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  const [fileSize, setFileSize] = useState<string>("");
  
  useEffect(() => {
    // Get data from session storage
    const storedImageSrc = sessionStorage.getItem('editedImageSrc');
    const storedFileName = sessionStorage.getItem('originalFileName');
    const storedDimensions = sessionStorage.getItem('dimensions');
    
    if (!storedImageSrc || !storedFileName) {
      toast.error("No image data found. Please edit an image first.");
      navigate('/');
      return;
    }
    
    setImageSrc(storedImageSrc);
    setOriginalFileName(storedFileName);
    
    if (storedDimensions) {
      setDimensions(JSON.parse(storedDimensions));
    }
    
    // Calculate file size from base64 string
    const base64Length = storedImageSrc.split(',')[1].length;
    const sizeInBytes = (base64Length * 0.75);
    setFileSize(formatFileSize(sizeInBytes));
  }, [navigate]);
  
  const handleDownload = () => {
    if (!imageSrc || !originalFileName) return;
    
    // Get file extension or default to png
    const extension = getFileExtension(originalFileName) || "png";
    const fileName = originalFileName.replace(/\.[^/.]+$/, "") + "-edited." + extension;
    
    downloadImage(imageSrc, fileName);
    toast.success(`Image downloaded as ${fileName}`);
  };
  
  const handleEditAgain = () => {
    navigate(-1); // Go back to the previous page (resize or crop)
  };
  
  const handleNewImage = () => {
    // Clear session storage
    sessionStorage.removeItem('editedImageSrc');
    sessionStorage.removeItem('originalFileName');
    sessionStorage.removeItem('dimensions');
    
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
                  alt="Edited image"
                  className="max-w-full max-h-[500px] object-contain"
                />
              </div>
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
                    <p>Name: {originalFileName.replace(/\.[^/.]+$/, "") + "-edited." + getFileExtension(originalFileName)}</p>
                    {dimensions && <p>Dimensions: {dimensions.width} × {dimensions.height} px</p>}
                    <p>Size: {fileSize}</p>
                  </div>
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
