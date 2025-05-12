
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import ImageUploader from "@/components/ImageUploader";
import { 
  maintainAspectRatio, 
  resizeImage, 
  presetSizes, 
  ImageDimensions 
} from "@/utils/imageUtils";

const Resize = () => {
  const navigate = useNavigate();
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [keepAspectRatio, setKeepAspectRatio] = useState<boolean>(true);
  const [resizedImageSrc, setResizedImageSrc] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  
  const handleImageLoad = (img: HTMLImageElement, file: File) => {
    setOriginalImage(img);
    setOriginalFile(file);
    setWidth(img.width);
    setHeight(img.height);
    setResizedImageSrc(null);
  };
  
  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = parseInt(e.target.value, 10) || 0;
    setWidth(newWidth);
    
    if (keepAspectRatio && originalImage) {
      const aspectRatio = originalImage.width / originalImage.height;
      setHeight(Math.round(newWidth / aspectRatio));
    }
  };
  
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = parseInt(e.target.value, 10) || 0;
    setHeight(newHeight);
    
    if (keepAspectRatio && originalImage) {
      const aspectRatio = originalImage.width / originalImage.height;
      setWidth(Math.round(newHeight * aspectRatio));
    }
  };
  
  const handlePresetSelect = (preset: { width: number; height: number }) => {
    if (keepAspectRatio && originalImage) {
      const aspectRatio = originalImage.width / originalImage.height;
      
      // Fit within preset dimensions while maintaining aspect ratio
      if (preset.width / aspectRatio <= preset.height) {
        setWidth(preset.width);
        setHeight(Math.round(preset.width / aspectRatio));
      } else {
        setHeight(preset.height);
        setWidth(Math.round(preset.height * aspectRatio));
      }
    } else {
      setWidth(preset.width);
      setHeight(preset.height);
    }
  };
  
  const handleResize = () => {
    if (!originalImage) {
      toast.error("Please upload an image first");
      return;
    }
    
    if (width <= 0 || height <= 0) {
      toast.error("Width and height must be greater than 0");
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const dimensions: ImageDimensions = { width, height };
      const resizedImageData = resizeImage(originalImage, dimensions);
      setResizedImageSrc(resizedImageData);
      toast.success("Image resized successfully!");
    } catch (error) {
      toast.error("Failed to resize image. Please try again.");
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleGoToPreview = () => {
    if (resizedImageSrc && originalFile) {
      // Store data in session storage to pass to preview page
      sessionStorage.setItem('editedImageSrc', resizedImageSrc);
      sessionStorage.setItem('originalFileName', originalFile.name);
      sessionStorage.setItem('dimensions', JSON.stringify({ width, height }));
      navigate('/preview');
    } else {
      toast.error("Please resize an image first");
    }
  };
  
  const resetImage = () => {
    if (originalImage) {
      setWidth(originalImage.width);
      setHeight(originalImage.height);
      setResizedImageSrc(null);
    }
  };
  
  return (
    <div className="editor-container content-area pb-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Resize Image</h1>
        <p className="text-muted-foreground">
          Change your image dimensions while maintaining quality
        </p>
      </div>
      
      {!originalImage ? (
        <ImageUploader onImageLoad={handleImageLoad} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Original Image Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">
                  {resizedImageSrc ? "Result" : "Original Image"}
                </h2>
                <div className="text-sm text-muted-foreground">
                  {width} × {height} px
                </div>
              </div>
              
              <div className="canvas-container bg-gray-100 flex items-center justify-center overflow-hidden max-h-[500px]">
                <img
                  src={resizedImageSrc || originalImage.src}
                  alt={resizedImageSrc ? "Resized image" : "Original image"}
                  className="max-w-full max-h-[500px] object-contain"
                />
              </div>
            </div>
            
            {resizedImageSrc && (
              <div className="mt-4 flex justify-center space-x-4">
                <Button onClick={resetImage} variant="outline">
                  Reset Changes
                </Button>
                <Button onClick={handleGoToPreview}>
                  Continue to Download
                </Button>
              </div>
            )}
          </div>
          
          {/* Resize Controls */}
          <div>
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h2 className="text-lg font-medium mb-4">Resize Options</h2>
              
              <Tabs defaultValue="dimensions">
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="dimensions">Custom Size</TabsTrigger>
                  <TabsTrigger value="presets">Presets</TabsTrigger>
                </TabsList>
                
                {/* Custom Dimensions */}
                <TabsContent value="dimensions">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="width">Width (px)</Label>
                        <Input
                          id="width"
                          type="number"
                          value={width || ""}
                          onChange={handleWidthChange}
                          min="1"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="height">Height (px)</Label>
                        <Input
                          id="height"
                          type="number"
                          value={height || ""}
                          onChange={handleHeightChange}
                          min="1"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="aspect-ratio"
                        checked={keepAspectRatio}
                        onCheckedChange={setKeepAspectRatio}
                      />
                      <Label htmlFor="aspect-ratio">
                        Maintain aspect ratio
                      </Label>
                    </div>
                    
                    <div className="pt-2">
                      <p className="text-sm text-muted-foreground mb-2">Original size:</p>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => {
                            if (originalImage) {
                              setWidth(originalImage.width);
                              setHeight(originalImage.height);
                            }
                          }}
                          className="text-xs"
                        >
                          {originalImage?.width} × {originalImage?.height} px
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => {
                            if (originalImage) {
                              setWidth(Math.round(originalImage.width / 2));
                              setHeight(Math.round(originalImage.height / 2));
                            }
                          }}
                          className="text-xs"
                        >
                          50%
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => {
                            if (originalImage) {
                              setWidth(Math.round(originalImage.width / 4));
                              setHeight(Math.round(originalImage.height / 4));
                            }
                          }}
                          className="text-xs"
                        >
                          25%
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Preset Sizes */}
                <TabsContent value="presets">
                  <div className="space-y-2">
                    {presetSizes.map((preset, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full justify-between mb-2 py-2"
                        onClick={() => handlePresetSelect(preset)}
                      >
                        <span>{preset.name}</span>
                        <span className="text-muted-foreground text-xs">
                          {preset.width} × {preset.height}
                        </span>
                      </Button>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
              
              <Separator className="my-6" />
              
              <Button 
                onClick={handleResize} 
                disabled={isProcessing || !originalImage}
                className="w-full"
              >
                {isProcessing ? "Processing..." : "Resize Image"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resize;
