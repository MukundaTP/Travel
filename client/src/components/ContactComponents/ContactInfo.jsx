import { staggerChildren } from "@/constants/ContactVariants";
import { motion } from "framer-motion";
import { contactdata } from "@/constants/ContactData";
import ContactInfoCard from "./ContactInfoCard";

const ContactInfo = () => {
  return (
    <motion.section
      className="py-20 bg-white"
      variants={staggerChildren}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerChildren}
        >
          {contactdata.map((item, index) => (
            <ContactInfoCard key={index} item={item} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ContactInfo;
