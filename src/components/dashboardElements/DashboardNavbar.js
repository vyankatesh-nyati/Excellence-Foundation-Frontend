import React from "react";
import classes from "./DashboardNavbar.module.css";
import logo from "../../Assests/logo.png";
import avtar from "../../Assests/avtar.png";

const DashboardNavbar = () => {
  return (
    <div className={classes.container}>
      <div className={classes.logo}>
        <img src={logo} alt="Excellence Foundation Logo" />
      </div>
      <div className={classes.avtar}>
        <img src={avtar} alt="Avtar" />
      </div>
    </div>
  );
};

export default DashboardNavbar;