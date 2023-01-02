import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import AdminContext from "../../store/admin-context";
import Select from "react-select";
import classes from "./StudentUpdate.module.css";
import studentImg from "../../Assests/beam-reading.png";
import { useHistory, useParams } from "react-router-dom";
import LoadingSpinner from "../ui/LoadingSpinner";

const StudentUpdate = (props) => {
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
  const [dataLoading, setDataLoading] = useState(false);

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

  const param = useParams();
  const history = useHistory();
  const userId = param.userId;

  const getDataUrl = `https://red-hungry-python.cyclic.app/auth/getData/${userId}`;
  const token = `bearer ${adminCtx.adminToken}`;

  const dataFetchHandler = useCallback(async () => {
    setDataLoading(true);
    try {
      const response = await fetch(getDataUrl, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      if (!response.ok) {
        throw new Error("Something went wrong!!!");
      }
      const data = await response.json();
      const message = data.errorMessage;
      if (message) {
        throw new Error(message);
      }
      fNameRef.current.value = data.data.name;
      lNameRef.current.value = data.data.lname;
      emailRef.current.value = data.data.email;
    } catch (error) {
      setError(error.message);
    }
    setDataLoading(false);
  }, [getDataUrl, token]);

  useEffect(() => {
    dataFetchHandler();
  }, [dataFetchHandler]);

  const selectChangeHandler = (selectOptions) => {
    courses = selectOptions.map((result) => result.value);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

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
      const response = await fetch(
        `https://red-hungry-python.cyclic.app/auth/update/${userId}`,
        {
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
        }
      );

      const data = await response.json();
      const message = data.errorMessage;
      let dataMessage;
      if (data.data) {
        dataMessage = data.data[0].msg;
      }
      if (message) {
        if (dataMessage) {
          throw new Error(dataMessage);
        }
        throw new Error(message);
      }
      if (data.message) {
        setSuccess(true);
      }
    } catch (error) {
      setError(error.message);
    }
    fNameRef.current.value = "";
    lNameRef.current.value = "";
    emailRef.current.value = "";
    passRef.current.value = "";
    confirmPassRef.current.value = "";
    history.replace("/admin/dashboard");
    setLoading(false);
  };

  if (dataLoading) {
    <div className={classes.container}>
      <LoadingSpinner />
    </div>;
  }

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
            {success && !loading && (
              <div className={classes.success}>
                Student data update succefully...
              </div>
            )}
            <h1>Student Update</h1>
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
            {!loading && <button type="submit">Update</button>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentUpdate;
