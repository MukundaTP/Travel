import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/constants/Variants";
import AboutHighlightsAndStats from "./AboutHighlightsAndStats";
import AboutHero from "./AboutHero";

const AboutTheAgency = () => {
  return (
    <section className="min-h-screen bg-white py-20">
      <motion.div
        className=" mx-auto "
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <AboutHero itemVariants={itemVariants} />

        <AboutHighlightsAndStats
          itemVariants={itemVariants}
          containerVariants={containerVariants}
        />
      </motion.div>
    </section>
  );
};

export default AboutTheAgency;
