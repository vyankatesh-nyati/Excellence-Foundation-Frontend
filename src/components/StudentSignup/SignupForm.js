import React, { useContext, useRef, useState } from "react";
import classes from "./SignupForm.module.css";
import studentImg from "../../Assests/beam-reading.png";
import Select from "react-select";
import AdminContext from "../../store/admin-context";

const SignupForm = () => {
  const fNameRef = useRef();
  const lNameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const confirmPassRef = useRef();
  let courses = [];

  const adminCtx = useContext(AdminContext);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isFirst, setIsFirst] = useState(true);

  const courseOptions = [
    {
      value: "civil",
      label: "Online Estimation & Costing Internship Training Program",
    },
    { value: "arch", label: "Architecture Course" },
  ];

  const selectStyle = {
    control: (styles) => ({
      border: "1px solid #adb6cf",
      borderRadius: "5px",
      width: "100%",
      display: "flex",
      flexDirection: "row",
      padding: "0",
      height: "2rem",
      cursor: "pointer",
    }),
  };

  const selectChangeHandler = (selectOptions) => {
    courses = selectOptions.map((result) => result.value);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    setIsFirst(false);

    const fname = fNameRef.current.value;
    const lname = lNameRef.current.value;
    const email = emailRef.current.value;
    const password = passRef.current.value;
    const confirmPass = confirmPassRef.current.value;
    // console.log(fname);

    try {
      if (password !== confirmPass) {
        throw new Error("Password and confirm password are not matching!!!");
      }
      const response = await fetch("https://red-hungry-python.cyclic.app/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          name: fname,
          lname: lname,
          email: email,
          password: password,
          confirmPassword: confirmPass,
          courses: courses,
        }),
        headers: {
          Authorization: `bearer ${adminCtx.adminToken}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      const message = data.errorMessage;
      let dataMessage;
      if (data.data) {
        dataMessage = data.data[0].msg;
      }
      console.log(data.data);

      if (message) {
        if (dataMessage) {
          throw new Error(dataMessage);
        }
        throw new Error(message);
      }
      setSuccess(true);
    } catch (error) {
      setError(error.message);
    }
    fNameRef.current.value = "";
    lNameRef.current.value = "";
    emailRef.current.value = "";
    passRef.current.value = "";
    confirmPassRef.current.value = "";
    setLoading(false);
  };

  return (
    <div className={classes.container}>
      <div className={classes.subcontainer}>
        <div className={classes.img}>
          <img src={studentImg} alt="Excellence Foundation" />
        </div>
        <div className={classes.formContainer}>
          <form onSubmit={formSubmitHandler}>
            {error && !loading && !success && (
              <div className={classes.danger}>{error}</div>
            )}
            {success && !isFirst && !loading && (
              <div className={classes.success}>
                New Student added succefully...
              </div>
            )}
            <h1>New Student</h1>
            <div className={classes.inputLabel}>
              <label>First Name</label>
              <input type="text" ref={fNameRef} required />
            </div>
            <div className={classes.inputLabel}>
              <label>Last Name</label>
              <input type="text" ref={lNameRef} required />
            </div>
            <div className={classes.inputLabel}>
              <label>Email</label>
              <input type="text" ref={emailRef} required />
            </div>
            <div className={classes.inputLabel}>
              <label>Password</label>
              <input type="password" ref={passRef} required />
            </div>
            <div className={classes.inputLabel}>
              <label>Confirm Passowrd</label>
              <input type="password" ref={confirmPassRef} required />
            </div>
            <div className={classes.inputLabel}>
              <label>Courses</label>
              <Select
                options={courseOptions}
                isMulti
                className={classes.courseSelector}
                styles={selectStyle}
                placeholder=""
                onChange={selectChangeHandler}
              />
            </div>
            {loading && <span className={classes.loader}></span>}
            {!loading && <button type="submit">Sign in</button>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
