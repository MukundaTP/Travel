import { motion } from "framer-motion";

const ContactHero = () => {
  return (
    <motion.section
      className="relative bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white py-24 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-20"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2 }}
      />

      <div className="container mx-auto px-4 relative z-10 pt-10">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <motion.h1
            className="text-5xl md:text-5xl font-bold mb-6 bg-clip-text capitalize text-transparent bg-gradient-to-r from-white to-gray-300"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Get in Touch
          </motion.h1>
          <motion.p
            className="text-xl md:text-xl text-gray-300"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Let us help you plan your next adventure
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ContactHero;
