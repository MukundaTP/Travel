import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Calendar,
  Clock,
  Mail,
  MapPin,
  Phone,
  User,
  Users,
} from "lucide-react";
const ViewContact = ({
  isViewDialogOpen,
  setIsViewDialogOpen,
  selectedQuery,
  formatDate,
}) => {
  return (
    <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
      <DialogContent className="sm:max-w-[1200px] max-h-[90vh] overflow-hidden mt-10">
        <DialogHeader className="pb-4">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <User className="h-5 w-5" />
            Contact Query Details
          </DialogTitle>
          <DialogDescription>
            View complete information about this travel request
          </DialogDescription>
        </DialogHeader>

        {selectedQuery && (
          <div
            className="overflow-y-auto pr-2"
            style={{ maxHeight: "calc(90vh - 150px)" }}
          >
            <div className="space-y-6">
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
                    <p className="text-sm text-gray-500">Contact Details</p>
                    <div className="space-y-1 mt-1">
                      <p className="text-sm font-medium flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        {selectedQuery.email}
                      </p>
                      <p className="text-sm font-medium flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        {selectedQuery.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Travel Details */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-500">
                  Travel Information
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <p className="text-sm text-gray-500">Route</p>
                    </div>
                    <p className="text-sm font-medium">
                      From: {selectedQuery.startLocation}
                    </p>
                    <p className="text-sm font-medium">
                      To: {selectedQuery.endLocation}
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <p className="text-sm text-gray-500">Date</p>
                      </div>
                      <p className="text-sm font-medium">
                        {formatDate(selectedQuery.departureDate)}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <p className="text-sm text-gray-500">Time</p>
                      </div>
                      <p className="text-sm font-medium">
                        {selectedQuery.departureTime}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <p className="text-sm text-gray-500">Group Size</p>
                      </div>
                      <p className="text-sm font-medium">
                        {selectedQuery.travelers}{" "}
                        {parseInt(selectedQuery.travelers) === 1
                          ? "person"
                          : "people"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-500">
                  Additional Message
                </h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {selectedQuery.message}
                  </p>
                </div>
              </div>

              {/* Submission Info */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Submission Date</p>
                <p className="text-sm font-medium">
                  {new Date(selectedQuery.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewContact;
