import { motion } from "framer-motion";

const CarouselComponent = ({ currentIndex, carouselData }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="absolute inset-0 flex flex-col items-center justify-center text-white px-4"
    >
      <motion.span
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-sm md:text-base uppercase tracking-widest mb-4 bg-white/10 px-4 py-1 rounded-full backdrop-blur-sm"
      >
        {`Slide ${currentIndex + 1} of ${carouselData.length}`}
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="text-4xl md:text-6xl font-bold text-center mb-6 text-shadow-lg"
        style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
      >
        {carouselData[currentIndex].heading}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="text-lg md:text-xl text-center max-w-2xl leading-relaxed text-white/90 backdrop-blur-sm bg-black/10 p-6 rounded-lg"
      >
        {carouselData[currentIndex].text}
      </motion.p>
    </motion.div>
  );
};

export default CarouselComponent;
