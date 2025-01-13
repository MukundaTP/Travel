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
import { Mail, Camera, LogOut } from "lucide-react";
import { format } from "date-fns";
import { LogoutUser, setUser } from "../../Redux/UserSlice";
import {
  useLogoutMutation,
  useUdpateProfilePicMutation,
} from "../../Redux/authApi";
import { useAlert } from "react-alert";
import MetaData from "@/components/layouts/MetaData";
import UpdateProfilePicModal from "@/components/AdminDashboardComponents/UpdateProfilePicture";
import AccountDetails from "@/components/AdminDashboardComponents/AccountDetails";
import AccountStatus from "@/components/AdminDashboardComponents/AccountStatus";
import QuickActions from "@/components/AdminDashboardComponents/QuickActions";

const Profile = () => {
  // States
  const [isUpdateProfilePicModalOpen, setIsUpdateProfilePicModalOpen] =
    useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [userImage, setUserImage] = useState(null);

  // Hooks
  const navigate = useNavigate();
  const { user } = useSelector((state) => state?.user);
  const [logout] = useLogoutMutation();
  const [updateProfilePicture, { isLoading: profilePicLoading }] =
    useUdpateProfilePicMutation();
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formatDate = (dateString) => {
    return format(new Date(dateString), "MMMM dd, yyyy");
  };

  // Image update handlers
  const handleImageUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await updateProfilePicture({
        image: userImage,
        id: user?._id,
      }).unwrap();

      alert.success(data?.message);
      setUserImage(null);
      handleProfilePicUpdateModalClose();
      dispatch(setUser(data?.user));
    } catch (e) {
      alert.error(e?.data?.err);
    }
  };

  const handleProfilePicUpdateModalClose = () => {
    setIsUpdateProfilePicModalOpen(false);
    setUserImage(null);
  };

  const handleProfilePicUpdateModalOpen = () => {
    setIsUpdateProfilePicModalOpen(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setUserImage(reader.result);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = async () => {
    try {
      const data = await logout().unwrap();
      alert.success(data?.message);
      dispatch(LogoutUser());
      navigate("/login");
    } catch (e) {
      alert.error(e?.data?.err);
    }
  };

  return (
    <>
      <MetaData title={"Profile"} />
      <div className="h-screen overflow-y-auto bg-gray-50 py-6 mt-20">
        <div className="max-w-4xl mx-auto px-4 h-full flex items-start">
          <Card className="w-full mb-6">
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
                      loading={"lazy"}
                    />
                    <AvatarFallback className="text-xl bg-blue-500 text-white">
                      {user?.name?.charAt(0)?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {isImageHovered && (
                    <div
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer"
                      onClick={handleProfilePicUpdateModalOpen}
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

            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Account Details Section */}
                <div className="space-y-4">
                  <AccountDetails user={user} />
                  <AccountStatus user={user} formatDate={formatDate} />
                </div>

                {/* Quick Actions Section */}
                <QuickActions
                  handleProfilePicUpdateModalOpen={
                    handleProfilePicUpdateModalOpen
                  }
                  navigate={navigate}
                  format={format}
                  user={user}
                />
              </div>
            </CardContent>

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

      <UpdateProfilePicModal
        isProfilePicModalOpen={isUpdateProfilePicModalOpen}
        handleImageUpdateSubmit={handleImageUpdateSubmit}
        handleProfilePicUpdateModalClose={handleProfilePicUpdateModalClose}
        profilePicLoading={profilePicLoading}
        handleImageUpload={handleImageUpload}
        userImage={userImage}
      />
    </>
  );
};

export default Profile;
