import React from "react";
import { Route } from "react-router-dom";
import CourseMaterial from "./pages/CourseMaterial";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";


const App = () => {
  return (
    <>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/course-material">
        <CourseMaterial />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
    </>
  );
};

export default App;
