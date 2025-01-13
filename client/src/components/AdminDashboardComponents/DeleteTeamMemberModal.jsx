import React from "react";
import { Loader2 } from "lucide-react";
import { useDeleteTeamMemberMutation } from "../../../Redux/adminAuth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAlert } from "react-alert";

const DeleteTeamMemberModal = ({ isOpen, onClose, teamMember }) => {
  const [deleteTeamMember, { isLoading }] = useDeleteTeamMemberMutation();
  const alert = useAlert();

  const handleDelete = async () => {
    try {
      let res = await deleteTeamMember(teamMember._id).unwrap();
      alert.success(res.message || "Team member deleted successfully");
      onClose();
    } catch (error) {
      alert.error(error?.data?.err || "Failed to delete team member");
    }
  };

  const handleCancel = () => {
    if (!isLoading) {
      onClose();
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this team member?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            <span className="font-medium text-gray-700">
              {teamMember?.name}
            </span>
            's profile and remove their data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-2 sm:justify-end">
          <AlertDialogCancel
            className="mt-0"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTeamMemberModal;
