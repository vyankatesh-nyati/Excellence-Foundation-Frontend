import React from "react";
import classes from "./Form.module.css";
import { FaUserCircle } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

const Form = () => {
  return (
    <form className={classes.container}>
      <h1>SIGN IN</h1>
      <div className={classes.inputLabel}>
        <label>
          <FaUserCircle /> Email
        </label>
        <input type="email" />
      </div>
      <div className={classes.inputLabel}>
        <label>
          <RiLockPasswordFill /> Password
        </label>
        <input type="password" />
      </div>
      <button type="submit">Sign in</button>
    </form>
  );
};

export default Form;
