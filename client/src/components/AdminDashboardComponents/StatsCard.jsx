import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

const StatsCard = ({
  icon: Icon,
  label,
  value,
  trend = null,
  delay = 0,
  fadeIn,
}) => (
  <motion.div
    variants={fadeIn}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: 0.3, delay }}
    whileHover={{ scale: 1.03, translateY: -5 }}
    className="bg-white rounded-xl shadow-sm border p-6 transition-all duration-200 hover:shadow-lg hover:border-gray-300"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <motion.h3
          className="text-2xl font-bold text-gray-700 mt-1"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.2 }}
        >
          {value}
        </motion.h3>
        {trend !== null && (
          <motion.p
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.4 }}
            className={`text-sm mt-2 font-medium flex items-center gap-1 ${
              trend > 0 ? "text-emerald-600" : "text-red-500"
            }`}
          >
            <TrendingUp
              className={`h-4 w-4 ${trend > 0 ? "rotate-0" : "rotate-180"}`}
            />
            {trend > 0 ? "+" : ""}
            {trend}%
          </motion.p>
        )}
      </div>
      <motion.div
        whileHover={{ rotate: 15 }}
        className="p-4 rounded-xl bg-gray-50 group-hover:bg-gray-100 transition-all"
      >
        <Icon className="h-6 w-6 text-gray-700" />
      </motion.div>
    </div>
  </motion.div>
);

export default StatsCard;
