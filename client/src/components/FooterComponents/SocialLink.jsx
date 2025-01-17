// src/components/Footer/components/SocialLink.jsx

import { motion } from "framer-motion";

const SocialLink = ({ Icon, href }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors"
  >
    <Icon className="w-5 h-5" />
  </motion.a>
);

export default SocialLink;
