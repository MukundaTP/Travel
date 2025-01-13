import { motion } from "framer-motion";
import { Users, MessageSquare, Star, Loader2, User } from "lucide-react";
import { useEffect } from "react";
import {
  useGetAllUsersQuery,
  useGetAllReviewsQuery,
  useGetAllContactQueriesQuery,
} from "../../../Redux/adminAuth";
import MetaData from "@/components/layouts/MetaData";
import DashboardHeader from "@/components/AdminDashboardComponents/DashboardHeader";
import StatsCard from "@/components/AdminDashboardComponents/StatsCard";
import RatingStats from "@/components/AdminDashboardComponents/RatingStats";
import ItemCard from "@/components/AdminDashboardComponents/ItemCard";
import SectionCard from "@/components/AdminDashboardComponents/SectionCard";

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
            <DashboardHeader fadeIn={fadeIn} />
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <StatsCard
                  key={index}
                  {...stat}
                  delay={index * 0.1}
                  fadeIn={fadeIn}
                />
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RatingStats fadeIn={fadeIn} reviews={reviewsData?.reviews} />

              <SectionCard
                fadeIn={fadeIn}
                stagger={stagger}
                title="Latest Users"
                icon={Users}
                data={usersData?.users}
                renderItem={(user) => (
                  <ItemCard
                    fadeIn={fadeIn}
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
                fadeIn={fadeIn}
                stagger={stagger}
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
                fadeIn={fadeIn}
                stagger={stagger}
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
