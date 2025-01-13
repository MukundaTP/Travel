import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Star } from "lucide-react";

const ViewReviewDialog = ({ review, open, onOpenChange }) => {
  if (!review) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            Review Details
          </DialogTitle>
          <DialogDescription>
            View complete review information
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent hover:scrollbar-thumb-gray-300">
          {/* User Information Section */}
          <div className="space-y-6 py-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <img
                src={review.avatar.url}
                loading="lazy"
                alt={review.name}
                className="h-16 w-16 rounded-full object-cover border-4 border-white shadow-sm"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {review.name}
                </h3>
                <p className="text-sm text-gray-500">{review.email}</p>
              </div>
            </div>

            {/* Rating Section */}
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <h4 className="text-sm font-medium text-gray-500">Rating</h4>
              <div className="flex gap-2 items-center">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`h-5 w-5 ${
                        index < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  ({review.rating}/5)
                </span>
              </div>
            </div>

            {/* Review Message */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-500">
                Review Message
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent hover:scrollbar-thumb-gray-300">
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
                  {review.message}
                </p>
              </div>
            </div>

            {/* Additional Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Posted On</p>
                <p className="text-sm font-medium text-gray-700">
                  {new Date(review.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Last Updated</p>
                <p className="text-sm font-medium text-gray-700">
                  {new Date(review.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewReviewDialog;
