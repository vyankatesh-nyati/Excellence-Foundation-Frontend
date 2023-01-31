import React from "react";
import classes from "./Container.module.css";
import AdminNavContent from "../AdminDashboard/AdminNavContent";
import Form from "./Form";
import Certificate from "./Certificate";
import { useState } from "react";

const Container = () => {
  const initialFormData = {
    name: "",
    regId: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const formSubmitData = (data) => {
    setFormData(data);
  };

  return (
    <div className={classes.container}>
      <AdminNavContent />
      <div className={classes.subContainer}>
        <Form formSubmitData={formSubmitData} />
        <Certificate formData={formData} />
      </div>
    </div>
  );
};

export default Container;
