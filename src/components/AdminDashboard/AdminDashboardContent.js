import React from "react";
import classes from "./AdminDashboardContent.module.css";
import AdminNavContent from "./AdminNavContent";
import TableData from "./TableData";
import TableForm from "./TableForm";

const AdminDashboardContent = () => {
  return (
    <div className={classes.container}>
      <div className={classes.navContent}>
        <AdminNavContent />
      </div>
      <div className={classes.data}>
        <TableForm />
        <TableData />
      </div>
    </div>
  );
};

export default AdminDashboardContent;
