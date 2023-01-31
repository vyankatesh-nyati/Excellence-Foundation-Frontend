import React, { useState } from "react";
import classes from "./AdminDashboardContent.module.css";
import AdminNavContent from "./AdminNavContent";
import TableData from "./TableData";
import TableForm from "./TableForm";

const AdminDashboardContent = () => {
  const [search, setSearch] = useState("all");
  const [month, setMonth] = useState("all");
  const [year, setYear] = useState("all");

  const queryHandler = (search, month, year) => {
    setSearch(search);
    setMonth(month);
    setYear(year);
  };

  return (
    <div className={classes.container}>
      <AdminNavContent />
      <div className={classes.data}>
        <TableForm queryHandler={queryHandler} />
        <TableData year={year} month={month} search={search} />
      </div>
    </div>
  );
};

export default AdminDashboardContent;
