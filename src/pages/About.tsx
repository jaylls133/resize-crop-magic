
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="editor-container content-area pb-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">About Image Editor Pro</h1>
        <p className="text-muted-foreground">
          Learn how our image editor works and how we handle your data
        </p>
      </div>
      
      <div className="space-y-8 max-w-4xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
            <p className="mb-4">
              Image Editor Pro is a browser-based image editing tool that lets you resize and crop images directly in your browser. 
              Here's how the process works:
            </p>
            
            <ol className="list-decimal list-inside space-y-2 mb-4">
              <li className="ml-4">
                <span className="font-medium">Upload:</span> Select an image from your device. The image stays in your browser and is never uploaded to our servers.
              </li>
              <li className="ml-4">
                <span className="font-medium">Edit:</span> Use our simple tools to resize or crop the image. All processing happens locally using JavaScript and the HTML5 Canvas API.
              </li>
              <li className="ml-4">
                <span className="font-medium">Download:</span> Save the edited image directly to your device. No account required.
              </li>
            </ol>
            
            <p>
              Our goal is to provide a simple, accessible tool for everyday image editing needs, without requiring complex software installations or accounts.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Privacy & Data</h2>
            <p className="mb-4">
              At Image Editor Pro, we take your privacy seriously. Here's our commitment to you:
            </p>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">100% Client-Side Processing</h3>
                <p className="text-muted-foreground">
                  All image processing happens entirely within your browser. Your images are never sent to our servers or stored anywhere outside your device.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">No Data Collection</h3>
                <p className="text-muted-foreground">
                  We don't collect any personal information or data about the images you edit. There are no accounts, cookies, or tracking beyond basic anonymous analytics to improve the service.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Session Storage Only</h3>
                <p className="text-muted-foreground">
                  We temporarily store your edited image in your browser's session storage to enable the preview and download functionality. This data is cleared when you close the browser tab or start a new image.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Technology</h2>
            <p className="mb-4">
              This tool is built using modern web technologies:
            </p>
            
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li className="ml-4">React for the user interface</li>
              <li className="ml-4">HTML5 Canvas API for image manipulation</li>
              <li className="ml-4">Tailwind CSS for styling</li>
              <li className="ml-4">TypeScript for type safety</li>
            </ul>
            
            <p>
              The application is fully responsive and works on desktop and mobile devices.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Contact</h2>
            <p className="mb-4">
              Have questions, feedback, or encountered an issue? We'd love to hear from you!
            </p>
            
            <p className="text-muted-foreground">
              Email us at: <span className="text-primary">support@imageeditorpro.example.com</span>
            </p>
            
            <Separator className="my-6" />
            
            <div className="flex justify-center">
              <Link to="/" className="text-primary hover:underline">
                Return to Home Page
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
