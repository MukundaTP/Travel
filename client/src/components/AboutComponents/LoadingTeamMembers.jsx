const LoadingTeamMembers = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-4">
      <div className="w-16 h-16 border-4 border-gray-700 border-t-transparent rounded-full animate-spin" />
      <p className="text-gray-700 font-medium">Loading team members...</p>
    </div>
  );
};

export default LoadingTeamMembers;
