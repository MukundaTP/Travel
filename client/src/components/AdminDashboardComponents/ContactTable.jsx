import {
  Calendar,
  Clock,
  Eye,
  Mail,
  MapPin,
  MessageSquare,
  MoreHorizontal,
  Phone,
  Trash2,
  Users,
} from "lucide-react";
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

const ContactTable = ({
  filteredQueries,
  handleViewClick,
  formatDate,
  handleDeleteClick,
}) => {
  return (
    <div className="rounded-lg border bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead>Contact Info</TableHead>
            <TableHead>Travel Details</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="w-[80px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredQueries?.map((query) => (
            <TableRow
              key={query._id}
              className="hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => handleViewClick(query)}
            >
              <TableCell className="font-medium">
                {query.firstName} {query.lastName}
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span className="text-sm flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    {query.email}
                  </span>
                  <span className="text-sm flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    {query.phone}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span className="text-sm flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    {query.startLocation} → {query.endLocation}
                  </span>
                  <span className="text-sm flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    {formatDate(query.departureDate)}
                    <span className="text-gray-400 mx-1">•</span>
                    <Clock className="h-4 w-4 text-gray-400" />
                    {query.departureTime}
                    <span className="text-gray-400 mx-1">•</span>
                    <Users className="h-4 w-4 text-gray-400" />
                    {query.travelers}{" "}
                    {parseInt(query.travelers) === 1 ? "person" : "people"}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm text-gray-600">
                  {formatDate(query.createdAt)}
                </span>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    asChild
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewClick(query);
                      }}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(query);
                      }}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Query
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {filteredQueries?.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">
            No Queries Found
          </h3>
          <p className="mt-2 text-gray-500">
            No contact queries match your search criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default ContactTable;
