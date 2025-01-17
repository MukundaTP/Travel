import { Users } from "lucide-react";

const TeamMembersError = ({ error }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-4">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
        <Users className="w-8 h-8 text-gray-700" />
      </div>
      <p className="text-gray-700 font-medium">
        {error?.data?.message || "Failed to load team members"}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
};

export default TeamMembersError;
