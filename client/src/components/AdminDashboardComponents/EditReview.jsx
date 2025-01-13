import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "../ui/input";

const EditReview = ({
  setIsEditDialogOpen,
  isEditDialogOpen,
  reviewToEdit,
  renderRating,
  updateReviewLoading,
  editedMessage,
  setEditedMessage,
  handleCancelEdit,
  handleUpdate,
}) => {
  return (
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
  );
};

export default EditReview;
