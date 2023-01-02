import React, { useCallback, useEffect, useState } from "react";
import { useContext } from "react";
import AdminContext from "../../store/admin-context";
import LoadingSpinner from "../ui/LoadingSpinner";
import classes from "./TableData.module.css";
import { MdDelete, MdEdit } from "react-icons/md";
import { useHistory } from "react-router-dom";

const TableData = (props) => {
  const adminCtx = useContext(AdminContext);
  const history = useHistory();

  let loadedData;

  const querySearch = props.search;
  const queryMonth = props.month;
  const queryYear = props.year;
  // console.log(querySearch, queryMonth, queryYear);

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
  const [deleteError, setDeleteError] = useState(null);
  const [deleteMsg, setDeleteMsg] = useState("");

  const deleteHandler = async (event) => {
    // console.log(event.currentTarget.id);
    const userId = event.currentTarget.id;
    const url = `https://red-hungry-python.cyclic.app/auth/delete/${userId}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `bearer ${adminCtx.adminToken}`,
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
      const successMsg = `User deleted Successfully with name ${data.data.name} ${data.data.lname}`;
      setDeleteMsg(successMsg);
    } catch (error) {
      setDeleteError(error.message);
    }
    dataFetchHandler();
  };

  const updateHandler = (event) => {
    // console.log(event.currentTarget.id);
    const userId = event.currentTarget.id;
    history.replace(`/admin/student/${userId}`);
  };

  const dataFetchHandler = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("https://red-hungry-python.cyclic.app/data/student", {
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
      loadedData = data.data;
      if (queryYear !== "all") {
        loadedData = loadedData.filter((result) => {
          if (result.date.includes(queryYear)) {
            return true;
          }
          return false;
        });
      }
      if (queryMonth !== "all") {
        loadedData = loadedData.filter((result) => {
          if (result.date.includes(queryMonth)) {
            return true;
          }
          return false;
        });
      }
      if (querySearch !== "all") {
        loadedData = loadedData.filter((result) => {
          if (result.name.includes(querySearch)) {
            return true;
          }
          return false;
        });
      }
      setData(loadedData);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, [adminCtx.adminToken, querySearch, queryMonth, queryYear]);

  useEffect(() => {
    dataFetchHandler();
  }, [dataFetchHandler, querySearch, queryMonth, queryYear]);

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
      {deleteError && <div className={classes.danger}>{deleteError}</div>}
      {!deleteError && deleteMsg && (
        <div className={classes.success}>{deleteMsg}</div>
      )}
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
                  : ""
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
