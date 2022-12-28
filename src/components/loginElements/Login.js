import React from "react";
import Loginform from "./Loginform";
import Navbar from "./Navbar";
import classes from "./Login.module.css";

const Login = () => {
  return (
    <div className={classes.container}>
      <Navbar />
      <Loginform />
    </div>
  );
};

export default Login;
