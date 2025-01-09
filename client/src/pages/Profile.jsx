"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  User,
  Mail,
  Calendar,
  Shield,
  Camera,
  Key,
  LogOut,
} from "lucide-react";
import { format } from "date-fns";
import { LogoutUser } from "../../Redux/UserSlice";
import { useLogoutMutation } from "../../Redux/authApi";
import { useAlert } from "react-alert";

const Profile = () => {
  // Scroll to top when the component is mounted (when the page loads)
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []); // Empty dependency array ensures this runs only once when the component mounts
  const navigate = useNavigate();
  const { user } = useSelector((state) => state?.user);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const alert = useAlert();

  const formatDate = (dateString) => {
    return format(new Date(dateString), "MMMM dd, yyyy");
  };

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

  return (
    <div className="h-screen overflow-y-auto bg-gray-50 py-6 mt-20">
      <div className="max-w-4xl mx-auto px-4 h-full flex items-start">
        <Card className="w-full mb-6">
          {/* Profile Header - Reduced vertical spacing */}
          <CardHeader className="text-center py-4">
            <div className="flex justify-center mb-4">
              <div
                className="relative"
                onMouseEnter={() => setIsImageHovered(true)}
                onMouseLeave={() => setIsImageHovered(false)}
              >
                <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                  <AvatarImage
                    src={user?.avatar?.url}
                    alt={user?.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-xl bg-blue-500 text-white">
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {isImageHovered && (
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer"
                    onClick={() => navigate("/update-profile")}
                  >
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>
            </div>
            <CardTitle className="text-2xl font-bold mb-1">
              {user?.name}
            </CardTitle>
            <CardDescription className="flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" />
              {user?.email}
            </CardDescription>
          </CardHeader>

          {/* Content - Optimized spacing */}
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* User Details - Left Column */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Account Details
                  </h3>
                  <div className="bg-white p-3 rounded-lg border space-y-3">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-gray-700" />
                      <div>
                        <p className="text-sm font-medium">Name</p>
                        <p className="text-gray-600">{user?.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-700" />
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-gray-600">{user?.email}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Account Status
                  </h3>
                  <div className="bg-white p-3 rounded-lg border space-y-3">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-gray-700" />
                      <div>
                        <p className="text-sm font-medium">Role</p>
                        <div className="flex items-center gap-2">
                          <p className="text-gray-600">
                            {user?.isAdmin ? "Admin" : "User"}
                          </p>
                          <div className="flex items-center"></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-700" />
                      <div>
                        <p className="text-sm font-medium">Member Since</p>
                        <p className="text-gray-600">
                          {formatDate(user?.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions - Right Column */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-500">
                  Quick Actions
                </h3>
                <div className="bg-white p-3 rounded-lg border space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start hover:bg-blue-50 hover:text-blue-600"
                    onClick={() => navigate("/update-profile")}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Update Profile
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start hover:bg-blue-50 hover:text-blue-600"
                    onClick={() => navigate("/update-password")}
                  >
                    <Key className="w-4 h-4 mr-2" />
                    Change Password
                  </Button>
                  {user?.isAdmin && (
                    <Button
                      variant="outline"
                      className="w-full justify-start hover:bg-blue-50 hover:text-blue-600"
                      onClick={() => navigate("/admin/dashboard")}
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Admin Dashboard
                    </Button>
                  )}
                </div>

                <div className="bg-gray-200 p-3 rounded-lg border">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Last Login</p>
                    <p className="text-sm font-medium">
                      {format(new Date(), "MMM dd, yyyy")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>

          {/* Footer */}
          <CardFooter className="flex justify-center py-4">
            <Button
              variant="destructive"
              className="gap-2 hover:bg-red-600"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
