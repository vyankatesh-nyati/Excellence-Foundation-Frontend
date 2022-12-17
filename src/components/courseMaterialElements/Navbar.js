import React from "react";
import NavItem from "../dashboardElements/navContent/NavItem";
import classes from "./Navbar.module.css";
import dashBoardIcon from "../../Assests/dashboardIcon.png";
import logo from "../../Assests/logo.png";

const Navbar = () => {
  return (
    <div className={classes.container}>
      <div className={classes.navigator}>
        <NavItem heading="Dashboard" icon={dashBoardIcon} />
      </div>
      <div className={classes.logo}>
        <img src={logo} alt="Excellence Foundation" />
      </div>
    </div>
  );
};

export default Navbar;
