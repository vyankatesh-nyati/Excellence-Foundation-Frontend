import React, { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";
import CourseElement from "./courseContent/CourseElement";
import classes from "./DashboardContent.module.css";
import NavContent from "./NavContent";
import civil from "../../Assests/civil-course.jpg";
import LoadingSpinner from "../ui/LoadingSpinner";

const DashboardContent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [courses, setCourses] = useState([]);

  const authCtx = useContext(AuthContext);

  const fetchCourseHandler = useCallback(async () => {
    setLoading(true);
    setError(null);
    let loadedCourses;
    try {
      const response = await fetch("https://red-hungry-python.cyclic.app/courses", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      });
      if (!response.ok) {
        throw new Error(
          "Something went worng! Please try again after some time."
        );
      }
      const data = await response.json();
      loadedCourses = data.courses;
    } catch (error) {
      setError(error.message);
    }
    let courseDetails = [];
    if (loadedCourses.includes("civil")) {
      courseDetails = [
        ...courseDetails,
        {
          id: "c1",
          title: "Online Estimation & Costing Internship Training Program",
          lessons: 9,
          img: civil,
          field: "civil",
        },
      ];
    }

    if (loadedCourses.includes("arch")) {
      courseDetails = [
        ...courseDetails,
        {
          id: "c2",
          title: "Architecture course",
          lessons: 9,
          img: civil,
          field: "arch",
        },
      ];
    }
    setCourses(courseDetails);
    setLoading(false);
  }, [authCtx.token]);

  useEffect(() => {
    fetchCourseHandler();
  }, [fetchCourseHandler]);

  if (error) {
    return (
      <div className={classes.container}>
        <div className={classes.danger}>{error}</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={classes.container}>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.navContent}>
        <NavContent />
      </div>
      <div className={classes.courseContent}>
        {courses.map((result) => {
          return (
            <CourseElement
              key={result.id}
              title={result.title}
              lessons={result.lessons}
              img={result.img}
              field={result.field}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DashboardContent;
