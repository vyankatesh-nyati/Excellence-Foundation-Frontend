import React, { useRef } from "react";
import classes from "./Form.module.css";
import { addCertificate } from "./Certificate";

const Form = (props) => {
  const nameRef = useRef();
  const regRef = useRef();

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const data = {
      name: nameRef.current.value,
      regId: regRef.current.value,
    };

    props.formSubmitData(data);
  };

  const certificateGeneratorHandler = () => {
    const regId = regRef.current.value;

    addCertificate(regId);
    
    nameRef.current.value = "";
    regRef.current.value = "";
  };

  return (
    <div className={classes.container}>
      <form onChange={formSubmitHandler}>
        <h1>Certificate Generator</h1>
        <div className={classes.inputLabel}>
          <label>Name: </label>
          <input type="text" ref={nameRef} />
        </div>
        <div className={classes.inputLabel}>
          <label>Reg id: </label>
          <input type="text" ref={regRef} />
        </div>
        <button onClick={certificateGeneratorHandler} type="button">
          Generate Certificate
        </button>
      </form>
    </div>
  );
};

export default Form;
