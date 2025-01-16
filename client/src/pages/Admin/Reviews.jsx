import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Search, Star, Loader2, MoreHorizontal } from "lucide-react";
import {
  useDeleteReviewMutation,
  useGetAllReviewsQuery,
  useUpdateReviewMutation,
} from "../../../Redux/adminAuth";
import { useAlert } from "react-alert";
import MetaData from "@/components/layouts/MetaData";
import DeleteReviewModal from "@/components/AdminDashboardComponents/DeleteReviewModal";
import EditReview from "@/components/AdminDashboardComponents/EditReview";
import ReviewViewModal from "@/components/AdminDashboardComponents/ReviewViewModal";
import ReviewsTable from "@/components/AdminDashboardComponents/ReviewsTable";

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

  const [selectedReview, setSelectedReview] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const handleDeleteClick = (review) => {
    setReviewToDelete(review);
    setIsDeleteDialogOpen(true);
  };

  const handleEditClick = (review) => {
    setReviewToEdit(review);
    setEditedMessage(review.message);
    setIsEditDialogOpen(true);
  };

  const handleViewClick = (review) => {
    setSelectedReview(review);
    setIsViewDialogOpen(true);
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
  const filteredReviews = reviewsData?.filter(
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
        <p className="text-destructive">
          Error: {error && error.message ? error.message : "Unknown error"}
        </p>
      </div>
    );
  }

  return (
    <>
      <MetaData title="Admin-Reviews" />
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
          {/* Reviews Table */}

          <ReviewsTable
            filteredReviews={filteredReviews}
            handleViewClick={handleViewClick}
            renderRating={renderRating}
            MoreHorizontazal={MoreHorizontal}
            handleDeleteClick={handleDeleteClick}
            handleEditClick={handleEditClick}
            searchTerm={searchTerm}
          />

          {/* Delete Dialog */}
          <DeleteReviewModal
            isDeleteDialogOpen={isDeleteDialogOpen}
            setIsDeleteDialogOpen={setIsDeleteDialogOpen}
            handleCancelDelete={handleCancelDelete}
            deleteReviewLoading={deleteReviewLoading}
            Loader2={Loader2}
            handleDelete={handleDelete}
          />

          {/* Edit Dialog */}
          <EditReview
            setIsEditDialogOpen={setIsEditDialogOpen}
            isEditDialogOpen={isEditDialogOpen}
            reviewToEdit={reviewToEdit}
            renderRating={renderRating}
            updateReviewLoading={updateReviewLoading}
            editedMessage={editedMessage}
            setEditedMessage={setEditedMessage}
            handleCancelEdit={handleCancelEdit}
            handleUpdate={handleUpdate}
          />

          {/* View Dialog */}

          <ReviewViewModal
            selectedReview={selectedReview}
            setIsViewDialogOpen={setIsViewDialogOpen}
            isViewDialogOpen={isViewDialogOpen}
            renderRating={renderRating}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default Reviews;
