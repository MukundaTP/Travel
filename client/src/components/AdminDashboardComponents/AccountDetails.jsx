import { Mail, User } from "lucide-react";

const AccountDetails = ({ user }) => {
  return (
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
  );
};

export default AccountDetails;
