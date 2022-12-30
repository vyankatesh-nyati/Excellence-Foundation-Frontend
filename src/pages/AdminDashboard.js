import React from "react";
import AdminDashboardContent from "../components/AdminDashboard/AdminDashboardContent";
import DashboardNavbar from "../components/dashboardElements/DashboardNavbar";

const AdminDashboard = () => {
  return (
    <>
      <DashboardNavbar />
      <AdminDashboardContent />
    </>
  );
};

export default AdminDashboard;
