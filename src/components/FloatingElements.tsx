import { motion } from "framer-motion";

const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating circles */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          x: [0, 15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary/10 blur-xl"
      />
      <motion.div
        animate={{
          y: [0, 40, 0],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-1/2 right-1/4 w-48 h-48 rounded-full bg-accent/10 blur-xl"
      />
      <motion.div
        animate={{
          y: [0, -25, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-1/4 left-1/3 w-40 h-40 rounded-full bg-secondary/10 blur-xl"
      />
      
      {/* Geometric shapes */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-20 right-20 w-16 h-16 border-2 border-primary/20 rounded-lg"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-32 left-16 w-12 h-12 border-2 border-accent/20 rounded-full"
      />
    </div>
  );
};

export default FloatingElements;
