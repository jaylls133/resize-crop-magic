
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t bg-white mt-auto">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Image Editor Pro</h3>
            <p className="text-muted-foreground text-sm">
              A simple, free tool for resizing and cropping images directly in your browser.
              No server uploads, no data collection.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/resize" className="text-sm text-muted-foreground hover:text-primary transition">
                  Resize Tool
                </Link>
              </li>
              <li>
                <Link to="/crop" className="text-sm text-muted-foreground hover:text-primary transition">
                  Crop Tool
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition">
                  About & Privacy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Privacy</h3>
            <p className="text-muted-foreground text-sm">
              Your images are processed locally in your browser.
              We don't upload, store, or have access to any of your images.
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Image Editor Pro. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition">
              Privacy Policy
            </Link>
            <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
