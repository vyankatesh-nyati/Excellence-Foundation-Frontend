import React, { useState } from "react";
import classes from "./CourseElement.module.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export const CourseElement = () => {
  const sessionDetailClassname = classes.session + " " + classes.sessionDetail;

  const [icon, setIcon] = useState(1);

  const mouseOverFunction = () => {
    setIcon(2);
  };

  const mouseOutFunction = () => {
    setIcon(1);
  };

  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <p>Concrete Quantity Concept</p>
      </div>
      <div
        className={classes.sessionLinks}
        onMouseOver={mouseOverFunction}
        onMouseOut={mouseOutFunction}
      >
        <div className={classes.session}>
          <p>Session 1</p>
          <div className={classes.icon}>
            {icon == 1 && <FaChevronDown />}
            {icon == 2 && <FaChevronUp />}
          </div>
        </div>
        <div className={sessionDetailClassname}>
          Concrete Quantity Concept Video
        </div>
        <div className={sessionDetailClassname}>Notes</div>
      </div>
    </div>
  );
};
