import React, { useContext, useState } from "react";
import classes from "./AdminNavContent.module.css";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { MdSpaceDashboard } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import AdminContext from "../../store/admin-context";

const AdminNavContent = () => {
  const adminCtx = useContext(AdminContext);

  const [toggleClass, setToggleClass] = useState(`${classes.subContainer}`);
  const [cross, setCross] = useState(false);

  const logoutHandler = () => {
    adminCtx.adminLogout();
  };

  const toggleHandler = () => {
    if (toggleClass === `${classes.subContainer}`) {
      setToggleClass(`${classes.subContainer} ${classes.active}`);
      setCross(true);
    } else {
      setToggleClass(`${classes.subContainer}`);
      setCross(false);
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes.toggle} onClick={toggleHandler}>
        {!cross && <RxHamburgerMenu />}
        {cross && <RxCross2 />}
      </div>
      <div className={toggleClass}>
        <div className={classes.headingContent}>
          <div className={classes.heading}>Menu</div>
        </div>
        <div className={classes.navigators}>
          <Link to="/admin/dashboard" onClick={toggleHandler}>
            <div className={classes.navItem}>
              <MdSpaceDashboard /> Dashboard
            </div>
          </Link>
          <Link to="/admin/student/signup">
            <div className={classes.navItem}>
              <MdSpaceDashboard /> Student Signup
            </div>
          </Link>
          <div className={classes.navItem} onClick={logoutHandler}>
            <RiLogoutCircleRLine /> Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavContent;
