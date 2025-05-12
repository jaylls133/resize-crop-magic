
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ImageUploaderProps {
  onImageLoad: (image: HTMLImageElement, file: File) => void;
  accept?: string;
  maxSizeMB?: number;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageLoad,
  accept = "image/jpeg, image/png, image/webp, image/gif",
  maxSizeMB = 10
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      processFile(files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const files = event.dataTransfer.files;
    if (files && files[0]) {
      processFile(files[0]);
    }
  };

  const processFile = (file: File) => {
    // Check file type
    const fileType = file.type;
    const validTypes = accept.split(", ");

    if (!validTypes.includes(fileType)) {
      toast.error("Unsupported file type. Please upload a valid image.");
      return;
    }

    // Check file size
    if (file.size > maxSizeBytes) {
      toast.error(`File is too large. Maximum size is ${maxSizeMB}MB.`);
      return;
    }

    setIsLoading(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        onImageLoad(img, file);
        setIsLoading(false);
      };
      img.onerror = () => {
        toast.error("Failed to load image. Please try another file.");
        setIsLoading(false);
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      toast.error("Error reading file. Please try again.");
      setIsLoading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className={`canvas-container min-h-[300px] ${
        isDragging ? "border-primary bg-primary/5" : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="text-center">
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-muted-foreground mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-xl font-medium mb-1">
            {isDragging ? "Drop image here" : "Drag & drop your image"}
          </p>
          <p className="text-muted-foreground mb-4">
            or click to browse files
          </p>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept={accept}
            onChange={handleFileChange}
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            className="min-w-[120px]"
          >
            {isLoading ? "Loading..." : "Browse Files"}
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            Max file size: {maxSizeMB}MB
          </p>
          <div className="text-sm text-muted-foreground mt-4">
            Supported formats: JPEG, PNG, WebP, GIF
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
