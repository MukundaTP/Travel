import { motion } from "framer-motion";

const AboutHighLights = ({ index, itemVariants, item }) => {
  const Icon = item.icon; // Get the icon component

  return (
    <motion.div
      key={index}
      variants={itemVariants}
      whileHover={{ y: -5 }}
      className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-700/10"
    >
      <h3 className="text-2xl font-semibold mb-6 text-gray-700 flex items-center gap-3">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
          className="p-2 bg-gray-700/5 rounded-xl"
        >
          <Icon className="w-8 h-8 text-gray-700" />
        </motion.div>
        {item.title}
      </h3>
      {item.content ? (
        <p className="text-gray-700 leading-relaxed">{item.content}</p>
      ) : (
        <ul className="text-gray-700 space-y-3">
          {item.list.map((listItem, idx) => (
            <motion.li
              key={idx}
              className="flex items-center gap-2 group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <span className="w-2 h-2 bg-gray-700 rounded-full group-hover:scale-125 transition-transform" />
              {listItem}
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  );
};

export default AboutHighLights;
