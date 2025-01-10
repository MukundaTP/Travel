import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Loader2,
  Mail,
  Phone,
  Calendar,
  Trash2,
  MoreHorizontal,
  Eye,
  User,
  MessageSquare,
} from "lucide-react";
import {
  useDeleteContactQueriesMutation,
  useGetAllContactQueriesQuery,
} from "../../../Redux/adminAuth";
import { useAlert } from "react-alert";

const ContactQueries = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [queryToDelete, setQueryToDelete] = useState(null);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const alert = useAlert();
  const {
    data: queriesData,
    isLoading,
    isError,
    error,
  } = useGetAllContactQueriesQuery(undefined, {
    pollingInterval: 30000,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: false,
    refetchOnReconnect: true,
  });

  const [deleteQuery, { isLoading: deleteQueryLoading }] =
    useDeleteContactQueriesMutation();

  const handleViewClick = (query) => {
    setSelectedQuery(query);
    setIsViewDialogOpen(true);
  };

  const handleDeleteClick = (query) => {
    setQueryToDelete(query);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!queryToDelete) return;

    try {
      const data = await deleteQuery(queryToDelete._id).unwrap();
      alert.success(data?.message || "Query deleted successfully");
    } catch (e) {
      alert.error(e?.data?.message || "Failed to delete query");
    } finally {
      setIsDeleteDialogOpen(false);
      setQueryToDelete(null);
    }
  };

  // Filter queries based on search term
  const filteredQueries = queriesData?.queries?.filter(
    (query) =>
      query?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query?.message?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <div className="h-full bg-gray-50/50">
      {/* <div className="bg-gray-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Contact Queries
          </h1>
          <div className="flex items-center justify-between">
            <p className="text-gray-300">
              Manage and review customer inquiries
            </p>
            <Badge variant="secondary" className="bg-gray-600 text-white">
              Total Queries: {filteredQueries?.length || 0}
            </Badge>
          </div>
        </div>
      </div> */}

      <div className="max-w-7xl mx-auto px-6">
        <Card className="shadow-lg -mt-6">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Search className="h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search queries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border bg-white">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="w-[250px]">Name</TableHead>
                    <TableHead>Contact Info</TableHead>
                    <TableHead className="max-w-[300px]">
                      Message Preview
                    </TableHead>
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
                      <TableCell className="max-w-[300px]">
                        <p className="truncate text-sm text-gray-600">
                          {query.message}
                        </p>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600">
                          {new Date(query.createdAt).toLocaleDateString()}
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
          </CardContent>
        </Card>
      </div>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <User className="h-5 w-5" />
              Contact Query Details
            </DialogTitle>
            <DialogDescription>
              View complete information about this contact request
            </DialogDescription>
          </DialogHeader>

          {selectedQuery && (
            <div className="space-y-6 py-4">
              {/* Personal Information */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-500">
                  Personal Information
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="text-sm font-medium">
                      {selectedQuery.firstName} {selectedQuery.lastName}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Submission Date</p>
                    <p className="text-sm font-medium">
                      {new Date(selectedQuery.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-500">
                  Contact Information
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <p className="text-sm font-medium">
                        {selectedQuery.email}
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <p className="text-sm font-medium">
                        {selectedQuery.phone}
                      </p>
                      {selectedQuery.altPhone && (
                        <>
                          <span className="text-gray-400">|</span>
                          <p className="text-sm font-medium">
                            Alt: {selectedQuery.altPhone}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-500">Message</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {selectedQuery.message}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this query?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              contact query from our records.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className={"flex gap-2 sm:justify-end"}>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDelete}
              disabled={deleteQueryLoading}
            >
              {deleteQueryLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ContactQueries;
