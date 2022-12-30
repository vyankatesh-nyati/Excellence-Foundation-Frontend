import React, { useCallback, useEffect, useState } from "react";

let logoutTimer;

const AdminContext = React.createContext({
  adminToken: "",
  isAdminLoggedIn: false,
  adminLogin: (token) => {},
  adminLogout: () => {},
});

const calculateRemainingTime = (adminExpirationTime) => {
  const currentTime = new Date().getTime();
  const adjAdminExpirationTime = new Date(adminExpirationTime).getTime();

  const remainingDuration = adjAdminExpirationTime - currentTime;

  return remainingDuration;
};

const retriveAdminStoredToken = () => {
  const storedAdminToken = localStorage.getItem("aToken");
  const expirationTime = localStorage.getItem("aExipirationTime");

  const remainingTime = calculateRemainingTime(expirationTime);

  if (remainingTime <= 300000) {
    localStorage.removeItem("aToken");
    localStorage.removeItem("aExipirationTime");
    return null;
  }

  return {
    adminToken: storedAdminToken,
    adminExpirationTime: remainingTime,
  };
};

export const AdminContextProvider = (props) => {
  const storedData = retriveAdminStoredToken();
  let initialAdminToken;
  if (storedData) {
    initialAdminToken = storedData.adminToken;
  }
  const [adminToken, setAdminToken] = useState(initialAdminToken);

  const adminIsLoggedIn = !!adminToken;

  const adminLogoutHandler = useCallback(() => {
    setAdminToken(null);
    localStorage.removeItem("aToken");
    localStorage.removeItem("aExipirationTime");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const adminLoginHandler = (adminToken, adminExpirationTime) => {
    setAdminToken(adminToken);
    localStorage.setItem("aToken", adminToken);
    localStorage.setItem("aExipirationTime", adminExpirationTime);

    const remainingTime = calculateRemainingTime(adminExpirationTime);

    logoutTimer = setTimeout(adminLogoutHandler, remainingTime);
  };

  useEffect(() => {
    if (storedData) {
      logoutTimer = setTimeout(
        adminLogoutHandler,
        storedData.adminExpirationTime
      );
    }
  }, [storedData, adminLogoutHandler]);

  const contextValue = {
    adminToken: adminToken,
    isAdminLoggedIn: adminIsLoggedIn,
    adminLogin: adminLoginHandler,
    adminLogout: adminLogoutHandler,
  };

  return (
    <AdminContext.Provider value={contextValue}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
