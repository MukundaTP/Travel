import { motion } from "framer-motion";

const AboutHero = ({ itemVariants }) => {
  return (
    <motion.div
      className="text-center mb-16 relative py-20 bg-gray-900"
      variants={itemVariants}
    >
      <div className="relative z-10 max-w-4xl mx-auto ">
        <motion.h2
          className="text-3xl sm:text-5xl font-bold mb-6 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About Our Agency
        </motion.h2>

        <motion.p
          className="text-md sm:text-xl leading-relaxed text-gray-300 mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          With years of experience in the travel industry, we specialize in
          providing reliable and comfortable transport solutions for all your
          needs. Our commitment to professionalism and family values ensures
          every journey is a memorable one.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default AboutHero;
