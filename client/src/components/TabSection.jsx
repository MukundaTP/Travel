import { motion, AnimatePresence } from "framer-motion";

const TabSection = ({
  activeTab,
  setActiveTab,
  vehicleExamples,
  specialPackages,
  addOnServices,
}) => {
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
    <div className="container mx-auto px-4 py-8">
      <motion.div
        className="flex justify-center space-x-4 mb-12"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {["vehicles", "packages", "addons"].map((tab) => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(tab)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
              activeTab === tab
                ? "bg-gray-700 text-white shadow-lg shadow-blue-500/30"
                : "bg-white text-gray-700 hover:bg-blue-50"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        {/* Vehicle Categories */}
        {activeTab === "vehicles" && (
          <motion.div
            key="vehicles"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {Object.entries(vehicleExamples).map(([vehicle, data], index) => (
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
                      className="p-2 bg-blue-50 rounded-xl"
                    >
                      {data.icon}
                    </motion.div>
                    <motion.span
                      className="text-3xl font-bold bg-gray-700 bg-clip-text text-transparent"
                      whileHover={{ scale: 1.05 }}
                    >
                      {vehicle}
                    </motion.span>
                  </div>
                  <p className="text-gray-600 mb-6">{data.description}</p>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-4">
                        Perfect For:
                      </h4>
                      <ul className="space-y-3">
                        {data.examples.map((example, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-center text-gray-600 group"
                          >
                            <span className="w-2 h-2 bg-gray-700 rounded-full mr-3 group-hover:scale-125 transition-transform" />
                            {example}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-4">
                        Features:
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {data.features.map((feature, idx) => (
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
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Special Packages */}
        {activeTab === "packages" && (
          <motion.div
            key="packages"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {specialPackages.map((pkg, index) => (
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
                      {pkg.icon}
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
            ))}
          </motion.div>
        )}

        {/* Add-on Services */}
        {activeTab === "addons" && (
          <motion.div
            key="addons"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {addOnServices.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-xl overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex flex-col items-center mb-6">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="p-4 bg-blue-50 rounded-xl mb-4"
                    >
                      {service.icon}
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-800 text-center">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-center mb-6">
                    {service.description}
                  </p>

                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-gray-800 text-center mb-4">
                      Benefits:
                    </h4>
                    <ul className="space-y-3">
                      {service.benefits.map((benefit, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-center text-gray-600 group"
                        >
                          <span className="w-2 h-2 bg-gray-700 rounded-full mr-3 group-hover:scale-125 transition-transform" />
                          {benefit}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TabSection;
