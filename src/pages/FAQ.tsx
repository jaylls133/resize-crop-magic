
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FAQ = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Frequently Asked Questions</h1>
        <p className="text-muted-foreground mb-8">
          Find answers to common questions about Image Editor Pro
        </p>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg">How does Image Editor Pro work?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <p>Image Editor Pro works entirely in your web browser using JavaScript and HTML5 Canvas technology. 
              When you upload an image, it's processed locally on your device without sending data to any servers. 
              This ensures both privacy and speed.</p>
              <p className="mt-2">The app uses efficient algorithms to resize, crop, and convert your images 
              while maintaining the highest possible quality.</p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg">Is my image uploaded to a server?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              No, all image processing is done locally in your browser. Your images never leave your device, 
              ensuring complete privacy and faster processing times. This "client-side" approach means your 
              data stays with you at all times.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg">What image formats are supported?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Our tool supports all common image formats including JPG, PNG, WEBP, and GIF. 
              You can also convert between these formats easily using the format selection dropdown 
              on the preview page before downloading.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg">Will resizing reduce my image quality?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <p>We use high-quality algorithms to maintain image quality during resizing. 
              However, when significantly reducing image dimensions, some quality loss is unavoidable.</p>
              <p className="mt-2">For best results:</p>
              <ul className="list-disc pl-6 mt-1">
                <li>Avoid upscaling images to dimensions larger than the original</li>
                <li>Use appropriate compression settings for your needs</li>
                <li>Choose the right file format (PNG for graphics, JPG for photos)</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-lg">Is there a file size limit?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Since all processing happens in your browser, the file size limit depends on your device's memory. 
              Most modern devices can easily handle images up to 20MB. For very large images, you may experience 
              slower performance. If you're working with extremely large files, consider breaking your editing 
              task into smaller steps.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-6">
            <AccordionTrigger className="text-lg">Can I use this tool for commercial purposes?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Yes! Image Editor Pro is free for both personal and commercial use. There are no restrictions 
              on how you use your edited images. Whether you're preparing graphics for your business, 
              social media content, or personal projects, you're free to use our tool.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-7">
            <AccordionTrigger className="text-lg">What are the social media presets for?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Our social media presets automatically configure the perfect dimensions for various platforms. 
              This saves you time researching the current recommended image sizes for each network. 
              We regularly update these presets to match the latest requirements from major social media platforms.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-8">
            <AccordionTrigger className="text-lg">How can I compress my images?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              After resizing or cropping your image, you can adjust the compression level on the preview page 
              using the quality slider. Lower quality settings will produce smaller file sizes, which is 
              useful for web publishing and email attachments. For most web uses, a quality setting of 
              70-80% provides a good balance between file size and image quality.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-9">
            <AccordionTrigger className="text-lg">Can I batch process multiple images?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Currently, Image Editor Pro processes one image at a time. This allows us to maintain the 
              highest quality results and provide a user-friendly interface. Batch processing may be 
              added in future updates based on user feedback.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-10">
            <AccordionTrigger className="text-lg">How does the format conversion work?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <p>Our format conversion uses web standards to transform your images between different file types. 
              Each format has specific advantages:</p>
              <ul className="list-disc pl-6 mt-2">
                <li><strong>JPG:</strong> Best for photographs and complex images with many colors</li>
                <li><strong>PNG:</strong> Supports transparency and is ideal for graphics, logos, and text</li>
                <li><strong>WebP:</strong> Modern format with superior compression, good for web use</li>
              </ul>
              <p className="mt-2">You can select your preferred format on the preview page before downloading.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <div className="mt-12 text-center">
          <h2 className="text-xl font-bold mb-4">Ready to edit your images?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/resize">Start Resizing</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/crop">Start Cropping</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
