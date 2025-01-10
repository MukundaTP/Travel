import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/constants/Variants";

const Vehicles = ({ renderIcon, vehicleExamples, specialPackages }) => {
  // Handle which data to use
  const data = vehicleExamples || specialPackages;

  // Early return if no data
  if (!data) {
    return null;
  }

  // Function to render content based on data type
  const renderContent = ([key, item]) => {
    const IconComponent = item.icon;
    const isPackage = !!specialPackages;

    return (
      <motion.div
        key={key}
        variants={itemVariants}
        whileHover={{ y: -5 }}
        className="bg-white rounded-xl shadow-xl overflow-hidden"
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="p-2 bg-blue-50 rounded-xl"
            >
              {renderIcon(IconComponent)}
            </motion.div>
            <motion.span
              className="text-3xl font-bold bg-gray-700 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              {isPackage ? item.title : key}
            </motion.span>
          </div>
          <p className="text-gray-600 mb-6">{item.description}</p>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">
                {isPackage ? "Includes:" : "Perfect For:"}
              </h4>
              <ul className="space-y-3">
                {(isPackage ? item.features : item.examples).map(
                  (text, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center text-gray-600 group"
                    >
                      <span className="w-2 h-2 bg-gray-700 rounded-full mr-3 group-hover:scale-125 transition-transform" />
                      {text}
                    </motion.li>
                  )
                )}
              </ul>
            </div>

            {!isPackage && (
              <div>
                <h4 className="font-semibold text-gray-800 mb-4">Features:</h4>
                <div className="grid grid-cols-2 gap-3">
                  {item.features.map((feature, idx) => (
                    <motion.span
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      className="bg-blue-50 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium flex items-center"
                    >
                      {feature}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}

            {isPackage && (
              <motion.div
                className="mt-8 pt-6 border-t border-gray-100"
                whileHover={{ scale: 1.02 }}
              >
                <span className="text-2xl font-bold bg-gray-700 bg-clip-text text-transparent">
                  {item.price}
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      key={vehicleExamples ? "vehicles" : "packages"}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: -20 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      {Object.entries(data).map(renderContent)}
    </motion.div>
  );
};

export default Vehicles;
