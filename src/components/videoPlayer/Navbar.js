import React from "react";
import classes from "./Navbar.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";

const Navbar = () => {

  const param = useParams();

  return (
    <div className={classes.container}>
      <div className={classes.subcontainer}>
        <div className={classes.back}>
          <Link to={`/course-material/${param.course}`}>
            <IoIosArrowBack className={classes.icon} />
          </Link>
        </div>
        <div className={classes.heading}>Excellence Foundation</div>
      </div>
      <div className={classes.sessionDetails}>session by Aashlesh Nyati</div>
    </div>
  );
};

export default Navbar;
