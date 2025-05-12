
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            Resize & Crop Images Easily
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Simple, fast, and free browser-based image editing. No uploads required - your images stay private.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link to="/resize">Resize Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-white/10 hover:bg-white/20 text-white border-white/20">
              <Link to="/crop">Crop Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Simple Tools for Quick Edits
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Resize Feature */}
            <Card className="tool-card">
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <div className="mx-auto bg-primary/10 w-16 h-16 flex items-center justify-center rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <rect width="16" height="16" x="4" y="4" rx="2" />
                      <path d="M4 9h16" />
                      <path d="M9 4v16" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">Resize Images</h3>
                <p className="text-muted-foreground text-center mb-6">
                  Change dimensions to exact sizes or scale proportionally while maintaining quality.
                </p>
                <div className="flex justify-center">
                  <Button asChild variant="outline">
                    <Link to="/resize">Open Resize Tool</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Crop Feature */}
            <Card className="tool-card">
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <div className="mx-auto bg-primary/10 w-16 h-16 flex items-center justify-center rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M6 2v14a2 2 0 0 0 2 2h14" />
                      <path d="M8 16V8a2 2 0 0 1 2-2h8" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">Crop Images</h3>
                <p className="text-muted-foreground text-center mb-6">
                  Remove unwanted areas and focus on what matters with our intuitive crop tool.
                </p>
                <div className="flex justify-center">
                  <Button asChild variant="outline">
                    <Link to="/crop">Open Crop Tool</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Privacy Feature */}
            <Card className="tool-card">
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <div className="mx-auto bg-primary/10 w-16 h-16 flex items-center justify-center rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <path d="M7 12v-2a5 5 0 0 1 10 0v2" />
                      <path d="M12 14v4" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">100% Private</h3>
                <p className="text-muted-foreground text-center mb-6">
                  Your images never leave your device. All processing happens directly in your browser.
                </p>
                <div className="flex justify-center">
                  <Button asChild variant="outline">
                    <Link to="/about">Learn More</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload Image</h3>
              <p className="text-muted-foreground">
                Upload your image directly from your device with drag-and-drop or file selection.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Edit Image</h3>
              <p className="text-muted-foreground">
                Use our simple tools to resize or crop your image to your desired specifications.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Download Result</h3>
              <p className="text-muted-foreground">
                Preview your edited image and download it in high quality directly to your device.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* New: Social Media Presets Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Perfect for Social Media
          </h2>
          <p className="text-center text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
            Get your images ready for various platforms with our preset sizes
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="text-center">
              <CardContent className="p-4">
                <h3 className="font-medium">Instagram Post</h3>
                <p className="text-xs text-muted-foreground">1080 × 1080 px</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <h3 className="font-medium">Facebook Post</h3>
                <p className="text-xs text-muted-foreground">1200 × 630 px</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <h3 className="font-medium">Twitter Post</h3>
                <p className="text-xs text-muted-foreground">1200 × 675 px</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <h3 className="font-medium">LinkedIn Banner</h3>
                <p className="text-xs text-muted-foreground">1584 × 396 px</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-8">
            <Button asChild>
              <Link to="/resize">Try Resizing Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section - SEO Rich Snippets */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is my image uploaded to a server?</AccordionTrigger>
                <AccordionContent>
                  No, all image processing is done locally in your browser. Your images never leave your device, 
                  ensuring complete privacy and faster processing times.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>What image formats are supported?</AccordionTrigger>
                <AccordionContent>
                  Our tool supports all common image formats including JPG, PNG, WEBP, and GIF. 
                  You can also convert between these formats easily.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>Will resizing reduce my image quality?</AccordionTrigger>
                <AccordionContent>
                  We use high-quality algorithms to maintain image quality during resizing. 
                  However, when significantly reducing image dimensions, some quality loss is unavoidable. 
                  For best results, avoid upscaling images to dimensions larger than the original.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>Is there a file size limit?</AccordionTrigger>
                <AccordionContent>
                  Since all processing happens in your browser, the file size limit depends on your device's memory. 
                  Most modern devices can easily handle images up to 20MB. For very large images, you may experience 
                  slower performance.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>Can I use this tool for commercial purposes?</AccordionTrigger>
                <AccordionContent>
                  Yes! Image Editor Pro is free for both personal and commercial use. There are no restrictions 
                  on how you use your edited images.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Ready to Edit Your Images?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link to="/resize">Resize Images</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <Link to="/crop">Crop Images</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
