import React from "react";
import FormImg from "../loginElements/FormImg";
import AdminForm from "./AdminForm";
import classes from "./AdminLoginForm.module.css";

const AdminLoginForm = () => {
  return (
    <div className={classes.container}>
      <FormImg />
      <AdminForm />
    </div>
  );
};

export default AdminLoginForm;
