import React from "react";
import classes from "./CourseElement.module.css";
import courseImg from "../../../Assests/courseImage.png";
import rating from "../../../Assests/star.png";

const CourseElement = () => {
  return (
    <div className={classes.container}>
      <div className={classes.courseImg}>
        <img src={courseImg} alt="Course" />
      </div>
      <div className={classes.courseContent}>
        <div className={classes.courseHeading}>
          <h3>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor.
          </h3>
        </div>
        <div className={classes.lessons}>
          <h3>Total Lessons: 9</h3>
        </div>
        <div className={classes.courseRating}>
          <img src={rating} alt="rating" />
          <img src={rating} alt="rating" />
          <img src={rating} alt="rating" />
          <img src={rating} alt="rating" />
          <img src={rating} alt="rating" />
        </div>
      </div>
    </div>
  );
};

export default CourseElement;
