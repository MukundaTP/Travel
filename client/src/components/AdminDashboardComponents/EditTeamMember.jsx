import React, { useState, useEffect } from "react";
import { Upload, Loader2 } from "lucide-react";
import { useUpdateTeamMemberMutation } from "../../../Redux/adminAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAlert } from "react-alert";

// Validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  designation: z.string().min(2, "Designation must be at least 2 characters"),
  description: z.string().optional(),
  image: z.any(),
});

const EditTeamMemberModal = ({ isOpen, onClose, teamMember }) => {
  const [updateTeamMember, { isLoading }] = useUpdateTeamMemberMutation();
  const [imagePreview, setImagePreview] = useState(null);
  const alert = useAlert();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      designation: "",
      description: "",
      image: null,
    },
  });

  useEffect(() => {
    if (teamMember && isOpen) {
      form.reset({
        name: teamMember.name,
        designation: teamMember.designation,
        description: teamMember.description || "",
        image: teamMember.image?.url || null,
      });
      setImagePreview(teamMember.image?.url || null);
    }
  }, [teamMember, isOpen, form]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        form.setValue("image", reader.result);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const onSubmit = async (data) => {
    try {
      const response = await updateTeamMember({
        id: teamMember._id,
        ...data,
      }).unwrap();

      // Assuming you're using react-hot-toast or similar
      alert.success(response.message || "Team member updated successfully");
      onClose(); // This should work now
    } catch (error) {
      alert.error(error?.data?.message || "Failed to update team member");
      console.error("Update error:", error);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Team Member</DialogTitle>
          <DialogDescription>
            Update team member information and profile picture.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Image Upload */}
              <div className="space-y-2">
                <FormLabel>Profile Picture</FormLabel>
                <div className="flex flex-col items-center justify-center">
                  <div className="w-48 h-48 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl flex items-center justify-center relative overflow-hidden hover:border-gray-300 dark:hover:border-gray-700 transition-colors group">
                    {imagePreview ? (
                      <>
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <p className="text-white text-sm">Change Photo</p>
                        </div>
                      </>
                    ) : (
                      <div className="text-center text-gray-500 dark:text-gray-400">
                        <Upload className="h-12 w-12 mx-auto mb-2" />
                        <p>Upload Photo</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="designation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Designation</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter designation" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter team member description"
                      className="h-32 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTeamMemberModal;
