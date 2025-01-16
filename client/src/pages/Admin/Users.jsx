import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Search, Loader2 } from "lucide-react";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "../../../Redux/adminAuth";
import { useAlert } from "react-alert";
import MetaData from "@/components/layouts/MetaData";
import EditUser from "@/components/AdminDashboardComponents/EditUser";
import DeleteUserModal from "@/components/AdminDashboardComponents/DeleteUserModal";
import UsersTable from "@/components/AdminDashboardComponents/UsersTable";

const Users = () => {
  // Scroll to top when the component is mounted (when the page loads)
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []); // Empty dependency array ensures this runs only once when the component mountsconst
  const [searchTerm, setSearchTerm] = useState("");

  const [userToDelete, setUserToDelete] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedAdminStatus, setSelectedAdminStatus] = useState("");
  const alert = useAlert();

  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useGetAllUsersQuery(undefined, {
    pollingInterval: 30000,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: false,
    refetchOnReconnect: true,
  });

  const [deleteUser, { isLoading: deleteUserLoading }] =
    useDeleteUserMutation();
  const [updateUser, { isLoading: updateUserLoading }] =
    useUpdateUserMutation();

  const handleDeleteClick = (userId) => {
    setUserToDelete(userId);
    setIsDeleteDialogOpen(true);
  };

  const handleEditClick = (user) => {
    setUserToEdit(user);
    setSelectedAdminStatus(user.isAdmin ? "true" : "false");
    setIsEditDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!userToDelete) return;

    try {
      const data = await deleteUser(userToDelete).unwrap();
      alert.success(data?.message || "User deleted successfully");
    } catch (e) {
      alert.error(e?.data?.err || "Failed to delete user");
    } finally {
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const handleUpdate = async () => {
    if (!userToEdit) return;

    try {
      const data = await updateUser({
        id: userToEdit._id,
        isAdmin: selectedAdminStatus === "true",
      }).unwrap();
      alert.success(data?.message || "User updated successfully");
      setIsEditDialogOpen(false);
      setUserToEdit(null);
    } catch (e) {
      alert.error(e?.data?.err || "Failed to update user");
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  const handleCancelEdit = () => {
    setIsEditDialogOpen(false);
    setUserToEdit(null);
    setSelectedAdminStatus("");
  };

  // Filter users based on search term
  const filteredUsers = users?.filter(
    (user) =>
      user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-destructive">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <>
      <MetaData title={"Admin-Users"} />

      <Card className="w-full mt-16">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Users</CardTitle>
              <CardDescription>
                Manage your user base from this dashboard.
              </CardDescription>
            </div>
            {/* <Button className="flex items-center gap-2">
        <UserPlus className="h-4 w-4" />
        Add New User
      </Button> */}
          </div>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <UsersTable
            filteredUsers={filteredUsers}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
          />
          {/* Delete Dialog */}
          <DeleteUserModal
            isDeleteDialogOpen={isDeleteDialogOpen}
            setIsDeleteDialogOpen={setIsDeleteDialogOpen}
            handleCancelDelete={handleCancelDelete}
            handleDelete={handleDelete}
            deleteUserLoading={deleteUserLoading}
          />

          {/* Edit Dialog */}
          <EditUser
            isEditDialogOpen={isEditDialogOpen}
            setIsEditDialogOpen={setIsEditDialogOpen}
            userToEdit={userToEdit}
            setSelectedAdminStatus={setSelectedAdminStatus}
            handleCancelEdit={handleCancelEdit}
            updateUserLoading={updateUserLoading}
            selectedAdminStatus={selectedAdminStatus}
            handleUpdate={handleUpdate}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default Users;
