import React from "react";
import classes from "./CourseElement.module.css";
import rating from "../../../Assests/star.png";
import { Link } from "react-router-dom";

const CourseElement = (props) => {
  return (
    <Link to={`/course-material/${props.field}`}>
      <div className={classes.container}>
        <div className={classes.courseImg}>
          <img src={props.img} alt="Course" />
        </div>
        <div className={classes.courseContent}>
          <div className={classes.courseHeading}>{props.title}</div>
          <div className={classes.lessons}>Total Lessons: {props.lessons}</div>
          <div className={classes.courseRating}>
            <img src={rating} alt="rating" />
            <img src={rating} alt="rating" />
            <img src={rating} alt="rating" />
            <img src={rating} alt="rating" />
            <img src={rating} alt="rating" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseElement;
