import { fadeIn } from "@/constants/ContactVariants";
import { motion } from "framer-motion";

const OfficeMapLocation = () => {
  return (
    <motion.div
      className="lg:mt-12"
      variants={fadeIn}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
        <iframe
          title="Google Map"
          width="100%"
          height="400"
          frameBorder="0"
          style={{ border: 0 }}
          loading="lazy"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.953789132324!2d76.62749747487807!3d12.317084287670392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDE5JzAxLjUiTiA3NsKwMzcnNDguMyJF!5e0!3m2!1sen!2sin!4v1642668744791"
          allowFullScreen=""
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </motion.div>
  );
};

export default OfficeMapLocation;
