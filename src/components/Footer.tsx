import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";

const Footer = () => {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Register", path: "/register" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <img src={logoWhite} alt="1XEdu" className="h-12 w-auto" />
            <p className="text-secondary-foreground/80 leading-relaxed">
              Where Education Meets Opportunity. A premium one-on-one business networking event for education professionals.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-display text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-secondary-foreground/80 hover:text-primary transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Event Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-display text-xl font-semibold mb-6">Event Details</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Venue</p>
                  <p className="text-secondary-foreground/70 text-sm">Taj Hotel, Bangalore</p>
                </div>
              </li>
              <li className="text-secondary-foreground/80">
                <span className="font-medium text-white">Date:</span> 14th February 2026
              </li>
              <li className="text-secondary-foreground/80">
                <span className="font-medium text-white">Duration:</span> 5 Hours
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="font-display text-xl font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:9946211243"
                  className="flex items-center gap-3 text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Call / WhatsApp</p>
                    <p className="text-sm">9946211243</p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@1xedu.com"
                  className="flex items-center gap-3 text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Email</p>
                    <p className="text-sm">info@1xedu.com</p>
                  </div>
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-secondary-foreground/60 text-sm">
            © 2026 1XEdu Business Meet. All rights reserved.
          </p>
          <p className="text-secondary-foreground/60 text-sm">
            Where Education Meets Opportunity
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
