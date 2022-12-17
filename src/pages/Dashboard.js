import React from "react";
import DashboardNavbar from "../components/dashboardElements/DashboardNavbar";
import DashboardContent from "../components/dashboardElements/DashboardContent";
import classes from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={classes.container}>
      <DashboardNavbar />
      <DashboardContent />
    </div>
  );
};

export default Dashboard;
