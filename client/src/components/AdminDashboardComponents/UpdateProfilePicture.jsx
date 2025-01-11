import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";

const UpdateProfilePicModal = ({
  isProfilePicModalOpen,
  handleImageUpdateSubmit,
  handleProfilePicUpdateModalClose,
  profilePicLoading,
  handleImageUpload,
  userImage,
}) => {
  return (
    <Dialog
      open={isProfilePicModalOpen}
      onOpenChange={handleProfilePicUpdateModalClose}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Profile Picture</DialogTitle>
          <DialogDescription>
            Choose a new profile picture to upload. Supported formats: JPG, PNG
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleImageUpdateSubmit} className="space-y-4">
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              {userImage ? (
                <div className="relative w-full h-full p-2">
                  <img
                    src={userImage}
                    alt="Preview"
                    className="object-contain w-full h-full rounded-lg"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleImageUpload({ target: { files: [] } });
                    }}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <Upload className="w-12 h-12 text-gray-400" />
                  <p className="text-sm text-gray-600">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    Maximum file size: 5MB
                  </p>
                </div>
              )}
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleProfilePicUpdateModalClose}
              disabled={profilePicLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!userImage || profilePicLoading}
              className="bg-gray-700 hover:bg-gray-600"
            >
              {profilePicLoading ? "Uploading..." : "Upload Picture"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfilePicModal;
