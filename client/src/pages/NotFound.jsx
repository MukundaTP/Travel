import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, ChevronRight, Users, Car, Phone } from "lucide-react";
import MetaData from "@/components/layouts/MetaData";

const NotFound = () => {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const quickLinks = [
    { icon: Home, label: "Home", path: "/" }, // Home icon is perfect for homepage
    { icon: Users, label: "About", path: "/about" }, // Users icon represents team/company
    { icon: Car, label: "Services", path: "/services" }, // Car icon for transport services
    { icon: Phone, label: "Contact", path: "/contact" }, // Phone icon for contact
  ];

  return (
    <>
      <MetaData title={"Page Not Found"} />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-grid-gray-200 opacity-20"></div>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-blue-500/5 rounded-full"
              style={{
                width: `${Math.random() * 400 + 200}px`,
                height: `${Math.random() * 400 + 200}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-4 text-center"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {/* Main Content */}
          <motion.div variants={itemVariants}>
            <h1 className="text-9xl font-bold text-gray-900 mb-4">
              4
              <motion.span
                animate={{
                  rotate: [0, -10, 10, -10, 0],
                  scale: [1, 1.1, 0.9, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="inline-block"
              >
                0
              </motion.span>
              4
            </h1>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl font-semibold text-gray-800 mb-6"
          >
            Oops! Page Not Found
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto"
          >
            The page you're looking for seems to have taken a detour. Don't
            worry, let's help you find your way back.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
          >
            <Link
              to="/"
              className="inline-flex no-underline items-center justify-center px-8 py-4 bg-gray-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/20 hover:bg-gray-800 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-gray-700 mb-6">
              Quick Links
            </h3>
            <div className="inline-flex flex-wrap justify-center gap-4">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="no-underline flex items-center px-6 py-3 bg-white rounded-lg text-gray-600 hover:text-gray-800 hover:bg-blue-50 transition-colors group"
                >
                  <link.icon className="w-5 h-5 mr-2" />
                  {link.label}
                  <ChevronRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default NotFound;
