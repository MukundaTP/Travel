// components/SideBar.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  UserCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Users,
  MessageSquare,
  Star,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../Redux/authApi";
import { LogoutUser } from "../../Redux/UserSlice";
import { useAlert } from "react-alert";
const Sidebar = ({ open, setOpen, children }) => (
  <motion.div
    initial={false}
    animate={{
      width: open ? 288 : 80,
    }}
    className="bg-white border-r border-gray-200 relative h-full shadow-sm"
    style={{
      scrollbarWidth: "thin",
      scrollbarColor: "rgba(0,0,0,0.1) transparent",
    }}
  >
    <button
      onClick={() => setOpen(!open)}
      className="absolute -right-3 top-6 z-30"
    >
      <div className="rounded-full h-6 w-6 bg-white border shadow-md flex items-center justify-center">
        {open ? (
          <ChevronLeft className="h-4 w-4 text-gray-700" />
        ) : (
          <ChevronRight className="h-4 w-4 text-gray-700" />
        )}
      </div>
    </button>
    {children}
  </motion.div>
);

export const SidebarDemo = () => {
  const [open, setOpen] = useState(true);
  const { user } = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const alert = useAlert();

  const handleLogout = async () => {
    try {
      const data = await logout().unwrap();
      alert.success(data?.message);
      dispatch(LogoutUser());
      navigate("/login");
    } catch (e) {
      alert.error(e?.data?.err);
      return;
    }
  };

  const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      label: "Users",
      icon: Users,
      href: "/users",
    },
    {
      label: "Reviews",
      icon: Star,
      href: "/reviews",
    },
    {
      label: "Contact Queries",
      icon: MessageSquare,
      href: "/queries",
    },
    {
      label: "Profile",
      icon: UserCircle,
      href: "/profile",
    },
  ];

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="p-4 border-b border-gray-200">
          <Link to="/" className="no-underline flex items-center space-x-3">
            <div className="h-10 w-10 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            {open && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xl font-bold text-gray-700"
              >
                Chaithanya Tours And Travels
              </motion.span>
            )}
          </Link>
        </div>

        {/* Menu Items */}
        <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="no-underline flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-100 transition-all group hover:translate-x-1"
            >
              <div className="flex items-center space-x-3">
                <item.icon className="h-5 w-5 text-gray-500 group-hover:text-gray-700" />
                {open && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-gray-600 group-hover:text-gray-700"
                  >
                    {item.label}
                  </motion.span>
                )}
              </div>
              {open && item.badge && (
                <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* User Section */}
        <div className="border-t border-gray-200 p-4">
          <div className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-white font-bold">
                {user?.name?.slice(0, 1)}
              </div>
              {open && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col"
                >
                  <span className="text-sm font-semibold text-gray-700">
                    {user?.name}
                  </span>
                  <span className="text-xs text-gray-500">{user?.email}</span>
                </motion.div>
              )}
            </div>
            <button className="mt-4 flex items-center justify-center space-x-2 text-gray-700 hover:bg-white w-full py-2 px-3 rounded-lg transition-all">
              <LogOut onClick={handleLogout} className="h-5 w-5" />
              {open && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-medium"
                  onClick={handleLogout}
                >
                  Logout
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default SidebarDemo;
