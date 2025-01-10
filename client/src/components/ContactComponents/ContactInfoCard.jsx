import { fadeIn } from "@/constants/ContactVariants";
import { Card } from "flowbite-react";
import { motion } from "framer-motion";
const ContactInfoCard = ({ item }) => {
  return (
    <motion.div
      variants={fadeIn}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className="p-6 hover:shadow-xl transition-all duration-300 bg-white border-none shadow-md group">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
            <item.icon className="h-8 w-8 text-gray-700" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-800">
              {item.title}
            </h3>
            <p className="text-gray-600">{item.content}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ContactInfoCard;
