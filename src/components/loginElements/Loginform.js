import React from "react";
import Form from "./Form";
import FormImg from "./FormImg";
import classes from "./Loginform.module.css";

const Loginform = () => {
  return (
    <div className={classes.container}>
      <FormImg />
      <Form />
    </div>
  );
};

export default Loginform;
