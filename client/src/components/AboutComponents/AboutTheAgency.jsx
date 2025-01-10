import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/constants/Variants";
import AboutHighlightsAndStats from "./AboutHighlightsAndStats";

const AboutTheAgency = () => {
  return (
    <section className="min-h-screen bg-white py-20">
      <motion.div
        className=" mx-auto "
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-16 relative py-20 bg-gray-900"
          variants={itemVariants}
        >
          {/* Background Elements */}
          <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-5"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-black"></div>

          <div className="relative z-10 max-w-4xl mx-auto ">
            <motion.h2
              className="text-5xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              About Our Agency
            </motion.h2>

            <motion.p
              className="text-xl leading-relaxed text-gray-300 mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              With years of experience in the travel industry, we specialize in
              providing reliable and comfortable transport solutions for all
              your needs. Our commitment to professionalism and family values
              ensures every journey is a memorable one.
            </motion.p>
          </div>

          {/* Optional Decorative Elements */}
          <motion.div
            className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        <AboutHighlightsAndStats
          itemVariants={itemVariants}
          containerVariants={containerVariants}
        />
      </motion.div>
    </section>
  );
};

export default AboutTheAgency;
