import React from "react";
import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <div className={classes.loading}>
      <span className={classes.loader}></span>
    </div>
  );
};

export default LoadingSpinner;
