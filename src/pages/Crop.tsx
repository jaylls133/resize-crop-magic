
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import ImageUploader from "@/components/ImageUploader";
import { cropImage, commonAspectRatios } from "@/utils/imageUtils";

interface CropBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

const Crop = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [aspectRatio, setAspectRatio] = useState<string>("free");
  const [cropBox, setCropBox] = useState<CropBox | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [croppedImageSrc, setCroppedImageSrc] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [canvasScale, setCanvasScale] = useState<number>(1);
  
  // Setup canvas when image is loaded
  useEffect(() => {
    if (!originalImage || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Scale down large images to fit in the canvas container
    const maxCanvasWidth = 640;
    const scale = originalImage.width > maxCanvasWidth 
      ? maxCanvasWidth / originalImage.width 
      : 1;
    
    setCanvasScale(scale);
    
    canvas.width = originalImage.width * scale;
    canvas.height = originalImage.height * scale;
    
    // Draw the image on the canvas
    ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);
    
    // Set initial crop box to the center 80% of the image
    const initialWidth = canvas.width * 0.8;
    const initialHeight = aspectRatio === "free" 
      ? canvas.height * 0.8 
      : getHeightFromAspectRatio(initialWidth);
    
    setCropBox({
      x: (canvas.width - initialWidth) / 2,
      y: (canvas.height - initialHeight) / 2,
      width: initialWidth,
      height: initialHeight
    });
  }, [originalImage, aspectRatio]);
  
  // Redraw canvas when crop box changes
  useEffect(() => {
    if (!originalImage || !canvasRef.current || !cropBox) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Clear and redraw image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);
    
    // Draw crop overlay
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw crop box (clear the overlay in crop area)
    ctx.clearRect(cropBox.x, cropBox.y, cropBox.width, cropBox.height);
    
    // Draw border around crop box
    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 2;
    ctx.strokeRect(cropBox.x, cropBox.y, cropBox.width, cropBox.height);
    
    // Draw handles at corners and sides
    drawHandle(ctx, cropBox.x, cropBox.y);
    drawHandle(ctx, cropBox.x + cropBox.width, cropBox.y);
    drawHandle(ctx, cropBox.x, cropBox.y + cropBox.height);
    drawHandle(ctx, cropBox.x + cropBox.width, cropBox.y + cropBox.height);
    
  }, [originalImage, cropBox]);
  
  const drawHandle = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    const size = 8;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(x - size / 2, y - size / 2, size, size);
    ctx.strokeRect(x - size / 2, y - size / 2, size, size);
  };
  
  const getHeightFromAspectRatio = (width: number): number => {
    if (aspectRatio === "free" || !canvasRef.current) {
      return width; // Default to square if free or no canvas
    }
    
    const [widthRatio, heightRatio] = aspectRatio.split(":").map(Number);
    return (width * heightRatio) / widthRatio;
  };
  
  const handleImageLoad = (img: HTMLImageElement, file: File) => {
    setOriginalImage(img);
    setOriginalFile(file);
    setCroppedImageSrc(null);
  };
  
  const handleAspectRatioChange = (value: string) => {
    setAspectRatio(value);
    
    // Update crop box with new aspect ratio
    if (cropBox && canvasRef.current) {
      const newHeight = value === "free" 
        ? cropBox.height 
        : getHeightFromAspectRatio(cropBox.width);
      
      setCropBox({
        ...cropBox,
        height: newHeight,
        y: Math.min(cropBox.y, canvasRef.current.height - newHeight)
      });
    }
  };
  
  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !cropBox) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if click is inside the crop box
    if (
      x >= cropBox.x &&
      x <= cropBox.x + cropBox.width &&
      y >= cropBox.y &&
      y <= cropBox.y + cropBox.height
    ) {
      setIsDragging(true);
      setDragStart({ x, y });
    }
  };
  
  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !canvasRef.current || !cropBox) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const deltaX = x - dragStart.x;
    const deltaY = y - dragStart.y;
    
    // Calculate new position
    let newX = cropBox.x + deltaX;
    let newY = cropBox.y + deltaY;
    
    // Boundary checks
    newX = Math.max(0, Math.min(newX, canvas.width - cropBox.width));
    newY = Math.max(0, Math.min(newY, canvas.height - cropBox.height));
    
    setCropBox({
      ...cropBox,
      x: newX,
      y: newY
    });
    
    setDragStart({ x, y });
  };
  
  const handleCanvasMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleCrop = () => {
    if (!originalImage || !cropBox) {
      toast.error("Please upload an image and create a crop area");
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Scale crop box back to original image dimensions
      const scaledCropBox = {
        x: cropBox.x / canvasScale,
        y: cropBox.y / canvasScale,
        width: cropBox.width / canvasScale,
        height: cropBox.height / canvasScale
      };
      
      const croppedImageData = cropImage(originalImage, scaledCropBox);
      setCroppedImageSrc(croppedImageData);
      toast.success("Image cropped successfully!");
    } catch (error) {
      toast.error("Failed to crop image. Please try again.");
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleGoToPreview = () => {
    if (croppedImageSrc && originalFile) {
      // Store data in session storage to pass to preview page
      sessionStorage.setItem('editedImageSrc', croppedImageSrc);
      sessionStorage.setItem('originalFileName', originalFile.name);
      
      // Store crop dimensions
      if (cropBox) {
        const dimensions = {
          width: Math.round(cropBox.width / canvasScale),
          height: Math.round(cropBox.height / canvasScale)
        };
        sessionStorage.setItem('dimensions', JSON.stringify(dimensions));
      }
      
      navigate('/preview');
    } else {
      toast.error("Please crop an image first");
    }
  };
  
  const resetImage = () => {
    if (originalImage && canvasRef.current) {
      setCroppedImageSrc(null);
      
      // Reset canvas
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);
      }
      
      // Reset crop box to initial state
      const initialWidth = canvas.width * 0.8;
      const initialHeight = aspectRatio === "free" 
        ? canvas.height * 0.8 
        : getHeightFromAspectRatio(initialWidth);
      
      setCropBox({
        x: (canvas.width - initialWidth) / 2,
        y: (canvas.height - initialHeight) / 2,
        width: initialWidth,
        height: initialHeight
      });
    }
  };
  
  return (
    <div className="editor-container content-area pb-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Crop Image</h1>
        <p className="text-muted-foreground">
          Select and crop a specific area of your image
        </p>
      </div>
      
      {!originalImage ? (
        <ImageUploader onImageLoad={handleImageLoad} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Image Preview / Canvas Area */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">
                  {croppedImageSrc ? "Cropped Result" : "Select Crop Area"}
                </h2>
                {cropBox && (
                  <div className="text-sm text-muted-foreground">
                    {Math.round(cropBox.width / canvasScale)} × {Math.round(cropBox.height / canvasScale)} px
                  </div>
                )}
              </div>
              
              <div className="canvas-container bg-gray-100 flex items-center justify-center overflow-hidden">
                {croppedImageSrc ? (
                  <img
                    src={croppedImageSrc}
                    alt="Cropped image"
                    className="max-w-full max-h-[500px] object-contain"
                  />
                ) : (
                  <canvas
                    ref={canvasRef}
                    className="max-w-full max-h-[500px]"
                    onMouseDown={handleCanvasMouseDown}
                    onMouseMove={handleCanvasMouseMove}
                    onMouseUp={handleCanvasMouseUp}
                    onMouseLeave={handleCanvasMouseUp}
                  />
                )}
              </div>
              
              {!croppedImageSrc && (
                <div className="text-sm text-muted-foreground mt-2 text-center">
                  Click and drag to move the crop area
                </div>
              )}
            </div>
            
            {croppedImageSrc && (
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
          
          {/* Crop Controls */}
          <div>
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h2 className="text-lg font-medium mb-4">Crop Options</h2>
              
              <div className="space-y-4">
                <div>
                  <Label className="mb-2 block">Aspect Ratio</Label>
                  <RadioGroup
                    value={aspectRatio}
                    onValueChange={handleAspectRatioChange}
                    className="space-y-2"
                  >
                    {commonAspectRatios.map((ratio) => (
                      <div
                        key={ratio.value}
                        className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-gray-50"
                      >
                        <RadioGroupItem value={ratio.value} id={ratio.value} />
                        <Label
                          htmlFor={ratio.value}
                          className="flex-1 cursor-pointer"
                        >
                          {ratio.name}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                <Separator className="my-6" />
                
                <Button
                  onClick={handleCrop}
                  disabled={isProcessing || !originalImage || !cropBox}
                  className="w-full"
                >
                  {isProcessing ? "Processing..." : "Crop Image"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Crop;
