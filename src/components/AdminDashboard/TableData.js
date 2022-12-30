import React, { useCallback, useEffect, useState } from "react";
import { useContext } from "react";
import AdminContext from "../../store/admin-context";
import LoadingSpinner from "../ui/LoadingSpinner";
import classes from "./TableData.module.css";
import { MdDelete, MdEdit } from "react-icons/md";

const TableData = () => {
  const adminCtx = useContext(AdminContext);

  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const deleteHandler = (event) => {
    console.log(event.currentTarget.id);
  };

  const updateHandler = (event) => {
    console.log(event.currentTarget.id);
  };

  const dataFetchHandler = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/data/student", {
        method: "GET",
        headers: {
          Authorization: `bearer ${adminCtx.adminToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      const message = data.errorMessage;
      if (message) {
        setError(message);
      }
      setData(data.data);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, [adminCtx.adminToken]);

  useEffect(() => {
    dataFetchHandler();
  }, [dataFetchHandler]);

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
      <table>
        <tr>
          <th>Sr no.</th>
          <th>Name</th>
          <th>Email</th>
          <th>Month</th>
          <th>Year</th>
          <th>Courses</th>
          <th>Actions</th>
        </tr>
        {data.map((result, index) => {
          return (
            <tr
              key={result.id}
              className={
                (Number(result.date.split(" ")[1]) <=
                  new Date().getFullYear() &&
                  month.indexOf(result.date.split(" ")[0]) <
                    new Date().getMonth() &&
                  result.courses.length > 0) ||
                (Number(result.date.split(" ")[1]) < new Date().getFullYear() &&
                  result.courses.length > 0)
                  ? classes.active
                  : classes.ok
              }
            >
              <td>{index + 1}</td>
              <td>{result.name}</td>
              <td>{result.email}</td>
              <td>{result.date.split(" ")[0]}</td>
              <td>{result.date.split(" ")[1]}</td>
              <td>
                {result.courses.map(
                  (course, index) => " " + (index + 1) + ". " + course + " "
                )}
              </td>
              <td>
                <div className={classes.actions}>
                  <button
                    onClick={deleteHandler}
                    id={result.id}
                    className={classes.delete}
                  >
                    <MdDelete />
                  </button>
                  <button
                    onClick={updateHandler}
                    id={result.id}
                    className={classes.edit}
                  >
                    <MdEdit />
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default TableData;

// srno name email month year courses
