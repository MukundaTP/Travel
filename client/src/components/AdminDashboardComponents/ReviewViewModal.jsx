import { Calendar, Mail, Star, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ReviewViewModal = ({
  selectedReview,
  setIsViewDialogOpen,
  isViewDialogOpen,
  renderRating,
}) => {
  return (
    <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Review Details
          </DialogTitle>
          <DialogDescription>
            View complete details of the customer review
          </DialogDescription>
        </DialogHeader>

        {selectedReview && (
          <div
            className="overflow-y-auto pr-2"
            style={{ maxHeight: "calc(90vh - 150px)" }}
          >
            <div className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-500">
                  Reviewer Information
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="text-sm font-medium">{selectedReview.name}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Contact Details</p>
                    <div className="space-y-1 mt-1">
                      <p className="text-sm font-medium flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        {selectedReview.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Review Details */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-500">
                  Review Information
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="h-4 w-4 text-gray-400" />
                      <p className="text-sm text-gray-500">Rating</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {renderRating(selectedReview.rating)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-500">
                  Review Message
                </h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {selectedReview.message}
                  </p>
                </div>
              </div>

              {/* Submission Info */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Submission Date</p>
                    <p className="text-sm font-medium">
                      {new Date(selectedReview.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReviewViewModal;
