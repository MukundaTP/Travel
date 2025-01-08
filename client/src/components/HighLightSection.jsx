import React from "react";
import { motion } from "framer-motion";
import { Car, Wallet, UserCircle, ArrowRight, CheckCircle } from "lucide-react";

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

const HighlightSection = () => {
  const features = [
    {
      title: "Luxurious Comfort",
      description:
        "Experience premium comfort in our meticulously maintained fleet of vehicles, perfect for any occasion from business trips to family adventures.",
      icon: Car,
    },
    {
      title: "Smart Pricing",
      description:
        "Enjoy transparent, competitive rates with our flexible packages designed to provide maximum value without compromising on quality.",
      icon: Wallet,
    },
    {
      title: "Professional Drivers",
      description:
        "Travel with confidence alongside our certified, professional drivers who prioritize your safety and comfort throughout the journey.",
      icon: UserCircle,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-50 to-blue-50"
    >
      {/* Background Decorative Elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-10"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-10"
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={titleVariants}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Why Choose Our Service?
          </motion.h2>
          <motion.p
            className="text-gray-600 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Discover the perfect blend of comfort, affordability, and
            professional service
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HighlightSection;
