import { motion } from "framer-motion";
import { Calendar, ChevronRight } from "lucide-react";

const ItemCard = ({
  icon: Icon,
  title,
  subtitle,
  date,
  imageUrl = null,
  fadeIn,
}) => (
  <motion.div
    variants={fadeIn}
    whileHover={{ x: 4, backgroundColor: "rgb(249 250 251)" }}
    className="flex items-center gap-4 p-4 rounded-lg transition-all cursor-pointer"
  >
    {imageUrl ? (
      <motion.img
        whileHover={{ scale: 1.1 }}
        src={imageUrl}
        alt={title}
        className="h-12 w-12 rounded-full object-cover"
        loading="lazy"
      />
    ) : (
      <motion.div
        whileHover={{ rotate: 15 }}
        className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center"
      >
        <Icon className="h-6 w-6 text-gray-600" />
      </motion.div>
    )}
    <div className="flex-1 min-w-0">
      <h3 className="text-sm font-medium text-gray-700 truncate">{title}</h3>
      <p className="text-xs text-gray-500 mt-0.5 truncate">{subtitle}</p>
    </div>
    <div className="flex items-center text-xs text-gray-500 gap-1">
      <Calendar className="h-3 w-3" />
      {date}
    </div>
    <motion.div whileHover={{ x: 3 }} className="text-gray-400">
      <ChevronRight className="h-4 w-4" />
    </motion.div>
  </motion.div>
);

export default ItemCard;
