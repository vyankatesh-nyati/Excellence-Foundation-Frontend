import React, { useCallback, useEffect, useRef } from "react";
import classes from "./TableForm.module.css";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import Select from "react-select";
import { useHistory } from "react-router-dom";

const TableForm = (props) => {
  const monthRef = useRef();
  const yearRef = useRef();
  const searchRef = useRef();
  const history = useHistory();

  const monthOptions = [
    { value: "all", label: "all" },
    { value: "Jan", label: "January" },
    { value: "Feb", label: "February" },
    { value: "Mar", label: "March" },
    { value: "Apr", label: "April" },
    { value: "May", label: "May" },
    { value: "Jun", label: "June" },
    { value: "Jul", label: "Jully" },
    { value: "Aug", label: "August" },
    { value: "Sep", label: "September" },
    { value: "Oct", label: "October" },
    { value: "Nov", label: "November" },
    { value: "Dec", label: "December" },
  ];

  const yearOptions = [
    { value: "all", label: "all" },
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" },
  ];

  const formSubmitHandler = useCallback(() => {
    // console.log(event);
    let month, year, search;
    month = monthRef.current.value;
    year = yearRef.current.value;
    search = searchRef.current.value;
    if (!month) {
      month = "all";
    }
    if (!year) {
      year = "all";
    }
    if (!search) {
      search = "all";
    }
    props.queryHandler(search, month, year);
  }, [props]);

  useEffect(() => {
    formSubmitHandler();
  }, [formSubmitHandler]);

  const monthChangeHandler = (selectedOption) => {
    monthRef.current.value = selectedOption.value;
    formSubmitHandler();
  };

  const yearChangeHandler = (selectedOption) => {
    yearRef.current.value = selectedOption.value;
    formSubmitHandler();
  };

  const newStudentHandler = () => {
    history.push("/admin/student/signup");
  };

  return (
    <div className={classes.container}>
      <form onChange={formSubmitHandler}>
        <div className={classes.search}>
          <input type="text" placeholder="Find a student..." ref={searchRef} />
        </div>
        <div className={classes.query}>
          <Select
            className={classes.subquery}
            options={monthOptions}
            placeholder="Month"
            onChange={monthChangeHandler}
            ref={monthRef}
          />
          <Select
            className={classes.subquery}
            options={yearOptions}
            placeholder="Year"
            onChange={yearChangeHandler}
            ref={yearRef}
          />
        </div>
        <div className={classes.new}>
          <button onClick={newStudentHandler}>
            <BsFillJournalBookmarkFill /> New
          </button>
        </div>
      </form>
    </div>
  );
};

export default TableForm;
