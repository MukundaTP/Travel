import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import ServicesGrid from "./ServicesGrid";
import { containerVariants } from "@/constants/BusinessServices";

const BusinessServices = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <motion.div
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge
            variant="outline"
            className="mb-4 px-4 py-1 text-lg bg-gray-700 text-white"
          >
            TPM Services
          </Badge>
          <h2 className="text-4xl font-bold text-gray-700 mb-4">
            Our Business Services
          </h2>
          <div className="w-24 h-1 bg-gray-700 mx-auto"></div>
        </motion.div>

        {/* Services Grid */}
        <ServicesGrid />
      </motion.div>
    </section>
  );
};

export default BusinessServices;
