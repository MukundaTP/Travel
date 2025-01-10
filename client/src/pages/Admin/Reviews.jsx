import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  MoreHorizontal,
  Search,
  Star,
  Loader2,
  MessageSquare,
} from "lucide-react";
import {
  useDeleteReviewMutation,
  useGetAllReviewsQuery,
  useUpdateReviewMutation,
} from "../../../Redux/adminAuth";
import { useAlert } from "react-alert";

const Reviews = () => {
  // Scroll to top when the component is mounted (when the page loads)
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []); // Empty dependency array ensures this runs only once when the component mounts
  const [searchTerm, setSearchTerm] = useState("");
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [reviewToEdit, setReviewToEdit] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedMessage, setEditedMessage] = useState("");
  const alert = useAlert();

  const {
    data: reviewsData,
    isLoading,
    isError,
    error,
  } = useGetAllReviewsQuery(undefined, {
    pollingInterval: 30000,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: false,
    refetchOnReconnect: true,
  });

  const [deleteReview, { isLoading: deleteReviewLoading }] =
    useDeleteReviewMutation();
  const [updateReview, { isLoading: updateReviewLoading }] =
    useUpdateReviewMutation();

  const handleDeleteClick = (review) => {
    setReviewToDelete(review);
    setIsDeleteDialogOpen(true);
  };

  const handleEditClick = (review) => {
    setReviewToEdit(review);
    setEditedMessage(review.message);
    setIsEditDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!reviewToDelete) return;

    try {
      const data = await deleteReview(reviewToDelete._id).unwrap();
      alert.success(data?.message || "Review deleted successfully");
    } catch (e) {
      alert.error(e?.data?.message || "Failed to delete review");
    } finally {
      setIsDeleteDialogOpen(false);
      setReviewToDelete(null);
    }
  };

  const handleUpdate = async () => {
    if (!reviewToEdit || !editedMessage.trim()) return;

    try {
      const data = await updateReview({
        id: reviewToEdit._id,
        message: editedMessage,
      }).unwrap();
      alert.success(data?.message || "Review updated successfully");
      setIsEditDialogOpen(false);
      setReviewToEdit(null);
      setEditedMessage("");
    } catch (e) {
      alert.error(e?.data?.message || "Failed to update review");
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setReviewToDelete(null);
  };

  const handleCancelEdit = () => {
    setIsEditDialogOpen(false);
    setReviewToEdit(null);
    setEditedMessage("");
  };

  // Filter reviews based on search term
  const filteredReviews = reviewsData?.reviews?.filter(
    (review) =>
      review?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review?.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Render rating stars
  const renderRating = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

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
    <Card className="max-w-7xl mx-auto mt-16">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Reviews</CardTitle>
            <CardDescription>
              Manage customer reviews and feedback.
            </CardDescription>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reviews..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>User</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Review</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-12">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews?.length > 0 ? (
                filteredReviews.map((review) => (
                  <TableRow key={review?._id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <img
                          src={review?.avatar?.url}
                          alt={review?.name}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium">{review?.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {review?.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {renderRating(review?.rating)}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <p className="truncate">{review?.message}</p>
                    </TableCell>
                    <TableCell>
                      {new Date(review?.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onSelect={(e) => {
                              e.preventDefault();
                              handleEditClick(review);
                            }}
                          >
                            Edit Review
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onSelect={(e) => {
                              e.preventDefault();
                              handleDeleteClick(review);
                            }}
                          >
                            Delete Review
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-96 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <MessageSquare className="h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900">
                        No Reviews Found
                      </h3>
                      <p className="mt-2 text-gray-500">
                        {searchTerm
                          ? "No reviews match your search criteria."
                          : "There are no reviews yet."}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Delete Dialog */}
        <AlertDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete this review?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                review from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex gap-2 sm:justify-end">
              <AlertDialogCancel className="mt-0" onClick={handleCancelDelete}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-500 hover:bg-red-600"
                onClick={handleDelete}
                disabled={deleteReviewLoading}
              >
                {deleteReviewLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Delete"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Review</DialogTitle>
              <DialogDescription>
                Update the review message. Other fields cannot be modified.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>User</Label>
                <Input
                  value={reviewToEdit?.name || ""}
                  disabled
                  className="bg-muted"
                />
              </div>
              <div className="grid gap-2">
                <Label>Rating</Label>
                <div className="flex items-center gap-1 p-2 bg-muted rounded-md">
                  {reviewToEdit && renderRating(reviewToEdit.rating)}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Review Message</Label>
                <Textarea
                  id="message"
                  value={editedMessage}
                  onChange={(e) => setEditedMessage(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleCancelEdit}>
                Cancel
              </Button>
              <Button
                onClick={handleUpdate}
                disabled={updateReviewLoading || !editedMessage.trim()}
              >
                {updateReviewLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default Reviews;
