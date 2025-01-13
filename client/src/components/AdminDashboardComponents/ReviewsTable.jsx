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
import { Button } from "../ui/button";
import { MessageSquare } from "lucide-react";
const ReviewsTable = ({
  filteredReviews,
  handleViewClick,
  renderRating,
  MoreHorizontazal,
  handleDeleteClick,
  handleEditClick,
  searchTerm,
}) => {
  return (
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
              <TableRow
                key={review?._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell
                  className="cursor-pointer"
                  onClick={() => handleViewClick(review)}
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={review?.avatar?.url}
                      alt={review?.name}
                      className="h-8 w-8 rounded-full object-cover"
                      loading="lazy"
                    />
                    <div>
                      <p className="font-medium">{review?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {review?.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell
                  className="cursor-pointer"
                  onClick={() => handleViewClick(review)}
                >
                  <div className="flex items-center gap-1">
                    {renderRating(review?.rating)}
                  </div>
                </TableCell>
                <TableCell
                  className="max-w-md cursor-pointer"
                  onClick={() => handleViewClick(review)}
                >
                  <p className="truncate">{review?.message}</p>
                </TableCell>
                <TableCell
                  className="cursor-pointer"
                  onClick={() => handleViewClick(review)}
                >
                  {new Date(review?.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      asChild
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontazal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditClick(review);
                        }}
                      >
                        Edit Review
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
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
  );
};

export default ReviewsTable;
