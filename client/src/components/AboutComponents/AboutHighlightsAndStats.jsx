import { highlights } from "@/constants/AboutHighlightData";
import { stats } from "@/constants/AboutStats";
import AboutHighLights from "./AboutHighLights";
import { motion } from "framer-motion";
import AboutStatsCard from "./AboutStatsCard";

const AboutHighlightsAndStats = ({ containerVariants, itemVariants }) => {
  return (
    <>
      <motion.div
        className="grid md:grid-cols-2 gap-8 mt-12 max-w-7xl mx-auto"
        variants={containerVariants}
      >
        {highlights.map((item, index) => (
          <AboutHighLights
            key={index}
            index={index}
            itemVariants={itemVariants}
            item={item}
          />
        ))}
      </motion.div>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-7xl mx-auto"
        variants={containerVariants}
      >
        {stats.map((stat, index) => (
          <AboutStatsCard
            key={index}
            stat={stat}
            itemVariants={itemVariants}
            index={index}
          />
        ))}
      </motion.div>
    </>
  );
};

export default AboutHighlightsAndStats;
