import React, { useCallback, useContext, useEffect, useState } from "react";
import { IoVideocam } from "react-icons/io5";
import ReactPlayer from "react-player";
import { Link, useParams } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./Content.module.css";

const Content = () => {
  const param = useParams();
  const sessionUrl = `https://red-hungry-python.cyclic.app/session/${param.course}/${param.videoId}`;
  const authCtx = useContext(AuthContext);
  const token = `bearer ${authCtx.token}`;
  const [sessionDetails, setSessionDetails] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const nextUrl = `/course-material/${param.course}/${sessionDetails.nextId}`;
  const prevUrl = `/course-material/${param.course}/${sessionDetails.prevId}`;

  const sessionDetailsFetchHandler = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(sessionUrl, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      if (!response.ok) {
        throw new Error("Something went wrong, Please try again later.");
      }
      const data = await response.json();
      if (data.sessionDetails) {
        setSessionDetails(data.sessionDetails);
      }
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  }, [sessionUrl, token]);

  useEffect(() => {
    sessionDetailsFetchHandler();
  }, [sessionDetailsFetchHandler]);

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
        <div className={classes.loading}>
          <span className={classes.loader}></span>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <IoVideocam className={classes.icon} />
        <div className={classes.heading}>{sessionDetails.title} video</div>
      </div>
      <div className={classes.player}>
        <ReactPlayer
          url={sessionDetails.video}
          controls="true"
          width="100%"
          height="100%"
          className={classes.reactPlayer}
        />
      </div>
      <div className={classes.navigators}>
        {sessionDetails.prevId !== "none" && (
          <Link to={prevUrl}>Previous Session</Link>
        )}
        {sessionDetails.nextId !== "none" && (
          <Link to={nextUrl}>Next Session</Link>
        )}
      </div>
    </div>
  );
};

export default Content;
