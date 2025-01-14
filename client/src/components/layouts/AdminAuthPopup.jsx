import { Input } from "@/components/ui/input";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAlert } from "react-alert";

const AdminAuthPopup = ({ isOpen, onClose, onSuccess, authType }) => {
  const [adminKey, setAdminKey] = useState("");
  const alert = useAlert();

  const handleSubmit = (e) => {
    e.preventDefault();
    const envAdminKey = import.meta.env.VITE_ADMIN_KEY;

    if (adminKey === envAdminKey) {
      onSuccess();
      setAdminKey("");
      onClose();
    } else {
      alert.error("Invalid admin key! Only admins can access this area.");
      setAdminKey("");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-white rounded-lg shadow-xl p-6 relative"
          >
            <Button
              variant="ghost"
              className="absolute right-0 top-4"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>

            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Admin Authentication Required
            </h2>

            <p className="text-gray-600 mb-6">
              Please enter the admin key to access the {authType} page.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="password"
                placeholder="Enter admin key"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                className="w-full"
                required
              />

              <Button
                type="submit"
                className="w-full bg-gray-800 hover:bg-gray-700 text-white"
              >
                Verify & Continue
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdminAuthPopup;
