import React, { useState } from "react";
import classes from "./CourseElement.module.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link } from "react-router-dom";

export const CourseElement = (props) => {
  const [icon, setIcon] = useState(1);
  const notesUrl = `https://red-hungry-python.cyclic.app${props.notes}`;
  const videoUrl = `/course-material/${props.course}/${props.id}`;

  let myStyle = {
    display: "none",
  };
  const [style, setStyle] = useState(myStyle);

  const hoverHandler = () => {
    if (icon === 1) {
      setIcon(2);
      setStyle({
        display: "flex",
        visibility: "visible",
        opacity: "1",
        height: "100%",
      });
    } else {
      setIcon(1);
      setStyle({
        display: "none",
      });
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <p>{props.title}</p>
      </div>
      <div className={classes.sessionLinks} onClick={hoverHandler}>
        <div className={classes.session}>
          <p>{props.session}</p>
          <div className={classes.icon}>
            {icon === 1 && <FaChevronDown />}
            {icon === 2 && <FaChevronUp />}
          </div>
        </div>
        <div className={classes.subcontainer} style={style}>
          <Link to={videoUrl}>
            <div className={classes.sessionDetail}>{props.title} Video</div>
          </Link>
          {props.notes !== "none" && (
            <a href={notesUrl} target="_blank">
              <div className={classes.sessionDetail}>Notes</div>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseElement;
