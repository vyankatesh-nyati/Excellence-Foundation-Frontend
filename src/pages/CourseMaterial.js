import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/courseMaterialElements/Navbar";
import CourseContent from "../components/courseMaterialElements/CourseContent";

const CourseMaterial = () => {
  const param = useParams();

  return (
    <>
      <Navbar />
      <CourseContent param={param} />
    </>
  );
};

export default CourseMaterial;
