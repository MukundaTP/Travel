import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Progress } from "../ui/progress";

const RatingStats = ({ reviews, fadeIn }) => {
  const totalRatings = reviews?.length || 0;
  const averageRating =
    totalRatings > 0
      ? (
          reviews.reduce((acc, rev) => acc + rev.rating, 0) / totalRatings
        ).toFixed(1)
      : 0;

  const [progressValues, setProgressValues] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    if (totalRatings > 0) {
      const values = [5, 4, 3, 2, 1].map((rating) => {
        const count = reviews.filter((r) => r.rating === rating).length;
        return (count / totalRatings) * 100;
      });
      setProgressValues(values);
    }
  }, [reviews, totalRatings]);

  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Star className="h-5 w-5 text-yellow-500" />
          </motion.div>
          <h2 className="text-lg font-semibold text-gray-700">
            Rating Overview
          </h2>
        </div>
      </div>
      <div className="flex items-center gap-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="text-4xl font-bold text-gray-700">
            {averageRating}
          </div>
          <div className="flex gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Star
                  className={`h-5 w-5 ${
                    i < Math.round(averageRating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </motion.div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">Average Rating</p>
        </motion.div>
        <div className="flex-1 space-y-4">
          {[5, 4, 3, 2, 1].map((rating, index) => {
            const count =
              reviews?.filter((r) => r.rating === rating).length || 0;

            return (
              <motion.div
                key={rating}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="grid grid-cols-[auto,1fr,auto] gap-4 items-center"
              >
                <div className="flex items-center gap-1 w-12">
                  <span className="font-medium text-gray-700">{rating}</span>
                  <Star className="h-4 w-4 text-yellow-400" />
                </div>
                <Progress value={progressValues[index]} className="h-2" />
                <span className="text-sm text-gray-500 w-12">{count}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default RatingStats;
