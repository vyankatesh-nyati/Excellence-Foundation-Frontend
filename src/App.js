import React, { Suspense, useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import AuthContext from "./store/auth-context";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminContext from "./store/admin-context";
import AdminDashboard from "./pages/AdminDashboard";
import StudentSignup from "./pages/StudentSignup";

const CourseMaterial = React.lazy(() => import("./pages/CourseMaterial"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const VideoPlayer = React.lazy(() => import("./pages/VideoPage"));

const App = () => {
  const authCtx = useContext(AuthContext);
  const adminCtx = useContext(AdminContext);

  return (
    <>
      <Suspense
        fallback={
          <div className="center">
            <LoadingSpinner />
          </div>
        }
      >
        <Switch>
          <Route path="/" exact>
            <Redirect to="/dashboard" />
          </Route>
          <Route path="/dashboard">
            {authCtx.isLoggedIn && <Dashboard />}
            {!authCtx.isLoggedIn && <Redirect to="/login" />}
          </Route>
          <Route path="/course-material/:course" exact>
            {authCtx.isLoggedIn && <CourseMaterial />}
            {!authCtx.isLoggedIn && <Redirect to="/login" />}
          </Route>
          <Route path="/course-material/:course/:videoId">
            {authCtx.isLoggedIn && <VideoPlayer />}
            {!authCtx.isLoggedIn && <Redirect to="/login" />}
          </Route>
          <Route path="/login">
            {!authCtx.isLoggedIn && <LoginPage />}
            {authCtx.isLoggedIn && <Redirect to="/dashboard" />}
          </Route>
          <Route path="/admin/login">
            {!adminCtx.isAdminLoggedIn && <AdminLoginPage />}
            {adminCtx.isAdminLoggedIn && <Redirect to="/admin/dashboard" />}
          </Route>
          <Route path="/admin/dashboard">
            {adminCtx.isAdminLoggedIn && <AdminDashboard />}
            {!adminCtx.isAdminLoggedIn && <Redirect to="/admin/login" />}
          </Route>
          <Route path="/admin/student/signup">
            {adminCtx.isAdminLoggedIn && <StudentSignup />}
            {!adminCtx.isAdminLoggedIn && <Redirect to="/admin/login" />}
          </Route>
          <Route path="*">
            {!authCtx.isLoggedIn && <LoginPage />}
            {authCtx.isLoggedIn && <Redirect to="/dashboard" />}
          </Route>
        </Switch>
      </Suspense>
    </>
  );
};

export default App;
