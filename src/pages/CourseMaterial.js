import React from "react";
import { CourseElement } from "../components/courseMaterialElements/CourseElement";
import Navbar from "../components/courseMaterialElements/Navbar";
import classes from "./CourseMaterial.module.css";

const courseMaterial = () => {
  return (
    <div>
      <Navbar />
      <div className={classes.sessions}>
        <CourseElement />
        <CourseElement />
        <CourseElement />
        <CourseElement />
        <CourseElement />
        <CourseElement />
        <CourseElement />
        <CourseElement />
        <CourseElement />
      </div>
    </div>
  );
};

export default courseMaterial;
