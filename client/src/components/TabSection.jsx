import { motion, AnimatePresence } from "framer-motion";
import Vehicles from "./ServicesComponents/Vehicles";
import { containerVariants } from "@/constants/Variants";
import AddOns from "./ServicesComponents/AddOns";

const TabSection = ({
  activeTab,
  setActiveTab,
  vehicleExamples,
  specialPackages,
  addOnServices,
}) => {
  const renderIcon = (IconComponent) => (
    <IconComponent className="w-12 h-12 mb-4 text-gray-700" />
  );

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
        {activeTab === "vehicles" && (
          <Vehicles renderIcon={renderIcon} vehicleExamples={vehicleExamples} />
        )}

        {activeTab === "packages" && (
          <Vehicles specialPackages={specialPackages} renderIcon={renderIcon} />
        )}

        {activeTab === "addons" && <AddOns renderIcon={renderIcon} />}
      </AnimatePresence>
    </div>
  );
};

export default TabSection;
