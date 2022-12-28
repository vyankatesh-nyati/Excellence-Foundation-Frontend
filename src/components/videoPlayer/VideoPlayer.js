import React from "react";
import Navbar from "./Navbar";
import Content from "./Content";
import classes from "./VideoPlayer.module.css";

const VideoPlayer = () => {
  return (
    <div className={classes.container}>
      <Navbar />
      <Content />
    </div>
  );
};

export default VideoPlayer;
