import { motion } from "framer-motion";
import { Mail, Send, Shield, X } from "lucide-react";

const NewsletterSection = () => (
  <div className="border-b border-gray-800 bg-white">
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-bold mb-4 text-gray-700"
          >
            Subscribe to Our Newsletter
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600"
          >
            Stay updated with our latest offers, travel guides, and exclusive
            deals. Join our community of travel enthusiasts!
          </motion.p>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="flex shadow-lg rounded-lg overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 border border-gray-200 focus:outline-none focus:border-gray-700 text-gray-700 placeholder-gray-400"
            />
            <button className="bg-gray-700 text-white px-8 py-4 hover:bg-gray-800 transition-colors flex items-center gap-2 group">
              Subscribe
              <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center gap-4 mt-6 ">
            <div className="flex items-center gap-2 text-gray-600">
              <Shield className="w-4 h-4" />
              <span className="text-[12px] sm:text-sm">No Spam</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="w-4 h-4" />
              <span className="text-[12px] sm:text-sm">Weekly Updates</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <X className="w-4 h-4" />
              <span className="text-[12px] sm:text-sm">
                Unsubscribe Anytime
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </div>
);

export default NewsletterSection;
