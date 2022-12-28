import React, { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";
import LoadingSpinner from "../ui/LoadingSpinner";
import classes from "./CourseContent.module.css";
import CourseElement from "./CourseElement";

const CourseContent = (props) => {
  const course = props.param.course;
  const url = `https://red-hungry-python.cyclic.app/course/${course}`;
  const authCtx = useContext(AuthContext);
  const token = `Bearer ${authCtx.token}`;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [courseDetails, setCourseDetails] = useState([]);

  const courseDetailsFetchHandler = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      if (!response.ok) {
        throw new Error("Something went wrong, Please try again later.");
      }
      const data = await response.json();
      if (data.courseDetails) {
        setCourseDetails(data.courseDetails);
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, [token, url]);

  useEffect(() => {
    courseDetailsFetchHandler();
  }, [courseDetailsFetchHandler]);

  if (error) {
    return (
      <div className={classes.sessions}>
        <div className={classes.danger}>{error}</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className={classes.sessions}>
      {courseDetails.map((result) => {
        return (
          <CourseElement
            key={result.id}
            title={result.title}
            session={result.session}
            notes={result.pdf}
            course={course}
            id={result.id}
          />
        );
      })}
    </div>
  );
};

export default CourseContent;
