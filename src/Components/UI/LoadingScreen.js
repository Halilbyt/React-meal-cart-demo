import React from "react";
import classes from "./LoadingScreen.module.css";
const LoadingScreen = () => {
  return (
    <div className={classes.container}>
      <div className={classes.progress}>
        <div className={classes.color}></div>
      </div>
      Loading
    </div>
  );
};

export default LoadingScreen;
