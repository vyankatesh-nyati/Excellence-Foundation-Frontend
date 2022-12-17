import React from "react";
import CourseElement from "./courseContent/CourseElement";
import classes from "./DashboardContent.module.css";
import NavContent from "./navContent/NavContent";

const DashboardContent = () => {
  return (
    <div className={classes.container}>
      <div className={classes.navContent}>
        <NavContent />
      </div>
      <div className={classes.courseContent}>
        <CourseElement />
        <CourseElement />
        <CourseElement />
      </div>
    </div>
  );
};

export default DashboardContent;
