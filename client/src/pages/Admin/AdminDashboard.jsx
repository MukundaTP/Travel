import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  MessageSquare,
  Star,
  Loader2,
  User,
  Mail,
  Calendar,
  TrendingUp,
  ChevronRight,
  Activity,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  useGetAllUsersQuery,
  useGetAllReviewsQuery,
  useGetAllContactQueriesQuery,
} from "../../../Redux/adminAuth";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import MetaData from "@/components/layouts/MetaData";

// Fade in animation variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

// Stagger children animation
const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const StatsCard = ({ icon: Icon, label, value, trend = null, delay = 0 }) => (
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

const RatingStats = ({ reviews }) => {
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

const ItemCard = ({ icon: Icon, title, subtitle, date, imageUrl = null }) => (
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

const SectionCard = ({ title, icon: Icon, data, renderItem }) => (
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

const LoadingSpinner = () => (
  <div className="flex h-screen items-center justify-center bg-gray-50">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <Loader2 className="h-12 w-12 text-gray-700" />
    </motion.div>
  </div>
);

const AdminDashboard = () => {
  const { data: usersData, isLoading: usersLoading } = useGetAllUsersQuery(
    undefined,
    {
      pollingInterval: 30000, // Poll every 30 seconds
      refetchOnMountOrArgChange: true,
      refetchOnFocus: false,
      refetchOnReconnect: true,
    }
  );

  const { data: reviewsData, isLoading: reviewsLoading } =
    useGetAllReviewsQuery(undefined, {
      pollingInterval: 30000,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: false,
      refetchOnReconnect: true,
    });

  const { data: queriesData, isLoading: queriesLoading } =
    useGetAllContactQueriesQuery(undefined, {
      pollingInterval: 30000,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: false,
      refetchOnReconnect: true,
    });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (usersLoading || reviewsLoading || queriesLoading) {
    return <LoadingSpinner />;
  }

  const stats = [
    {
      icon: Users,
      label: "Total Users",
      value: usersData?.users?.length || 0,
      trend: 12,
    },
    {
      icon: Star,
      label: "Total Reviews",
      value: reviewsData?.reviews?.length || 0,
      trend: 8,
    },
    {
      icon: MessageSquare,
      label: "Contact Queries",
      value: queriesData?.queries?.length || 0,
      trend: -2,
    },
  ];

  return (
    <>
      <MetaData title={"Admin Dashboard"} />
      <div className="min-h-screen bg-gray-50">
        <div className="p-8">
          <motion.div
            className="max-w-7xl mx-auto space-y-8"
            variants={stagger}
            initial="initial"
            animate="animate"
          >
            {/* Header */}
            <motion.div
              variants={fadeIn}
              className="bg-white p-8 rounded-2xl shadow-sm border"
            >
              <motion.h1
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="text-3xl font-bold text-gray-800"
              >
                Dashboard Overview
              </motion.h1>
              <motion.p
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-500 mt-2"
              >
                Welcome back! Here's what's happening today.
              </motion.p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <StatsCard key={index} {...stat} delay={index * 0.1} />
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RatingStats reviews={reviewsData?.reviews} />

              <SectionCard
                title="Latest Users"
                icon={Users}
                data={usersData?.users}
                renderItem={(user) => (
                  <ItemCard
                    key={user._id}
                    icon={User}
                    title={user.name}
                    subtitle={user.email}
                    date={new Date(user.createdAt).toLocaleDateString()}
                    imageUrl={user.avatar.url}
                  />
                )}
              />

              <SectionCard
                title="Latest Reviews"
                icon={Star}
                data={reviewsData?.reviews}
                renderItem={(review) => (
                  <ItemCard
                    key={review._id}
                    icon={Star}
                    imageUrl={review.avatar.url}
                    title={review.name}
                    subtitle={review.message}
                    date={new Date(review.createdAt).toLocaleDateString()}
                  />
                )}
              />

              <SectionCard
                title="Latest Queries"
                icon={MessageSquare}
                data={queriesData?.queries}
                renderItem={(query) => (
                  <ItemCard
                    key={query._id}
                    icon={MessageSquare}
                    title={`${query.firstName} ${query.lastName}`}
                    subtitle={query.message}
                    date={new Date(query.createdAt).toLocaleDateString()}
                  />
                )}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
