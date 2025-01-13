import { Calendar, Shield } from "lucide-react";

const AccountStatus = ({ user, formatDate }) => {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-500 mb-2">Account Status</h3>
      <div className="bg-white p-3 rounded-lg border space-y-3">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-gray-700" />
          <div>
            <p className="text-sm font-medium">Role</p>
            <div className="flex items-center gap-2">
              <p className="text-gray-600">
                {user?.isAdmin ? "Admin" : "User"}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-gray-700" />
          <div>
            <p className="text-sm font-medium">Member Since</p>
            <p className="text-gray-600">{formatDate(user?.createdAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountStatus;
