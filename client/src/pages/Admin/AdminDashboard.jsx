import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  MessageSquare,
  Star,
  Activity,
  Wallet,
  Bell,
  ChevronRight,
} from "lucide-react";
import { SidebarDemo } from "@/components/SideBar";
import { useEffect } from "react";

const StatsCard = ({ icon: Icon, label, value, trend }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-white rounded-xl shadow-sm border p-6 transition-all duration-200 group hover:shadow-md"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <h3 className="text-2xl font-bold text-gray-700 mt-1">{value}</h3>
        <p
          className={`text-sm mt-2 font-medium ${
            trend > 0 ? "text-gray-700" : "text-gray-500"
          }`}
        >
          {trend > 0 ? "+" : ""}
          {trend}% from last month
        </p>
      </div>
      <div className="p-4 rounded-xl bg-gray-50 group-hover:bg-gray-100 transition-all">
        <Icon className="h-6 w-6 text-gray-700" />
      </div>
    </div>
  </motion.div>
);

const RecentActivityCard = () => {
  const activities = [
    {
      icon: Wallet,
      title: "New booking received",
      desc: "John Doe booked a trip to Paris",
      time: "2h ago",
    },
    {
      icon: Star,
      title: "New review posted",
      desc: "Sarah left a 5-star review",
      time: "4h ago",
    },
    {
      icon: Bell,
      title: "Contact Query",
      desc: "New inquiry about London tour",
      time: "6h ago",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-700">Recent Activity</h2>
        <Button>View All</Button>
      </div>
      <div className="space-y-4">
        {activities.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -4 }}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-all group cursor-pointer"
          >
            <div className="h-10 w-10 rounded-xl bg-gray-50 group-hover:bg-gray-100 flex items-center justify-center transition-all">
              <item.icon className="h-5 w-5 text-gray-700" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-700 truncate">
                {item.title}
              </h3>
              <p className="text-xs text-gray-500 group-hover:text-gray-600 mt-0.5 truncate">
                {item.desc}
              </p>
            </div>
            <span className="text-xs text-gray-500 whitespace-nowrap">
              {item.time}
            </span>
          </motion.div>
        ))}
      </div>
      <motion.button
        whileHover={{ x: 4 }}
        className="mt-4 w-full py-2 text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center gap-1 group"
      >
        View all activity
        <ChevronRight className="h-4 w-4 group-hover:text-gray-700" />
      </motion.button>
    </div>
  );
};

const Button = ({ children, variant = "primary", ...props }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
      variant === "primary"
        ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
        : variant === "danger"
        ? "bg-red-50 text-red-600 hover:bg-red-100"
        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
    } focus:outline-none focus:ring-2 focus:ring-gray-200`}
    {...props}
  >
    {children}
  </motion.button>
);

const ChartPlaceholder = () => (
  <div className="h-full flex items-center justify-center text-gray-500 bg-gray-50 rounded-xl">
    <div className="text-center">
      <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <p className="text-gray-500">Chart visualization coming soon</p>
    </div>
  </div>
);

const AdminDashboard = () => {
  // Scroll to top when the component is mounted (when the page loads)
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []); // Empty dependency array ensures this runs only once when the component mounts
  const stats = [
    { icon: TrendingUp, label: "Total Bookings", value: "1,234", trend: 12 },
    { icon: Users, label: "Total Users", value: "892", trend: 8.2 },
    { icon: MessageSquare, label: "Active Queries", value: "48", trend: -2.4 },
    { icon: Star, label: "Average Rating", value: "4.8", trend: 1.8 },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Dashboard Overview
            </h1>
            <p className="text-gray-500 mt-1">Welcome to your dashboard</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>

          {/* Charts and Activity Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-700">
                  Booking Analytics
                </h2>
                <div className="flex gap-2">
                  <Button variant="secondary">Weekly</Button>
                  <Button variant="secondary">Monthly</Button>
                </div>
              </div>
              <ChartPlaceholder />
            </div>
            <RecentActivityCard />
          </div>

          {/* Additional Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Popular Destinations
              </h3>
              {/* Add content for popular destinations */}
            </div>
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Latest Reviews
              </h3>
              {/* Add content for latest reviews */}
            </div>
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Pending Queries
              </h3>
              {/* Add content for pending queries */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
