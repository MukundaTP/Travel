import { Button } from "../ui/button";
import { Key, Shield, User } from "lucide-react";

const QuickActions = ({
  handleProfilePicUpdateModalOpen,
  navigate,
  format,
  user,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-500">Quick Actions</h3>
      <div className="bg-white p-3 rounded-lg border space-y-3">
        <Button
          variant="outline"
          className="w-full justify-start hover:bg-blue-50 hover:text-blue-600"
          onClick={handleProfilePicUpdateModalOpen}
        >
          <User className="w-4 h-4 mr-2" />
          Update Profile picture
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
            onClick={() => navigate("/dashboard")}
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
  );
};

export default QuickActions;
