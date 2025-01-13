import { motion } from "framer-motion";

const SectionCard = ({
  title,
  icon: Icon,
  data,
  renderItem,
  stagger,
  fadeIn,
}) => (
  <motion.div
    variants={fadeIn}
    initial="initial"
    animate="animate"
    exit="exit"
    className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-lg transition-all duration-300"
  >
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
          <Icon className="h-5 w-5 text-gray-700" />
        </motion.div>
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      </div>
      <motion.span
        whileHover={{ scale: 1.05 }}
        className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full"
      >
        {data?.length || 0} entries
      </motion.span>
    </div>
    <motion.div
      variants={stagger}
      initial="initial"
      animate="animate"
      className="space-y-2 h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent hover:scrollbar-thumb-gray-300"
    >
      {data?.map(renderItem)}
    </motion.div>
  </motion.div>
);

export default SectionCard;
