// components/layouts/AdminLayout.jsx
import SidebarDemo from "@/components/SideBar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50 mt-24">
      <SidebarDemo open={open} setOpen={setOpen} />
      <div className="flex-1 p-8 overflow-y-auto">
        <Outlet /> {/* This will render the child routes */}
      </div>
    </div>
  );
};

export default AdminLayout;
