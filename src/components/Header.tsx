import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";
import logoColor from "@/assets/logo-color.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Register", path: "/register" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-lg shadow-lg py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="relative z-10">
            <motion.img
              src={isScrolled ? logoColor : logoWhite}
              alt="1XEdu"
              className="h-10 md:h-12 w-auto transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-medium transition-all duration-300 ${
                  isScrolled
                    ? isActive(link.path)
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                    : isActive(link.path)
                    ? "text-accent"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-current rounded-full"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:9946211243"
              className={`flex items-center gap-2 font-medium transition-all duration-300 ${
                isScrolled ? "text-foreground" : "text-white/90"
              }`}
            >
              <Phone className="w-4 h-4" />
              <span>9946211243</span>
            </a>
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary-gradient px-6 py-2.5 rounded-full text-sm"
              >
                Register Now
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden z-50 p-2 transition-colors ${
              isScrolled || isMobileMenuOpen ? "text-foreground" : "text-white"
            }`}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-lg lg:hidden pt-24"
          >
            <nav className="container mx-auto px-4 flex flex-col items-center gap-6 py-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className={`text-2xl font-display font-medium transition-colors ${
                      isActive(link.path)
                        ? "text-primary"
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-4"
              >
                <Link to="/register">
                  <button className="btn-primary-gradient px-8 py-3 rounded-full text-lg">
                    Register Now
                  </button>
                </Link>
              </motion.div>
              <motion.a
                href="tel:9946211243"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2 text-muted-foreground"
              >
                <Phone className="w-5 h-5" />
                <span>9946211243</span>
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
