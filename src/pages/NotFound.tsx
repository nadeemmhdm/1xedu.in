import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-secondary rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center px-4 relative z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-9xl font-display font-bold gradient-text mb-4"
        >
          404
        </motion.div>
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
          Page Not Found
        </h1>
        <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="btn-primary-gradient px-8 py-6 text-lg">
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="px-8 py-6 text-lg"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
