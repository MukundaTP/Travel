import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description, index }) => {
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.2,
        ease: "easeOut",
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: index * 0.2 + 0.3,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.2 + 0.5,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

      {/* Decorative Patterns */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full -mr-16 -mt-16 opacity-20" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-50 rounded-full -ml-12 -mb-12 opacity-20" />

      {/* Content */}
      <div className="relative z-10">
        <motion.div variants={iconVariants} className="mb-6 relative">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 text-gray-700 group-hover:text-gray-800 transition-colors duration-300">
            <Icon
              size={32}
              className="transform group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1 }}
            className="absolute -right-2 -top-2"
          >
            <CheckCircle className="w-6 h-6 text-gray-500" />
          </motion.div>
        </motion.div>

        <motion.div variants={contentVariants}>
          <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-gray-800 transition-colors duration-300">
            {title}
          </h3>

          <p className="text-gray-600 leading-relaxed mb-6 group-hover:text-gray-700 transition-colors duration-300">
            {description}
          </p>
        </motion.div>
      </div>

      {/* Border Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl" />
    </motion.div>
  );
};

export default FeatureCard;
