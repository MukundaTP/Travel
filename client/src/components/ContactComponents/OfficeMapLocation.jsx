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
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3899.278936101485!2d76.58416887506405!3d12.229383088021931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baf644f7358cc0d%3A0xe4fb32672e467b68!2sMount%20Litera%20Zee%20School!5e0!3m2!1sen!2sin!4v1701524068815!5m2!1sen!2sin"
          allowFullScreen=""
        ></iframe>
      </div>
    </motion.div>
  );
};

export default OfficeMapLocation;
