import { Plus, Users } from "lucide-react";

const EmptyTeamMembersState = ({ user, setIsAddModalOpen }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-4">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
        <Users className="w-8 h-8 text-gray-700" />
      </div>
      <p className="text-gray-700 font-medium">No team members yet</p>
      {user?.isAdmin && (
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add First Team Member</span>
        </button>
      )}
    </div>
  );
};

export default EmptyTeamMembersState;
