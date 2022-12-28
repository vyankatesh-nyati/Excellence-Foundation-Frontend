import React from "react";
import Navbar from "../loginElements/Navbar";
import classes from "./AdminLogin.module.css";
import AdminLoginForm from "./AdminLoginForm";

const AdminLogin = () => {
  return (
    <div className={classes.container}>
      <Navbar />
      <AdminLoginForm />
    </div>
  );
};

export default AdminLogin;
