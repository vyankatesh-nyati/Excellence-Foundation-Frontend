import React from "react";
import classes from "./NavContent.module.css";
import menuIcon from "../../../Assests/menuIcon.png";
import NavItem from "./NavItem";
import dashboardIcon from "../../../Assests/dashboardIcon.png"
import logoutIcon from "../../../Assests/logoutIcon.png"

const NavContent = () => {
  return (
    <div className={classes.navbar}>
      <div className={classes.headingContent}>
        <div className={classes.menuImage}>
          <img src={menuIcon} alt="menu Icon" />
        </div>
        <div className={classes.heading}>
          <p>Menu</p>
        </div>
      </div>
      <div className={classes.navigators}>
        <NavItem heading="Dashboard" icon={dashboardIcon} />
        <NavItem heading="Logout" icon={logoutIcon} />
      </div>
    </div>
  );
};

export default NavContent;
