import React from "react";
import Loginform from "../components/loginElements/Loginform";
import Navbar from "../components/loginElements/Navbar";
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
