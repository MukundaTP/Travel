import { addOnServices } from "@/constants/ServicesData";
import { containerVariants, itemVariants } from "@/constants/Variants";
import { motion } from "framer-motion";

const AddOns = ({ renderIcon }) => {
  return (
    <motion.div
      key="addons"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: -20 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
    >
      {addOnServices.map((service, index) => {
        const IconComponent = service.icon;
        return (
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
                  {renderIcon(IconComponent)}
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
        );
      })}
    </motion.div>
  );
};

export default AddOns;
