import React, { useContext, useRef, useState } from "react";
import classes from "./AdminForm.module.css";
import { FaUserCircle } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import AdminContext from "../../store/admin-context";
import { Link, useHistory } from "react-router-dom";

const AdminForm = () => {
  const emailRef = useRef();
  const passRef = useRef();

  const loginClasses = `center ${classes.navigator}`;

  const adminCtx = useContext(AdminContext);

  const history = useHistory();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    setLoading(true);
    const email = emailRef.current.value;
    const password = passRef.current.value;

    try {
      const response = await fetch(
        "https://red-hungry-python.cyclic.app/admin/login",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      // console.log(data);
      const message = data.errorMessage;

      if (message) {
        setError(message);
      } else {
        setError(null);
      }

      if (data.token) {
        const expirationTime = new Date(new Date().getTime() + 3600000);
        adminCtx.adminLogin(data.token, expirationTime.toISOString());
        history.replace("/admin/dashboard");
      }
    } catch (error) {
      setError("Something went wrong");
      console.log(error);
    }
    setLoading(false);

    emailRef.current.value = "";
    passRef.current.value = "";
  };

  const userToggleHandler = () => {
    history.replace("/login");
  };

  return (
    <form className={classes.container} onSubmit={formSubmitHandler}>
      {error && !loading && <div className={classes.danger}>{error}</div>}
      <h1>ADMIN</h1>
      <div className={classes.inputLabel}>
        <label>
          <FaUserCircle /> Email
        </label>
        <input type="email" ref={emailRef} required />
      </div>
      <div className={classes.inputLabel}>
        <label>
          <RiLockPasswordFill /> Password
        </label>
        <input type="password" ref={passRef} required />
      </div>
      {loading && <span className={classes.loader}></span>}
      {!loading && <button type="submit">Sign in</button>}
      <div className={loginClasses}>
        <Link onClick={userToggleHandler}>
          <p>Click here for user login</p>
        </Link>
      </div>
    </form>
  );
};

export default AdminForm;
