import React from "react";
import classes from "./NavItem.module.css";


const NavItem = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.icon}>
        <img src={props.icon} alt="grid icon" />
      </div>
      <div className={classes.content}>
        <p>{props.heading}</p>
      </div>
    </div>
  );
};

export default NavItem;
