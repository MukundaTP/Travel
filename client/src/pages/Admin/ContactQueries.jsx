import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import {
  useDeleteContactQueriesMutation,
  useGetAllContactQueriesQuery,
} from "../../../Redux/adminAuth";
import { useAlert } from "react-alert";
import MetaData from "@/components/layouts/MetaData";
import DeleteContact from "@/components/AdminDashboardComponents/DeleteContact";
import ViewContact from "@/components/AdminDashboardComponents/ViewContact";
import ContactTable from "@/components/AdminDashboardComponents/ContactTable";

const ContactQueries = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      return dateString;
    }
  };

  const filteredQueries = queriesData?.filter(
    (query) =>
      query?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query?.startLocation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query?.endLocation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query?.departureDate?.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
    <>
      <MetaData title={"Admin-Contact Queries"} />
      <div className="h-full bg-gray-50/50 mt-20">
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
              <ContactTable
                filteredQueries={filteredQueries}
                handleViewClick={handleViewClick}
                formatDate={formatDate}
                handleDeleteClick={handleDeleteClick}
              />
            </CardContent>
          </Card>
        </div>

        {/* View Dialog */}

        <ViewContact
          isViewDialogOpen={isViewDialogOpen}
          setIsViewDialogOpen={setIsViewDialogOpen}
          selectedQuery={selectedQuery}
          formatDate={formatDate}
        />

        {/* Delete Dialog */}
        <DeleteContact
          isDeleteDialogOpen={isDeleteDialogOpen}
          setIsDeleteDialogOpen={setIsDeleteDialogOpen}
          setQueryToDelete={setQueryToDelete}
          handleDelete={handleDelete}
          deleteQueryLoading={deleteQueryLoading}
        />
      </div>
    </>
  );
};

export default ContactQueries;
