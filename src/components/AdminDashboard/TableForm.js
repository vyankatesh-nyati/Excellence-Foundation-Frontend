import React, { useRef } from "react";
import classes from "./TableForm.module.css";
import { MdArrowDropDown } from "react-icons/md";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { useState } from "react";
import Select from "react-select";
import TableData from "./TableData";

const TableForm = () => {
  const monthRef = useRef();
  const yearRef = useRef();
  const searchRef = useRef();

  const monthOptions = [
    { value: "0", label: "Month" },
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "Jully" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const yearOptions = [
    { value: "all", label: "Year" },
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" },
  ];

  const formSubmitHandler = () => {
    // console.log(event);
    console.log(monthRef.current.value);
    console.log(yearRef.current.value);
    console.log(searchRef.current.value);
  };

  const monthChangeHandler = (selectedOption) => {
    monthRef.current.value = selectedOption.value;
    formSubmitHandler();
  };

  const yearChangeHandler = (selectedOption) => {
    yearRef.current.value = selectedOption.value;
    formSubmitHandler();
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
            defaultValue={monthOptions[0]}
            onChange={monthChangeHandler}
            ref={monthRef}
          />
          <Select
            className={classes.subquery}
            options={yearOptions}
            defaultValue="year"
            onChange={yearChangeHandler}
            ref={yearRef}
          />
        </div>
        <div className={classes.new}>
          <button>
            <BsFillJournalBookmarkFill /> New
          </button>
        </div>
      </form>
    </div>
  );
};

export default TableForm;
