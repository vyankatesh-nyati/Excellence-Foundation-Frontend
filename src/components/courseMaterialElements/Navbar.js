import React from "react";
import classes from "./Navbar.module.css";
import logo from "../../Assests/logo.webp";
import { MdSpaceDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const Navbar = () => {
  return (
    <div className={classes.container}>
      <div className={classes.back}>
        <Link to="/dashboard">
          <IoIosArrowBack />
        </Link>
      </div>
      <div className={classes.navigator}>
        <Link to="/dashboard">
          <div className={classes.navItem}>
            <MdSpaceDashboard /> Dashboard
          </div>
        </Link>
      </div>
      <div className={classes.logo}>
        <img src={logo} alt="Excellence Foundation" />
      </div>
    </div>
  );
};

export default Navbar;
