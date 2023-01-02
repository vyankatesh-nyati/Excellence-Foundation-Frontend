import React from "react";
import AdminNavContent from "../AdminDashboard/AdminNavContent";
import SignupForm from "./SignupForm";
import classes from "./Subcontainer.module.css";
import StudentUpdate from "../StudentUpdate/StudentUpdate";

const Subcontainer = (props) => {
  return (
    <div className={classes.container}>
      <AdminNavContent />
      {props.signup && <SignupForm />}
      {!props.signup && <StudentUpdate />}
    </div>
  );
};

export default Subcontainer;
