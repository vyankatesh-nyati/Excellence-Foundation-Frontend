import React, { useRef } from "react";
import classes from "./Container.module.css";
import AdminNavContent from "../AdminDashboard/AdminNavContent";
import Form from "./Form";
import Certificate from "./Certificate";
import { useState } from "react";

const Container = () => {
  const certificateRef = useRef();

  const initialFormData = {
    name: "",
    regId: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const formSubmitData = (data) => {
    setFormData(data);
  };

  const certificateHandler = () => {
    certificateRef.current.printCertificate();
  };

  return (
    <div className={classes.container}>
      <AdminNavContent />
      <div className={classes.subContainer}>
        <Form
          formSubmitData={formSubmitData}
          certificateHandler={certificateHandler}
        />
        <Certificate formData={formData} ref={certificateRef} />
      </div>
    </div>
  );
};

export default Container;
