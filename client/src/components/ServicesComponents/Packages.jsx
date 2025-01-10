import { motion } from "framer-motion";

const Packages = ({ specialPackages, renderIcon }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };
  return (
    <motion.div
      key="packages"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: -20 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      {specialPackages.map((pkg, index) => {
        const IconComponent = pkg.icon;
        return (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-xl overflow-hidden"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="p-4 bg-blue-50 rounded-xl"
                >
                  {renderIcon(IconComponent)}
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {pkg.title}
                </h3>
              </div>
              <p className="text-gray-600 mb-6">{pkg.description}</p>

              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-gray-800 mb-4">
                  Includes:
                </h4>
                <ul className="space-y-3">
                  {pkg.features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center text-gray-600 group"
                    >
                      <span className="w-2 h-2 bg-gray-700 rounded-full mr-3 group-hover:scale-125 transition-transform" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <motion.div
                className="mt-8 pt-6 border-t border-gray-100"
                whileHover={{ scale: 1.02 }}
              >
                <span className="text-2xl font-bold bg-gray-700 bg-clip-text text-transparent">
                  {pkg.price}
                </span>
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default Packages;
