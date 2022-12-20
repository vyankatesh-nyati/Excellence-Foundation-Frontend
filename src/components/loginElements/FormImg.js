import React from "react";
import girl from "../../Assests/girl.png";
import classes from "./FormImg.module.css";

const FormImg = () => {
  return (
    <div className={classes.container}>
      <img src={girl} />
    </div>
  );
};

export default FormImg;
